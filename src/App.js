import React from 'react'
import Router from './components/router/router.component'
import firebase from './firebase/firebase'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Loading from './components/loading/loading.component'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	loginUser,
	setUser,
	unsetUser,
	resolveAuthState,
} from './redux/user/user.actions'

import './App.css'

class App extends React.Component {
	componentDidMount = () => {
		const {
			setUser,
			unsetUser,
			resolveAuthState,
			location,
			loginUser,
		} = this.props
		this.unsubscribe = firebase.auth().onAuthStateChanged(async user => {
			console.log(user, location)

			if (user && !location.pathname.startsWith('/u')) {
				if (location.state && location.state.from === 'register') {
					return
				}
				const { displayName: name, email, uid } = user
				await loginUser({ name, email, uid }, true)
			} else {
				unsetUser()
			}
			resolveAuthState()
		})
	}
	componentWillUnmount() {
		this.unsubscribe()
	}
	render() {
		const { isLoggedIn, location, authStateResolved } = this.props
		const allowedRoutes = [
			'/setting',
			'/settings',
			'/dashboard',
			'/edit-profile',
			'/register',
			'/change-password',
		]
		// Redirect logic for logged users
		if (
			authStateResolved &&
			isLoggedIn &&
			!location.pathname.match(/\/u\/.+/) &&
			!allowedRoutes.includes(location.pathname) &&
			!location.state
		) {
			return <Redirect to='/dashboard' />
		}

		if (authStateResolved) {
			return (
				<div className='App'>
					<ToastContainer
						position='top-right'
						autoClose={3500}
						newestOnTop={true}
						transition={Slide}
					/>
					<Router />
				</div>
			)
		} else {
			return (
				<>
					<Loading />
					<ToastContainer
						position='top-right'
						autoClose={3500}
						newestOnTop={true}
						transition={Slide}
					/>
				</>
			)
		}
	}
}

const mapStateToProps = state => ({
	isLoggedIn: state.user.isLoggedIn,
	authStateResolved: state.user.authStateResolved,
})

const mapDispatchToProps = dispatch => ({
	setUser: user => dispatch(setUser(user)),
	unsetUser: () => dispatch(unsetUser()),
	resolveAuthState: () => dispatch(resolveAuthState()),
	loginUser: (user, opt) => dispatch(loginUser(user, opt)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App))
