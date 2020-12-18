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

const getUserDetailsById = async id => {
	try {
		const snapshot = await db
			.collection('users')
			.where('id', '==', id)
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
		const id = doc.data().id
		if (id) {
			return id
		} else {
			// create new id and store it if it does not exist
			const newId = shortId.generate()
			await db.collection('users').doc(user.uid).set(
				{
					id: newId,
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
				.where('id', '==', type)
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

const transformLinksForApp = data => {
	// map links data properly for the redux store...
	// transformation probably not required anymore
	let links = []
	Object.keys(data).forEach(link => {
		if (
			data[link] &&
			link !== 'id' &&
			link !== 'name' &&
			link !== 'about' &&
			link !== 'quickLink' &&
			link !== 'imageUrl' &&
			link !== 'emailAddress' &&
			link !== 'totalProfileLinks'
		) {
			links = [...links, { name: link, link: data[link] }]
		}
	})
	return links
}

const fetchLinks = async (type, useId) => {
	try {
		let doc
		let data
		if (useId) {
			const snapshot = await db
				.collection('users')
				.where('id', '==', type)
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
			.where('id', '==', id)
			.get()
		const doc = await snapshot.docs[0]
		if (doc) {
			await doc.ref.set(
				{
					'details.totalProfileLinks': firebase.firestore.FieldValue.increment(
						1
					),
				},
				{ merge: true }
			)
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
	transformLinksForApp,
}
