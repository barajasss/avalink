import React, { Component } from 'react'

import { Helmet } from 'react-helmet'

import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import DashboardHeader from '../../components/dashboard-header/dashboard-header.component'
import DashboardUser from '../../components/dashboard-user/dashboard-user.component'
import DashboardLinks from '../../components/dashboard-links/dashboard-links.component'
import Loading from '../../components/loading/loading.component'

import { loadUserFromId } from '../../redux/user/user.actions'
import {
	fetchLinksById,
	fetchDefaultLinks,
} from '../../redux/links/links.actions'
import { incrementTotalProfileLinks } from '../../firebase/utils/firestore.utils'

import './dashboard.styles.scss'

class Dashboard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			userExists: false,
			loading: true,
		}
	}
	async componentDidMount() {
		const {
			profilePage,
			match,
			loadUserFromId,
			fetchLinksById,
			fetchDefaultLinks,
			isLoggedIn,
			history,
		} = this.props

		const id = match.params.id

		if (!isLoggedIn && profilePage) {
			await incrementTotalProfileLinks(id)
		}

		if (profilePage) {
			// load and fetch all the user details if the user is not logged in.
			this.setState({ loading: true })
			const id = match.params.id
			try {
				const data = await loadUserFromId(id)
				await fetchLinksById(0, data)
				await fetchDefaultLinks()
				if (data) {
					this.setState({ userExists: true })
				} else {
					// user does not exist
					return history.push('/register')
				}
			} catch (err) {
				// some other error
				console.log(err)
				this.setState({ userExists: false })
				return history.push('/register')
			}
		}
		this.setState({ loading: false })
	}
	render() {
		const { isLoggedIn, profilePage, quickLink } = this.props
		const { userExists, loading } = this.state
		if (loading && profilePage) {
			return <Loading />
		}
		if (!isLoggedIn && !profilePage) {
			return <Redirect to='/' />
		}
		if (quickLink && profilePage) {
			return <DashboardLinks profilePage={profilePage} />
		}
		return (
			<div className='dashboard'>
				<Helmet>
					<title>
						{process.env.REACT_APP_PRODUCT_NAME} | Dashboard
					</title>
				</Helmet>
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
	quickLink: state.links.quickLink,
})
const mapDispatchToProps = dispatch => ({
	loadUserFromId: id => dispatch(loadUserFromId(id)),
	fetchLinksById: (id, data) => dispatch(fetchLinksById(id, data)),
	fetchDefaultLinks: () => dispatch(fetchDefaultLinks()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(Dashboard))
