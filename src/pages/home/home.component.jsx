import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class HomePage extends Component {
	render() {
		return (
			<div>
				<div className='jumbotron jumbotron-fluid'>
					<h1 className='text-center'>Welcome to Ava</h1>
				</div>
				<div class='container'>
					<div class='row'>
						<div class='col-md-6'>
							<Link
								className='btn btn-primary m-2 btn-block'
								to='/register'>
								Register
							</Link>
						</div>
						<div class='col-md-6'>
							<Link
								className='btn btn-primary m-2 btn-block'
								to='/login'>
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		)
	}
}