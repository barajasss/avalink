import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../components/logo/logo.component'

import { Helmet } from 'react-helmet'
import './home.styles.scss'

export default class HomePage extends Component {
	render() {
		return (
			<div>
				<Helmet>
					<title>{process.env.REACT_APP_PRODUCT_NAME} | Home</title>
				</Helmet>
				<div
					className='jumbotron jumbotron-fluid py-4 bg-dark text-white'
					style={{ backgroundImage: `url('/images/star sky.jpg')` }}>
					<div className='home-logo-container mb-2'>
						<Logo border />
					</div>
					<h1 className='text-center'>
						Welcome to {process.env.REACT_APP_PRODUCT_NAME}
					</h1>
					<div className='d-flex flex-row justify-content-center mt-4'>
						<Link
							to='/register'
							style={{ color: 'lightblue', fontSize: '1.2em' }}>
							Register
						</Link>
						<span className='mx-3'></span>
						<Link
							to='/login'
							style={{ color: 'lightblue', fontSize: '1.2em' }}>
							Login
						</Link>
					</div>
				</div>
				<div className='container text-center'>
					<div className='row'>
						<div className='col-md-6 feature-text-container'>
							<div>
								<h3>All accounts in one place</h3>
								<p className='lead pt-2'>
									Store and manage all your social media links
									and acounts in one place.
								</p>
							</div>
						</div>
						<div className='col-md-6 p-4'>
							<img
								src='/images/all in one.jpg'
								className='img-fluid feature-images'
							/>
						</div>
					</div>
					<div className='row'>
						<div className='col-md-6 p-4'>
							<img
								src='/images/qr code.jpg'
								className='img-fluid feature-images'
							/>
						</div>
						<div className='col-md-6 feature-text-container'>
							<div>
								<h3>Share with QR or Link</h3>
								<p className='lead pt-2'>
									You can easily share your account profile
									using the QR code or link share feature. It
									is extremely helpful!
								</p>
							</div>
						</div>
					</div>

					<div className='row'>
						<div className='col-md-6 feature-text-container'>
							<div>
								<h3>Extremely easy to use</h3>
								<p className='lead pt-2'>
									It is no brainer to use our{' '}
									{process.env.REACT_APP_PRODUCT_NAME} app.
									Simple and intuitive design for everyone.
								</p>
							</div>
						</div>
						<div className='col-md-6 p-4'>
							<img
								src='/images/dashboard.jpg'
								className='img-fluid feature-images'
							/>
						</div>
					</div>
				</div>

				<div className='footer'>
					<div className='container py-3'>
						<h3 className='text-white text-center'>
							Start Using Today. Its Free!
						</h3>
						<br />
						<div className='row'>
							<div className='col-6 col-md-4 offset-md-2'>
								<Link
									className='btn btn-outline-light btn-block'
									to='/register'>
									Register
								</Link>
							</div>
							<div className='col-6 col-md-4'>
								<Link
									className='btn btn-outline-light btn-block'
									to='/login'>
									Login
								</Link>
							</div>
						</div>
						<br />
						<h6 className='text-center text-white'>
							Copyright &copy; {new Date().getFullYear()}
						</h6>
					</div>
				</div>
			</div>
		)
	}
}
