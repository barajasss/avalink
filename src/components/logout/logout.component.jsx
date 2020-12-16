import React, { Component } from 'react'

import { connect } from 'react-redux'
import { logoutUser, resolveAuthState } from '../../redux/user/user.actions'
import { withRouter } from 'react-router-dom'

import { toast } from 'react-toastify'

class Logout extends Component {
	handleLogout = async e => {
		const { logoutUser, history, resolveAuthState } = this.props
		try {
			await logoutUser()
			toast.success('Logged out successfully!', { hideProgressBar: true })
			resolveAuthState()
			return history.push('/')
		} catch (err) {
			console.log(err)
			toast.error('Could not logout. Please try again later!')
		}
	}
	render() {
		return (
			<button
				to='/logout'
				className='btn btn-dark btn-block mb-3 py-2'
				onClick={this.handleLogout}>
				Logout
			</button>
		)
	}
}

const mapDispatchToProps = dispatch => ({
	logoutUser: user => dispatch(logoutUser(user)),
	resolveAuthState: () => dispatch(resolveAuthState()),
})

export default connect(null, mapDispatchToProps)(withRouter(Logout))
