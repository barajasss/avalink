import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardHeader from '../../components/dashboard-header/dashboard-header.component'
import DashboardUser from '../../components/dashboard-user/dashboard-user.component'

import { fetchDefaultLinks } from '../../redux/links/links.actions'

import './edit-profile.styles.scss'

const InlineLinkEditor = ({ type }) => (
	<div className='inline-link-editor'>
		<img
			src={`${process.env.PUBLIC_URL}icons/${type}.png`}
			className='icon'
		/>
		<div className='form-group'>
			<input
				className='form-control'
				type='text'
				placeholder={`${type} profile link`}
			/>
		</div>
		<i className='fas fa-times text-danger fa-2x p-1 ml-3 clear-icon' />
	</div>
)

class EditProfilePage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
		}
	}
	componentDidMount = async () => {
		const { defaultLinksLoaded, fetchDefaultLinks } = this.props
		this.setState({ loading: true })
		if (!defaultLinksLoaded) {
			try {
				await fetchDefaultLinks()
			} catch (err) {
				console.log(err)
			}
		}
		this.setState({ loading: false })
	}
	render() {
		const { isLoggedIn, defaultLinks } = this.props
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
						{defaultLinks.map(item => (
							<InlineLinkEditor
								key={item.type}
								type={item.type}
							/>
						))}
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
})

const mapDispatchToProps = dispatch => ({
	fetchDefaultLinks: () => dispatch(fetchDefaultLinks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProfilePage)
