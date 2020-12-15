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
							<button className='btn btn-dark btn-block'>
								Register
							</button>
						</form>
						<br />

						<h5 className='text-center'>
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
