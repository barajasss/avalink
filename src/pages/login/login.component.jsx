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
	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value,
		})
	}
	render() {
		return (
			<div className='container py-5'>
				<div class='row'>
					<div class='col-md-8 offset-md-2'>
						<Logo size='md' />
						<br />
						<h1 class='text-center'>Welcome Back to Ava</h1>
						<br />
						<h4 class='text-center'>
							Login securely to your account.
						</h4>
						<br />
						<Input
							name='email'
							placeholder='Email address'
							onChange={this.onChange}
						/>
						<Input
							name='password'
							placeholder='Password'
							type='password'
							onChange={this.onChange}
						/>
						<div class='row'>
							<div class='col-md-6'>
								<Link to='/forgot-password'>
									Forgot Password?
								</Link>
							</div>
							<div class='col-md-6'>
								<button class='btn btn-dark btn-block'>
									Login
								</button>
							</div>
						</div>
						<br />

						<h5 class='text-center'>
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
