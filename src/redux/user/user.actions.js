import UserActionTypes from './user.types'
import {
	registerUser as registerUserFirebase,
	loginUser as loginUserFirebase,
	logoutUser as logoutUserFirebase,
	updateUser as updateUserFirebase,
	getCurrentUser,
} from '../../firebase/utils/auth.utils'
import {
	fetchData as fetchDataFirebase,
	updateData as updateDataFirebase,
	getUserDetailsById,
	getEmailFromUsername,
} from '../../firebase/utils/firestore.utils'

import * as EmailValidator from 'email-validator'

const setUser = user => ({
	type: UserActionTypes.SET_USER,
	payload: user,
})

const unsetUser = () => ({
	type: UserActionTypes.UNSET_USER,
})

const updateUser = (propName, propValue) => ({
	type: UserActionTypes.UPDATE_USER,
	payload: { propName, propValue },
})

const updateUserAsync = (name, value) => async dispatch => {
	// update user details asynchronously in firebase
	let firebaseUpdateProp = name
	if (name === 'name') {
		firebaseUpdateProp = 'displayName'
		try {
			// udpate user display name as well as firebase data name
			await updateUserFirebase(firebaseUpdateProp, value)
			await updateDataFirebase(
				await getCurrentUser(),
				'details.' + name,
				value
			)
			dispatch(updateUser(name, value))
		} catch (err) {
			throw err
		}
	} else {
		try {
			await updateDataFirebase(
				await getCurrentUser(),
				'details.' + name,
				value
			)
			dispatch(updateUser(name, value))
		} catch (err) {
			throw err
		}
	}
}

const registerUser = user => async dispatch => {
	try {
		await registerUserFirebase(user)
	} catch (err) {
		dispatch(unsetUser(user))
		throw err
	}
}

const resolveAuthState = () => ({
	type: UserActionTypes.RESOLVE_AUTH_STATE,
})

const loginUser = (user, avoidLogin) => async dispatch => {
	let data = user.email
	let password = user.password
	try {
		let loggedUser = {}
		if (!EmailValidator.validate(data)) {
			console.log('not email')
			data = await getEmailFromUsername(data)
			if (!data) {
				throw { message: 'Username does not exist' }
			}
		}
		if (!avoidLogin) {
			// avoid login is used by app on auth state changed
			loggedUser = await loginUserFirebase({
				email: data,
				password,
			})
		}
		const name = await fetchDataFirebase(
			'details',
			await getCurrentUser(),
			'name'
		)
		const about = await fetchDataFirebase(
			'details',
			await getCurrentUser(),
			'about'
		)
		const email = await fetchDataFirebase(
			'details',
			await getCurrentUser(),
			'email'
		)
		const imageUrl = await fetchDataFirebase(
			'details',
			await getCurrentUser(),
			'imageUrl'
		)
		const username = await fetchDataFirebase(
			null,
			await getCurrentUser(),
			'username'
		)
		dispatch(
			setUser({
				...user,
				about,
				name: name || user.name,
				imageUrl,
				email,
				username,
			})
		)
	} catch (err) {
		throw err
	}
}

const loadUserFromId = id => async dispatch => {
	// used for loading profile data from url ID even if the user is not logged in.
	try {
		const details = await getUserDetailsById(id)
		const { user, username } = details
		if (user) {
			dispatch(
				setUser({
					name: user.name,
					about: user.about,
					email: user.emailAddress,
					imageUrl: user.imageUrl,
					username,
				})
			)
		}
		return details
	} catch (err) {
		throw err
	}
}

const logoutUser = () => async dispatch => {
	try {
		await logoutUserFirebase()
		dispatch(unsetUser())
	} catch (err) {
		throw err
	}
}

export {
	setUser,
	unsetUser,
	updateUser,
	registerUser,
	resolveAuthState,
	loginUser,
	logoutUser,
	updateUserAsync,
	loadUserFromId,
}
