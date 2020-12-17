import React, { Component } from 'react'
import Input from '../../components/input/input.component'
import Logo from '../../components/logo/logo.component'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { withRouter } from 'react-router-dom'
import { loginUser } from '../../redux/user/user.actions'
import { connect } from 'react-redux'

import { toast } from 'react-toastify'

class LoginPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			logging: false,
		}
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	handleSubmit = async e => {
		e.preventDefault()
		const { loginUser, history } = this.props
		const { email, password, logging } = this.state
		if (logging) {
			return
		}
		try {
			this.setState({
				logging: true,
			})
			await loginUser({
				email,
				password,
			})
			toast.success('Login Successful', { hideProgressBar: true })
			return setTimeout(() => history.push('/dashboard'), 1100)
		} catch (err) {
			console.log(err)
			if (err.code === 'auth/user-not-found') {
				toast.error('No user exists with this email')
			} else if (err.code === 'auth/wrong-password') {
				toast.error('Password is incorrect')
			} else {
				toast.error(
					err.message ||
						'Error trying to login. Please try again later.'
				)
			}
		}
		this.setState({
			logging: false,
		})
	}
	render() {
		const { logging } = this.state
		return (
			<div className='container py-5'>
				<Helmet>
					<title>{process.env.REACT_APP_PRODUCT_NAME} | Login</title>
				</Helmet>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<Logo size='md' />
						<br />
						<h1 className='text-center'>
							Welcome Back to {process.env.REACT_APP_PRODUCT_NAME}
						</h1>
						<br />
						<h4 className='text-center'>
							Login securely to your account.
						</h4>
						<br />
						<form onSubmit={this.handleSubmit}>
							<Input
								name='email'
								placeholder='Email address'
								type='email'
								onChange={this.handleChange}
							/>
							<Input
								name='password'
								placeholder='Password'
								type='password'
								onChange={this.handleChange}
							/>
							<div className='row'>
								<div className='col-md-6 pb-3'>
									<Link to='/forgot-password'>
										Forgot Password?
									</Link>
								</div>
								<div className='col-md-6'>
									<button
										className={`btn btn-dark btn-block ${
											logging ? 'disabled' : ''
										}`}>
										{!logging ? 'Login' : 'Please wait...'}
									</button>
								</div>
							</div>
						</form>
						<br />

						<h5 className='text-center'>
							Don't have an account?{' '}
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

const mapDispatchToProps = dispatch => ({
	loginUser: user => dispatch(loginUser(user)),
})

export default connect(null, mapDispatchToProps)(withRouter(LoginPage))
