import React, { Component } from 'react'

import { Helmet } from 'react-helmet'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardHeader from '../../components/dashboard-header/dashboard-header.component'
import DashboardUser from '../../components/dashboard-user/dashboard-user.component'
import InlineLinkEditor from './inline-link-editor.component'

import { toast } from 'react-toastify'

import {
	fetchDefaultLinks,
	fetchLinks,
	updateMultipleLinks,
} from '../../redux/links/links.actions'
import { updateUserAsync } from '../../redux/user/user.actions'

import { saveProfileImage } from '../../firebase/utils/firebase-storage.utils'

import './edit-profile.styles.scss'

class EditProfilePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			savingDetails: false,
			loadingLinks: false,
			links: [],
			name: props.name || '',
			about: props.about || '',
			file: {
				data: '',
				type: '',
			},
		}
	}
	componentDidMount = async () => {
		const {
			defaultLinksLoaded,
			fetchDefaultLinks,
			userLinksLoaded,
			fetchLinks,
			name,
			about,
		} = this.props

		let { userLinks, defaultLinks } = this.props

		this.setState({ loadingLinks: true })
		if (!defaultLinksLoaded) {
			try {
				defaultLinks = await fetchDefaultLinks()
			} catch (err) {
				console.log(err)
			}
		}
		if (!userLinksLoaded) {
			try {
				userLinks = await fetchLinks()
			} catch (err) {
				console.log(err)
			}
		}

		// create links by merging user links and default links

		let links = []

		userLinks.forEach(userLink => {
			links = [...links, { ...userLink }]
		})

		defaultLinks.forEach(defaultLink => {
			const linkFoundInUser = userLinks.find(
				userLink => userLink.type === defaultLink.type
			)
			if (!linkFoundInUser) {
				links = [...links, { ...defaultLink }]
			}
		})
		this.setState({ loadingLinks: false, links })
	}

	updateLink = (type, link) => {
		const { links } = this.state
		const i = links.findIndex(link => link.type === type)
		if (i === -1) return
		const updatedLinks = [...links]
		updatedLinks[i].link = link
		this.setState({
			links: updatedLinks,
		})
	}

	updateAbout = val => {
		this.setState({ about: val })
	}
	updateName = val => {
		this.setState({ name: val })
	}
	updateFile = (data, type) => {
		this.setState({ file: { data, type } })
	}
	saveDetails = async () => {
		const { name, about, links, file, savingDetails } = this.state
		const { updateUserAsync, updateMultipleLinks } = this.props

		if (savingDetails) return
		this.setState({ savingDetails: true })
		// save name and about
		try {
			await updateUserAsync('name', name)
			await updateUserAsync('about', about)
			await updateMultipleLinks(links)
			// save profile image
			if (file.data) {
				const imageUrl = await saveProfileImage(file.data, file.type)
				await updateUserAsync('imageUrl', imageUrl)
			}
			toast.success('Profile updated successfully')
		} catch (err) {
			console.log(err)
			toast.error('Could not update your details. Try again later.')
		}
		this.setState({ savingDetails: false })
	}

	render() {
		const { isLoggedIn } = this.props
		const { savingDetails, loadingLinks, links, name, about } = this.state
		if (!isLoggedIn) {
			return <Redirect to='/' />
		}
		return (
			<div className='dashboard'>
				<Helmet>
					<title>
						{process.env.REACT_APP_PRODUCT_NAME} | Edit Profile
					</title>
				</Helmet>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<DashboardHeader
							editProfile
							saveDetails={this.saveDetails}
							savingDetails={savingDetails}
						/>
						<DashboardUser
							editProfile
							editableName={name}
							editableAbout={about}
							updateName={this.updateName}
							updateAbout={this.updateAbout}
							updateFile={this.updateFile}
						/>

						{links.map(item => (
							<InlineLinkEditor
								key={item.type}
								type={item.type}
								link={item.link}
								updateLink={this.updateLink}
							/>
						))}

						{loadingLinks && (
							<h5 className='text-center'>
								Loading your profile links...
							</h5>
						)}
						<div className='p-3 py-2'>
							<button
								className={`btn btn-dark btn-block py-2 ${
									savingDetails ? 'disabled' : ''
								}`}
								onClick={this.saveDetails}>
								{savingDetails ? 'Saving...' : 'Save Changes'}
							</button>
						</div>
						<br />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	name: state.user.name,
	about: state.user.about,
	isLoggedIn: state.user.isLoggedIn,
	userLinks: state.links.userLinks,
	defaultLinks: state.links.defaultLinks,
	defaultLinksLoaded: state.links.defaultLinksLoaded,
	userLinksLoaded: state.links.userLinksLoaded,
})

const mapDispatchToProps = dispatch => ({
	fetchDefaultLinks: () => dispatch(fetchDefaultLinks()),
	fetchLinks: () => dispatch(fetchLinks()),
	updateUserAsync: (name, value) => dispatch(updateUserAsync(name, value)),
	updateMultipleLinks: links => dispatch(updateMultipleLinks(links)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
