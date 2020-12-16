import firebase from '../firebase'
import { createUserDefaults } from './firestore.utils'

const registerUser = async ({ name, email, password }) => {
	try {
		// create user with proper profile details

		await firebase.auth().createUserWithEmailAndPassword(email, password)
		const user = firebase.auth().currentUser
		await user.updateProfile({
			displayName: name,
		})

		// don't log user after registering...
		await createUserDefaults(user)
		await firebase.auth().signOut()
	} catch (err) {
		console.log(err)
		throw err
	}
}

const loginUser = async ({ email, password }) => {
	try {
		const user = await firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
		return user
	} catch (err) {
		throw err
	}
}

const logoutUser = async () => {
	try {
		await firebase.auth().signOut()
	} catch (err) {
		throw err
	}
}

const getCurrentUser = async () => {
	try {
		const user = await firebase.auth().currentUser
		return user
	} catch (err) {
		throw err
	}
}

export { registerUser, loginUser, logoutUser, getCurrentUser }
