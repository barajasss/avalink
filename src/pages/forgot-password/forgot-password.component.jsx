import React, { Component } from 'react'
import Input from '../../components/input/input.component'
import Logo from '../../components/logo/logo.component'
import { Link } from 'react-router-dom'

class ForgotPasswordPage extends Component {
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
						<h2 class='text-center'>Reset your password</h2>
						<br />
						<Input
							name='email'
							placeholder='Email address'
							onChange={this.onChange}
						/>
						<button class='btn btn-dark btn-block'>
							Send New Password
						</button>
						<br />

						<h5 class='text-center'>
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
