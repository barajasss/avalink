import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardHeader from '../../components/dashboard-header/dashboard-header.component'
import DashboardUser from '../../components/dashboard-user/dashboard-user.component'
import InlineLinkEditor from './inline-link-editor.component'

import { fetchDefaultLinks, fetchLinks } from '../../redux/links/links.actions'
import { updateUserAsync } from '../../redux/user/user.actions'

import './edit-profile.styles.scss'

class EditProfilePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loadingLinks: false,
			links: [],
			name: props.name || '',
			about: props.about || '',
		}
	}
	componentDidMount = async () => {
		const {
			defaultLinksLoaded,
			fetchDefaultLinks,
			userLinksLoaded,
			fetchLinks,
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
	saveDetails = async () => {
		const { name, about, links } = this.state
		const { updateUserAsync } = this.props

		// save name and about
		try {
			await updateUserAsync('name', name)
			await updateUserAsync('about', about)
		} catch (err) {
			console.log(err)
		}
		console.log('save details triggered')
	}

	render() {
		const { isLoggedIn } = this.props
		const { loadingLinks, links, name, about } = this.state
		if (!isLoggedIn) {
			return <Redirect to='/' />
		}
		return (
			<div className='dashboard'>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<DashboardHeader
							editProfile
							saveDetails={this.saveDetails}
						/>
						<DashboardUser
							editProfile
							editableName={name}
							editableAbout={about}
							updateName={this.updateName}
							updateAbout={this.updateAbout}
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
								className='btn btn-dark btn-block py-2'
								onClick={this.saveDetails}>
								Save Changes
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
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
