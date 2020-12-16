import UserActionTypes from './user.types'
import {
	registerUser as registerUserFirebase,
	loginUser as loginUserFirebase,
	logoutUser as logoutUserFirebase,
} from '../../firebase/utils/auth.utils'
import { fetchData as fetchDataFirebase } from '../../firebase/utils/firestore.utils'

const setUser = user => ({
	type: UserActionTypes.SET_USER,
	payload: user,
})

const unsetUser = () => ({
	type: UserActionTypes.UNSET_USER,
})

const updateUser = (propName, propvalue) => ({
	type: UserActionTypes.UPDATE_USER,
	payload: { propName, propvalue },
})

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
			loggedUser = await loginUserFirebase(user)
		}
		const about = await fetchDataFirebase(user, 'about')
		dispatch(
			setUser({
				name: loggedUser.user && loggedUser.user.displayName,
				about,
				...user,
			})
		)
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
}
