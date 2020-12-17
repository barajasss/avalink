import firebase from '../firebase'

const storageRef = firebase.storage().ref()

const saveProfileImage = async (file, fileType, id) => {
	// save file using uid/id but filename is always "id"
	let filename = id
	if (!id) {
		const user = firebase.auth().currentUser
		const doc = await firebase
			.firestore()
			.collection('users')
			.doc(user.uid)
			.get()
		const data = doc.data()
		filename = data.id
	}
	fileType = fileType.slice(fileType.indexOf('/') + 1)
	const ref = storageRef.child(`/users/${filename}.${fileType}`)
	try {
		await ref.putString(file, 'data_url')
		return await ref.getDownloadURL()
	} catch (err) {
		throw err
	}
}

export { saveProfileImage }
