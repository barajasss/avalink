import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Dashboard extends Component {
	render() {
		const { isLoggedIn } = this.props
		if (!isLoggedIn) {
			return <Redirect to='/' />
		}
		return (
			<div>
				<h1>Dashboard</h1>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
})

export default connect(mapStateToProps)(Dashboard)
