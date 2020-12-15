import React, { Component } from 'react'
import Input from '../../components/input/input.component'
import Logo from '../../components/logo/logo.component'
import { Link } from 'react-router-dom'

class LoginPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
		}
	}
	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	handleSubmit = e => {
		e.preventDefault()
		console.log(this.state)
	}
	render() {
		return (
			<div className='container py-5'>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<Logo size='md' />
						<br />
						<h1 className='text-center'>Welcome Back to Ava</h1>
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
									<button className='btn btn-dark btn-block'>
										Login
									</button>
								</div>
							</div>
						</form>
						<br />

						<h5 className='text-center'>
							Already have an account?{' '}
							<Link to='/register'>Register</Link>
						</h5>
					</div>
				</div>
			</div>
		)
	}
}

export default LoginPage
