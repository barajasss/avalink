import React, { Component } from 'react'
import Logo from '../../components/logo/logo.component'

import { Link } from 'react-router-dom'

import './dashboard-header.styles.scss'

class DashboardHeader extends Component {
	Header
	render() {
		return (
			<div className='dashboard-header py-4 px-3 d-flex justify-content-between bg-dark text-white'>
				<Link to='/settings' className='menu-icon text-white'>
					<i className='fas fa-bars fa-2x' />
				</Link>
				<div className='logo-container'>
					<Logo
						small
						customStyle={{
							border: '3px solid white',
							borderRadius: '50%',
						}}
					/>
				</div>
				<h6>0 Links</h6>
			</div>
		)
	}
}

export default DashboardHeader
