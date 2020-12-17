import React, { Suspense } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Loading from '../loading/loading.component'
import ErrorBoundary from '../error-boundary/error-boundary.component'

const HomePage = React.lazy(() => import('../../pages/home/home.component'))

const RegisterPage = React.lazy(() =>
	import('../../pages/register/register.component')
)
const LoginPage = React.lazy(() => import('../../pages/login/login.component'))

const ForgotPasswordPage = React.lazy(() =>
	import('../../pages/forgot-password/forgot-password.component')
)

// MAIN MENU

const DashboardPage = React.lazy(() =>
	import('../../pages/dashboard/dashboard.component')
)

const SettingPage = React.lazy(() =>
	import('../../pages/setting/setting.component')
)

const EditProfilePage = React.lazy(() =>
	import('../../pages/edit-profile/edit-profile.component')
)

const ChangePasswordPage = React.lazy(() =>
	import('../../pages/change-password/change-password.component')
)

class Router extends React.Component {
	render() {
		return (
			<ErrorBoundary>
				<Suspense fallback={<Loading />}>
					<Switch>
						<Route exact path='/'>
							<HomePage />
						</Route>
						<Route path='/register'>
							<RegisterPage />
						</Route>
						<Route path='/login'>
							<LoginPage />
						</Route>
						<Route path='/forgot-password'>
							<ForgotPasswordPage />
						</Route>

						{/* DASHBOARD AND MENU*/}
						<Route exact path='/u/:id'>
							<DashboardPage profilePage />
						</Route>
						<Route path='/dashboard'>
							<DashboardPage />
						</Route>
						<Route path={['/setting', '/settings']}>
							<SettingPage />
						</Route>
						<Route path='/edit-profile'>
							<EditProfilePage />
						</Route>
						<Route path='/change-password'>
							<ChangePasswordPage />
						</Route>

						{/* 404 Not Found */}
						<Route path='*' exact={true}>
							<Redirect to='/' />
						</Route>
					</Switch>
				</Suspense>
			</ErrorBoundary>
		)
	}
}

export default Router
