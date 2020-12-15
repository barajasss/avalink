import React, { Component } from 'react'
import Input from '../../components/input/input.component'
import Logo from '../../components/logo/logo.component'
import { Link } from 'react-router-dom'

class ForgotPasswordPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			email: '',
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
						<h2 className='text-center'>Reset your password</h2>
						<br />
						<form onSubmit={this.handleSubmit}>
							<Input
								name='email'
								type='email'
								placeholder='Email address'
								onChange={this.handleChange}
							/>
							<button className='btn btn-dark btn-block'>
								Send New Password
							</button>
						</form>
						<br />

						<h5 className='text-center'>
							Go Back to <Link to='/login'>Login</Link> or{' '}
							<Link to='/register'>Register</Link>
						</h5>
					</div>
				</div>
			</div>
		)
	}
}

export default ForgotPasswordPage
