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

const updateUser = async (name, value) => {
	try {
		const user = firebase.auth().currentUser
		await user.updateProfile({
			[name]: value,
		})
		return user
	} catch (err) {
		throw err
	}
}

const updatePassword = async (oldPassword, newPassword) => {
	try {
		const user = firebase.auth().currentUser
		const credentials = firebase.auth.EmailAuthProvider.credential(
			user.email,
			oldPassword
		)
		await user.reauthenticateWithCredential(credentials)
		await user.updatePassword(newPassword)
	} catch (err) {
		throw err
	}
}

const sendResetPassword = async email => {
	try {
		await firebase.auth().sendPasswordResetEmail(email)
	} catch (err) {
		throw err
	}
}

export {
	registerUser,
	loginUser,
	logoutUser,
	getCurrentUser,
	updateUser,
	updatePassword,
	sendResetPassword,
}
