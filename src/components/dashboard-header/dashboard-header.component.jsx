import React, { Component } from 'react'
import Logo from '../../components/logo/logo.component'

import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import './dashboard-header.styles.scss'

class DashboardHeader extends Component {
	render() {
		const {
			editProfile,
			saveDetails,
			savingDetails,
			profilePage,
			totalProfileLinks,
			totalProfileLinksLoaded,
		} = this.props
		return (
			<div className='dashboard-header py-4 px-3 d-flex justify-content-between bg-dark text-white'>
				{!profilePage && (
					<Link to='/settings' className='menu-icon text-white'>
						<i className='fas fa-bars fa-2x' />
					</Link>
				)}
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
					<button
						className={`save-btn ${
							savingDetails ? 'disabled' : ''
						}`}
						onClick={saveDetails}>
						{savingDetails ? 'Saving...' : 'Save'}
					</button>
				) : (
					!profilePage &&
					totalProfileLinksLoaded && (
						<h6>
							{totalProfileLinks}{' '}
							{totalProfileLinks > 1 ? 'Links' : 'Link'}
						</h6>
					)
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	totalProfileLinks: state.links.totalProfileLinks,
	totalProfileLinksLoaded: state.links.totalProfileLinksLoaded,
})

export default connect(mapStateToProps)(DashboardHeader)
