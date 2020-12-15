import React, { Component } from 'react'

import { connect } from 'react-redux'
import './dashboard-user.styles.scss'

class DashboardUser extends Component {
	render() {
		const { name } = this.props
		return (
			<div className='dashboard-user'>
				<div className='row'>
					<div className='col-4 display-image'>
						<img
							src={process.env.PUBLIC_URL + 'user.png'}
							alt='user display'
						/>
					</div>
					<div className='col-6'>
						<h3 className='text-capitalize'>{name}</h3>
					</div>
					<div className='col-2'>
						<img
							className='qr-icon'
							src={process.env.PUBLIC_URL + 'icons/qrcode.png'}
							alt='qr icon'
						/>
						<i className='fas fa-link link-icon' />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	name: state.user.name,
})

export default connect(mapStateToProps)(DashboardUser)
