import React, { Component } from 'react'
import Logo from '../../components/logo/logo.component'

import { Link } from 'react-router-dom'

import './dashboard-header.styles.scss'

class DashboardHeader extends Component {
	render() {
		const { editProfile, saveDetails } = this.props
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
				{editProfile ? (
					<button className='save-btn' onClick={saveDetails}>
						Save
					</button>
				) : (
					<h6>0 Links</h6>
				)}
			</div>
		)
	}
}

export default DashboardHeader
