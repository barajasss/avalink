import React, { Component } from 'react'

import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Logo from '../../components/logo/logo.component'
import Logout from '../../components/logout/logout.component'

class SettingPage extends Component {
	render() {
		const { isLoggedIn } = this.props
		if (!isLoggedIn) {
			return <Redirect to='/' />
		}
		return (
			<div className='container py-4'>
				<Logo />
				<h2 className='text-center my-4'>Settings</h2>
				<div className='row'>
					<div className='col-md-6 offset-md-3'>
						<Link
							to='/dashboard'
							className='btn btn-dark btn-block mb-3 py-2'>
							Dashboard
						</Link>
						<Link
							to='/edit-profile'
							className='btn btn-dark btn-block mb-3 py-2'>
							Edit Profile
						</Link>
						<Link
							to='/change-password'
							className='btn btn-dark btn-block mb-3 py-2'>
							Change Password
						</Link>
						<Logout />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(SettingPage)
