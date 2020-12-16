import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardHeader from '../../components/dashboard-header/dashboard-header.component'
import DashboardUser from '../../components/dashboard-user/dashboard-user.component'
import InlineLinkEditor from './inline-link-editor.component'

import { fetchDefaultLinks, fetchLinks } from '../../redux/links/links.actions'

import './edit-profile.styles.scss'

class EditProfilePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
		}
	}
	componentDidMount = async () => {
		const {
			defaultLinksLoaded,
			fetchDefaultLinks,
			userLinksLoaded,
			fetchLinks,
		} = this.props
		this.setState({ loading: true })
		if (!defaultLinksLoaded) {
			try {
				await fetchDefaultLinks()
			} catch (err) {
				console.log(err)
			}
		}
		if (!userLinksLoaded) {
			try {
				await fetchLinks()
			} catch (err) {
				console.log(err)
			}
		}
		this.setState({ loading: false })
	}
	render() {
		const { isLoggedIn, userLinks, defaultLinks } = this.props
		const { loading } = this.state
		if (!isLoggedIn) {
			return <Redirect to='/' />
		}
		return (
			<div className='dashboard'>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<DashboardHeader editProfile />
						<DashboardUser editProfile />
						{userLinks.map(item => (
							<InlineLinkEditor
								key={item.type}
								type={item.type}
							/>
						))}
						{defaultLinks.map(item => {
							if (
								userLinks.findIndex(
									userLink => userLink.type === item.type
								) === -1
							) {
								return (
									<InlineLinkEditor
										key={item.type}
										type={item.type}
									/>
								)
							}
						})}
						{loading && (
							<h5 className='text-center'>
								Loading your profile links...
							</h5>
						)}
						<div className='p-3 py-2'>
							<button className='btn btn-dark btn-block py-2'>
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
	isLoggedIn: state.user.isLoggedIn,
	userLinks: state.links.userLinks,
	defaultLinks: state.links.defaultLinks,
	defaultLinksLoaded: state.links.defaultLinksLoaded,
	userLinksLoaded: state.links.userLinksLoaded,
})

const mapDispatchToProps = dispatch => ({
	fetchDefaultLinks: () => dispatch(fetchDefaultLinks()),
	fetchLinks: () => dispatch(fetchLinks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
