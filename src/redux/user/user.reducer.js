import UserActionTypes from './user.types'

const initialUserState = {
	username: '',
	name: '',
	email: '',
	about: '',
	imageUrl: '',
	isLoggedIn: false,
	authStateResolved: false,
}

const userReducer = (state = initialUserState, action) => {
	switch (action.type) {
		case UserActionTypes.SET_USER: {
			const { name, email, about, imageUrl, username } = action.payload
			return {
				...state,
				name,
				email,
				about,
				imageUrl,
				username,
				isLoggedIn: true,
			}
		}
		case UserActionTypes.UNSET_USER: {
			return {
				...initialUserState,
				authStateResolved: true,
			}
		}
		case UserActionTypes.UPDATE_USER: {
			const { propName, propValue } = action.payload
			return {
				...state,
				[propName]: propValue,
			}
		}
		case UserActionTypes.RESOLVE_AUTH_STATE: {
			return {
				...state,
				authStateResolved: true,
			}
		}
		default:
			return state
	}
}
export default userReducer
