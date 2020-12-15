import React, { Component } from 'react'
import Input from '../../components/input/input.component'
import Logo from '../../components/logo/logo.component'
import { Link } from 'react-router-dom'

class RegisterPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
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
						<h1 class='text-center'>Welcome to Ava</h1>
						<br />
						<h4 class='text-center'>
							Register and easily maintain your profile links.
						</h4>
						<br />
						<Input
							name='name'
							placeholder='Full name'
							onChange={this.onChange}
						/>
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
						<button class='btn btn-dark btn-block'>Register</button>
						<br />

						<h5 class='text-center'>
							Already have an account?{' '}
							<Link to='/login'>Login</Link>
						</h5>
					</div>
				</div>
			</div>
		)
	}
}

export default RegisterPage
