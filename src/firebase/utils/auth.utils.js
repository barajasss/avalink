import firebase from '../firebase'

const registerUser = async ({ name, email, password }) => {
	try {
		// create user with proper profile details

		await firebase.auth().createUserWithEmailAndPassword(email, password)
		const user = firebase.auth().currentUser
		await user.updateProfile({
			displayName: name,
		})

		// don't log user after registering...
		await firebase.auth().signOut()
	} catch (err) {
		console.log(err)
		throw err
	}
}

const loginUser = async ({ email, password }) => {
	try {
		await firebase.auth().signInWithEmailAndPassword(email, password)
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

export { registerUser, loginUser, logoutUser }
