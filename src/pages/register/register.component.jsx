import React, { Component } from 'react'
import Input from '../../components/input/input.component'
import Logo from '../../components/logo/logo.component'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { withRouter } from 'react-router-dom'
import { registerUser } from '../../redux/user/user.actions'
import { connect } from 'react-redux'

import { toast } from 'react-toastify'

class RegisterPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			email: '',
			password: '',
			registering: false,
		}
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
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
		const { registering } = this.state
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
						<h1 className='text-center'>Welcome to Ava</h1>
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
							/>
							<Input
								name='email'
								type='email'
								placeholder='Email address'
								onChange={this.handleChange}
							/>
							<Input
								name='password'
								placeholder='Password'
								type='password'
								onChange={this.handleChange}
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
