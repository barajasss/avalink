import firebase from '../firebase'

import defaultLinks from './defaultLinks'
import userDefaults from './userDefaults'

import shortId from 'shortid'
const db = firebase.firestore()

const createUserDefaults = async () => {
	const user = firebase.auth().currentUser
	try {
		await db.collection('users').doc(user.uid).set(userDefaults(user))
	} catch (err) {
		throw err
	}
}

const checkUsernameExists = async username => {
	const snapshot = await db
		.collection('users')
		.where('username', '==', username)
		.get()
	return !snapshot.empty
}

const checkEmailExists = async email => {
	const snapshot = await db
		.collection('users')
		.where('details.email', '==', email)
		.get()
	return !snapshot.empty
}

const getEmailFromUsername = async username => {
	const snapshot = await db
		.collection('users')
		.where('username', '==', username)
		.get()
	console.log(snapshot)
	if (!snapshot.empty) {
		return snapshot.docs[0].data().details.email
	}
	return null
}

const generateUniqueUsername = async name => {
	if (!name) return ''
	let username = name.replace(/[ ]/g, '.')
	username = username.replace(/[^a-zA-Z0-9.]/, '')
	try {
		if (await checkUsernameExists(username)) {
			// if username exists, then generate another using short id
			return username + shortId.generate()
		} else {
			// else return the simple username
			return username
		}
	} catch (err) {
		throw err
	}
}

const getUserDetailsById = async id => {
	try {
		const snapshot = await db
			.collection('users')
			.where('username', '==', id)
			.get()
		if (snapshot.docs[0]) {
			const data = await snapshot.docs[0].data()
			if (data) return data
		} else {
			return
		}
	} catch (err) {
		throw err
	}
}

const getId = async () => {
	// returns the shortId and creates it if it does not exist
	const user = firebase.auth().currentUser
	try {
		const doc = await db.collection('users').doc(user.uid).get()
		const username = doc.data().username
		if (username) {
			return username
		} else {
			// create new id and store it if it does not exist
			const newId = shortId.generate()
			await db.collection('users').doc(user.uid).set(
				{
					username: newId,
				},
				{ merge: true }
			)
			return newId
		}
	} catch (err) {
		throw err
	}
}

const updateData = async (user, name, value) => {
	// will not work now...
	user = firebase.auth().currentUser
	try {
		db.collection('users')
			.doc(user.uid)
			.update({
				[name]: value,
			})
	} catch (err) {
		throw err
	}
}

const updateBulkData = async (user, data) => {
	// will also not work now...
	user = firebase.auth().currentUser
	try {
		db.collection('users')
			.doc(user.uid)
			.set(
				{
					...data,
				},
				{ merge: true }
			)
	} catch (err) {
		throw err
	}
}

const fetchData = async (parent, type, name, useId) => {
	try {
		if (useId) {
			const snapshot = await db
				.collection('users')
				.where('username', '==', type)
				.get()
			if (snapshot.docs[0]) {
				const data = await snapshot.docs[0].data()
				if (data) {
					if (parent) {
						return data[parent][name]
					}
					return data[name]
				}
			} else {
				return
			}
		} else {
			const user = firebase.auth().currentUser
			if (user) {
				const doc = await db.collection('users').doc(user.uid).get()
				const data = doc.data()
				if (data) {
					if (parent) {
						return data[parent][name]
					}
					return data[name]
				}
			}
		}
	} catch (err) {
		throw err
	}
}

const fetchLinks = async (type, useId) => {
	try {
		let doc
		let data
		if (useId) {
			const snapshot = await db
				.collection('users')
				.where('username', '==', type)
				.get()
			if (snapshot.docs[0]) {
				data = await snapshot.docs[0].data().links
			} else {
				return
			}
		}
		if (type.uid) {
			doc = await db.collection('users').doc(type.uid).get()
			data = doc.data().links
		}
		return data
	} catch (err) {
		throw err
	}
}

const fetchDefaultLinks = () => {
	return defaultLinks
}

const incrementTotalProfileLinks = async id => {
	try {
		// get document from user Id
		const snapshot = await db
			.collection('users')
			.where('username', '==', id)
			.get()
		const doc = await snapshot.docs[0]
		if (doc) {
			await doc.ref.update({
				'details.totalProfileLinks': firebase.firestore.FieldValue.increment(
					1
				),
			})
		}
	} catch (err) {
		throw err
	}
}

export {
	getUserDetailsById,
	getId,
	createUserDefaults,
	updateData,
	incrementTotalProfileLinks,
	fetchLinks,
	fetchDefaultLinks,
	fetchData,
	updateBulkData,
	generateUniqueUsername,
	checkUsernameExists,
	checkEmailExists,
	getEmailFromUsername,
}
