import React, { Component } from 'react'

import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardHeader from '../../components/dashboard-header/dashboard-header.component'
import DashboardUser from '../../components/dashboard-user/dashboard-user.component'
import DashboardLinks from '../../components/dashboard-links/dashboard-links.component'
import Loading from '../../components/loading/loading.component'

import { Link } from 'react-router-dom'
import { loadUserFromId } from '../../redux/user/user.actions'
import { fetchLinksById } from '../../redux/links/links.actions'

import './dashboard.styles.scss'

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userExists: false,
			loading: false,
		}
	}
	async componentDidMount() {
		const {
			profilePage,
			match,
			loadUserFromId,
			fetchLinksById,
		} = this.props
		// if (profilePage && !isLoggedIn) { !enable later!
		if (profilePage) {
			// load and fetch all the user details if the user is not logged in.
			this.setState({ loading: true })
			const id = match.params.id
			try {
				const user = await loadUserFromId(id)
				await fetchLinksById(id)
				if (user) {
					this.setState({ userExists: true })
				}
				console.log(user)
			} catch (err) {
				console.log(err)
				this.setState({ userExists: false })
			}
			this.setState({ loading: false })
		} else {
			// the app component loads all the data if the user is logged in.
		}
	}
	render() {
		const { isLoggedIn, profilePage } = this.props
		const { userExists, loading } = this.state
		if (loading && profilePage) {
			return <Loading />
		}
		if (!loading && !userExists && profilePage) {
			return (
				<h3 className='m-5 text-center'>
					User does not exist <br />
					<Link className='btn btn-dark mt-3' to='/'>
						Home - AvaLink
					</Link>
				</h3>
			)
		}
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
const mapDispatchToProps = dispatch => ({
	loadUserFromId: id => dispatch(loadUserFromId(id)),
	fetchLinksById: id => dispatch(fetchLinksById(id)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Dashboard))
