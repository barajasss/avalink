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
	} catch (err) {
		throw err
	}
}

const getProfileImage = async (data, type = 'uid') => {
	// get file using uid/id but filename is always "id"
	let filename = data
	if (type === 'uid') {
		const snapshot = firebase
			.firestore()
			.collection('users')
			.where('id', '==', data)
			.get()
		filename = await snapshot.docs[0].data()
	}
	const ref = storageRef.child(`/users/${filename}.png`)
	try {
		return await ref.getDownloadURL()
	} catch (err) {
		throw err
	}
	return
}

export { getProfileImage, saveProfileImage }
