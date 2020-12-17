import React, { Component } from 'react'

import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardHeader from '../../components/dashboard-header/dashboard-header.component'
import DashboardUser from '../../components/dashboard-user/dashboard-user.component'
import DashboardLinks from '../../components/dashboard-links/dashboard-links.component'

import './dashboard.styles.scss'

class Dashboard extends Component {
	componentDidMount() {
		const { isLoggedIn, profilePage, match } = this.props
		// if (profilePage && !isLoggedIn) { !enable later!
		if (profilePage) {
			// load and fetch all the user details if the user is not logged in.
			const id = match.params.id
			console.log('into the profile page', id)
		} else {
			// the app component loads all the data if the user is logged in.
		}
	}
	render() {
		const { isLoggedIn, profilePage } = this.props
		if (!isLoggedIn && !profilePage) {
			return <Redirect to='/' />
		}
		return (
			<div className='dashboard'>
				<div className='row'>
					<div className='col-md-8 offset-md-2'>
						<DashboardHeader profilePage={profilePage} />
						<DashboardUser profilePage={profilePage} />
						<DashboardLinks profilePage={profilePage} />
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(withRouter(Dashboard))
