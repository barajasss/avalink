import React, { Component } from 'react'

import Logo from '../../components/logo/logo.component'
import Input from '../../components/input/input.component'
import { toast } from 'react-toastify'

import { withRouter } from 'react-router-dom'
import { updatePassword } from '../../firebase/utils/auth.utils'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class ChangePassword extends Component {
	constructor(props) {
		super(props)
		this.state = {
			saving: false,
			oldPassword: '',
			newPassword: '',
			confirmPassword: '',
		}
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	handleSubmit = async e => {
		e.preventDefault()
		const { history } = this.props
		const { oldPassword, newPassword, confirmPassword, saving } = this.state
		if (saving) {
			return
		}
		this.setState({ saving: true })
		if (newPassword !== confirmPassword) {
			toast.error('New password match the confirm password.')
		}
		try {
			await updatePassword(oldPassword, newPassword)
			toast.success('Password updated successfully')
			return setTimeout(() => history.push('/dashboard'), 1100)
		} catch (err) {
			if (err.code === 'auth/wrong-password') {
				toast.error('Old password is incorrect')
			} else {
				toast.error(err.message || 'Something went wrong...')
			}
		}
		this.setState({ saving: false })
	}
	render() {
		const { isLoggedIn } = this.props
		const { saving } = this.state
		if (!isLoggedIn) {
			return <Redirect to='/' />
		}
		return (
			<div className='container py-5'>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<Logo size='md' />
						<br />
						<h1 className='text-center'>Ava Link</h1>
						<h4 className='text-center'>
							Change your password securely
						</h4>
						<br />
						<form onSubmit={this.handleSubmit}>
							<Input
								name='oldPassword'
								placeholder='Old Password'
								type='password'
								onChange={this.handleChange}
							/>
							<Input
								name='newPassword'
								placeholder='New Password'
								type='password'
								onChange={this.handleChange}
							/>
							<Input
								name='confirmPassword'
								placeholder='Confirm Password'
								type='password'
								onChange={this.handleChange}
							/>
							<button
								className={`btn btn-dark btn-block ${
									saving ? 'disabled' : ''
								}`}>
								{!saving ? 'Change Password' : 'Please wait...'}
							</button>
						</form>
					</div>
				</div>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(withRouter(ChangePassword))