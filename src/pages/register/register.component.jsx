import React, { Component } from 'react'
import Input from '../../components/input/input.component'
import Logo from '../../components/logo/logo.component'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { withRouter } from 'react-router-dom'
import { registerUser } from '../../redux/user/user.actions'
import { connect } from 'react-redux'

import {
	checkUsernameExists,
	generateUniqueUsername,
} from '../../firebase/utils/firestore.utils'

import { toast } from 'react-toastify'

class RegisterPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			username: '',
			email: '',
			password: '',
			passwordModified: false,
			registering: false,
			usernameModified: false,
			generatingUsername: false,
			usernameText: {
				error: false,
				message: '',
			},
			passwordText: {
				error: false,
				message: '',
			},
		}
	}

	handleChange = async e => {
		const { usernameModified, passwordModified } = this.state
		this.setState({
			[e.target.name]: e.target.value,
		})

		clearTimeout(this.timeout)
		this.timeout = setTimeout(async () => {
			if (e.target.name === 'name' && !usernameModified) {
				// generate username on name change on for the first time
				this.setState({
					generatingUsername: true,
					username: '',
				})
				try {
					const username = await generateUniqueUsername(
						e.target.value
					)
					this.setState({
						username,
						generatingUsername: false,
						usernameText: {
							error: false,
							message: 'Username is valid.',
						},
					})
				} catch (err) {
					this.setState({
						username: '',
						generatingUsername: false,
					})
				}
			}
			if (e.target.name === 'username') {
				if (e.target.value === '') {
					this.setState({
						usernameText: {
							error: false,
							message: '',
						},
					})
				}
				// will run evreytime username is changed
				if (!usernameModified) {
					this.setState({
						usernameModified: true,
					})
				}
				this.setState({
					usernameText: {
						processing: true,
						error: false,
						message: 'Checking username...',
					},
				})
				const usernameValidation = await this.validateUsername(
					e.target.value
				)
				if (usernameValidation.valid) {
					this.setState({
						usernameText: {
							error: false,
							message: usernameValidation.message,
						},
					})
				} else {
					this.setState({
						usernameText: {
							error: true,
							message: usernameValidation.message,
						},
					})
				}
			}
		}, 1000)

		if (e.target.name === 'password') {
			if (!passwordModified) {
				this.setState({ passwordModified: true })
			}
			if (passwordModified) {
				const passwordValidation = this.validatePassword(e.target.value)
				if (passwordValidation.valid) {
					this.setState({
						passwordText: {
							error: false,
							message: passwordValidation.message,
						},
					})
				} else {
					this.setState({
						passwordText: {
							error: true,
							message: passwordValidation.message,
						},
					})
				}
			}
		}
	}
	validateUsername = async username => {
		// first check username syntax...
		if (username.match(/[^a-zA-Z0-9.]/)) {
			return {
				valid: false,
				message: 'Only letters and numbers are allowed.',
			}
		}
		// then check if username exists
		if (await checkUsernameExists(username)) {
			return {
				valid: false,
				message: 'Username already exists.',
			}
		}
		return {
			valid: true,
			message: 'Username is valid.',
		}
	}
	validatePassword = password => {
		// first check username syntax...
		if (password.length < 6) {
			return {
				valid: false,
				message: 'Password length must be 6 characters.',
			}
		}
		return {
			valid: true,
			message: 'Password is valid.',
		}
	}
	handleSubmit = async e => {
		e.preventDefault()
		const { registerUser, history } = this.props
		const { name, email, password, registering } = this.state
		if (registering) {
			return
		}
		try {
			this.setState({
				registering: true,
			})
			await registerUser({
				name,
				email,
				password,
			})
			toast.success(
				'Account registered successfully. Please login to your account!',
				{ hideProgressBar: true }
			)
			return history.push({
				pathname: '/login',
				state: { from: 'register' },
			})
		} catch (err) {
			console.log(err)
			toast.error(
				err.message || 'Error in registering. Please try again later.'
			)
		}
		this.setState({
			registering: false,
		})
	}
	render() {
		const {
			registering,
			name,
			username,
			email,
			password,
			generatingUsername,
			usernameText,
			passwordText,
		} = this.state
		return (
			<div className='container py-5'>
				<Helmet>
					<title>
						{process.env.REACT_APP_PRODUCT_NAME} | Register
					</title>
				</Helmet>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<Logo size='md' />
						<br />
						<h1 className='text-center'>
							Welcome to {process.env.REACT_APP_PRODUCT_NAME}
						</h1>
						<br />
						<h4 className='text-center'>
							Register and easily maintain your profile links.
						</h4>
						<br />
						<form onSubmit={this.handleSubmit}>
							<Input
								name='name'
								placeholder='Full name'
								onChange={this.handleChange}
								value={name}
							/>
							<Input
								name='username'
								placeholder={
									generatingUsername
										? 'Generating username...'
										: 'Username (only letters and numbers)'
								}
								type='text'
								value={username}
								onChange={this.handleChange}
								text={usernameText}
							/>
							<Input
								name='email'
								type='email'
								placeholder='Email address'
								onChange={this.handleChange}
								value={email}
							/>
							<Input
								name='password'
								placeholder='Password'
								type='password'
								onChange={this.handleChange}
								value={password}
								text={passwordText}
							/>
							<button
								className={`btn btn-dark btn-block ${
									registering ? 'disabled' : ''
								}`}>
								{registering
									? 'Creating your account...'
									: 'Register'}{' '}
							</button>
						</form>
						<br />

						<h5 className='text-center'>
							Already have an account?{' '}
							<Link to='/login'>Login</Link>
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
	registerUser: user => dispatch(registerUser(user)),
})

export default connect(null, mapDispatchToProps)(withRouter(RegisterPage))
