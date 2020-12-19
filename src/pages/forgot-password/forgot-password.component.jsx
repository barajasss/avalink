import React, { Component } from 'react'
import Input from '../../components/input/input.component'
import Logo from '../../components/logo/logo.component'

import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { sendResetPassword } from '../../firebase/utils/auth.utils'
import { toast } from 'react-toastify'

class ForgotPasswordPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			sending: false,
		}
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	handleSubmit = async e => {
		e.preventDefault()
		const { email, sending } = this.state
		if (sending) return
		this.setState({ sending: true })
		try {
			await sendResetPassword(email)
			toast.success('Password reset link sent to your email.')
		} catch (err) {
			if (err.code === 'auth/user-not-found') {
				toast.error('Please enter your registered email address.')
			} else {
				toast.error(
					err.message ||
						'Something went wrong. Please try again later.'
				)
			}
			console.log(err)
		}
		this.setState({ sending: false })
	}
	render() {
		const { sending, email } = this.state
		return (
			<div className='container py-5'>
				<Helmet>
					<title>
						{process.env.REACT_APP_PRODUCT_NAME} | Reset Password
					</title>
				</Helmet>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<Logo size='md' />
						<br />
						<h2 className='text-center'>Reset your password</h2>
						<br />
						<form onSubmit={this.handleSubmit}>
							<Input
								name='email'
								type='email'
								placeholder='Registered Email address'
								onChange={this.handleChange}
								value={email}
							/>
							<button
								className={`btn btn-dark btn-block ${
									sending ? 'disabled' : ''
								}`}>
								{sending ? 'Sending...' : 'Send New Password'}
							</button>
						</form>
						<br />

						<h5 className='text-center'>
							Go Back to <Link to='/login'>Login</Link> or{' '}
							<Link to='/register'>Register</Link>
						</h5>
						<h5 className='text-center mt-3'>
							<Link to='/'>Go to Home</Link>
						</h5>
					</div>
				</div>
			</div>
		)
	}
}

export default ForgotPasswordPage
