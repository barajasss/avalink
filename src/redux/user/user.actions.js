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
} from '../../firebase/utils/firestore.utils'

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
	}
	if (name === 'about') {
		try {
			await updateDataFirebase(await getCurrentUser(), name, value)
			dispatch(updateUser(name, value))
		} catch (err) {
			throw err
		}
	} else {
		try {
			// udpate user display name as well as firebase data name
			await updateUserFirebase(firebaseUpdateProp, value)
			await updateDataFirebase(await getCurrentUser(), name, value)
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
	try {
		let loggedUser = {}
		if (!avoidLogin) {
			// avoid login is used by app on auth state changed
			loggedUser = await loginUserFirebase(user)
		}
		const name = await fetchDataFirebase(await getCurrentUser(), 'name')
		const about = await fetchDataFirebase(await getCurrentUser(), 'about')
		dispatch(
			setUser({
				about,
				...user,
				name: name || user.name,
			})
		)
	} catch (err) {
		throw err
	}
}

const loadUserFromId = id => async dispatch => {
	// used for loading profile data from url ID even if the user is not logged in.
	try {
		const user = await getUserDetailsById(id)
		if (user) {
			dispatch(setUser({ name: user.name, about: user.about }))
		}
		return user
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
