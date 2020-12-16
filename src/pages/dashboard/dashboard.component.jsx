import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardHeader from '../../components/dashboard-header/dashboard-header.component'
import DashboardUser from '../../components/dashboard-user/dashboard-user.component'
import DashboardLinks from '../../components/dashboard-links/dashboard-links.component'

import './dashboard.styles.scss'

class Dashboard extends Component {
	render() {
		const { isLoggedIn } = this.props
		if (!isLoggedIn) {
			return <Redirect to='/' />
		}
		return (
			<div className='dashboard'>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<DashboardHeader />
						<DashboardUser />
						<DashboardLinks />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(Dashboard)
