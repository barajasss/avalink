import firebase from '../firebase'

const storageRef = firebase.storage().ref()

const saveProfileImage = async (file, fileType) => {
	const user = firebase.auth().currentUser
	const doc = await firebase
		.firestore()
		.collection('users')
		.doc(user.uid)
		.get()
	const data = doc.data()

	let filename = data.id
	let type = fileType.slice(fileType.indexOf('/') + 1)

	// PREV IMAGE CLEANUP IF FORMAT IS DIFFERENT BUT NEED TO CHECK IF IMAGE EXISTS FIRST
	// const imageLocation = data.imageUrl.slice(
	// 	data.imageUrl.lastIndexOf('/') + 1,
	// 	data.imageUrl.indexOf('?')
	// )

	// const previousRef = storageRef.child(decodeURIComponent(imageLocation))
	const ref = storageRef.child(`/users/${filename}.${type}`)
	try {
		// await previousRef.delete()
		await ref.putString(file, 'data_url')
		return await ref.getDownloadURL()
	} catch (err) {
		throw err
	}
}

export { saveProfileImage }
