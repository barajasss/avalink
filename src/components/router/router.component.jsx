import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'

const HomePage = React.lazy(() => import('../../pages/home/home.component'))

const RegisterPage = React.lazy(() =>
	import('../../pages/register/register.component')
)
const LoginPage = React.lazy(() => import('../../pages/login/login.component'))

const ForgotPasswordPage = React.lazy(() =>
	import('../../pages/forgot-password/forgot-password.component')
)

class Router extends React.Component {
	render() {
		return (
			<Suspense
				fallback={<h5 className='text-center m-5'>Loading...</h5>}>
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
				</Switch>
			</Suspense>
		)
	}
}

export default Router
