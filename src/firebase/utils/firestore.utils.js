import firebase from '../firebase'

import shortId from 'shortid'
const db = firebase.firestore()

const createUserDefaults = async user => {
	try {
		await db.collection('users').doc(user.uid).set({
			name: user.displayName,
			id: shortId.generate(),
			totalProfileLinks: 0,
			quickLink: false,
			imageUrl: '',
			about: '',
			instagram: '',
			snapchat: '',
			twitter: '',
			facebook: '',
			linkedin: '',
			text: '',
			email: '',
			youtube: '',
			tiktok: '',
			soundcloud: '',
			spotify: '',
			apple: '',
			venmo: '',
			cashapp: '',
			paypal: '',
			whatsapp: '',
			twitch: '',
			customlink: '',
			website: '',
			address: '',
		})
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
	try {
		db.collection('users')
			.doc(user.uid)
			.set(
				{
					[name]: value,
				},
				{ merge: true }
			)
	} catch (err) {
		throw err
	}
}

const updateBulkData = async (user, data) => {
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

const fetchData = async (type, name, useId) => {
	try {
		if (useId) {
			const snapshot = await db
				.collection('users')
				.where('id', '==', type)
				.get()
			if (snapshot.docs[0]) {
				const data = await snapshot.docs[0].data()
				if (data) {
					return data[name]
				}
			} else {
				return
			}
		} else {
			const doc = await db.collection('users').doc(type.uid).get()
			const data = doc.data()
			if (data) {
				return data[name]
			}
		}
	} catch (err) {
		throw err
	}
}

const transformLinksForApp = data => {
	// map links data properly for the redux store...
	let links = []
	Object.keys(data).forEach(link => {
		if (
			data[link] &&
			link !== 'id' &&
			link !== 'name' &&
			link !== 'about' &&
			link !== 'quickLink' &&
			link !== 'imageUrl' &&
			link !== 'totalProfileLinks'
		) {
			links = [...links, { type: link, link: data[link] }]
		}
	})
	return links
}

const fetchLinks = async (type, useId) => {
	try {
		let links = []
		let doc
		let data
		if (useId) {
			const snapshot = await db
				.collection('users')
				.where('id', '==', type)
				.get()
			if (snapshot.docs[0]) {
				data = await snapshot.docs[0].data()
			} else {
				return
			}
		}
		if (type.uid) {
			doc = await db.collection('users').doc(type.uid).get()
			data = doc.data()
		}
		links = transformLinksForApp(data)
		return links
	} catch (err) {
		throw err
	}
}

const fetchDefaultLinks = async () => {
	try {
		let links = []
		const doc = await db.collection('defaults').doc('links').get()
		const data = doc.data()
		if (data) {
			Object.keys(data).forEach(link => {
				links = [...links, { type: link, link: data[link] }]
			})
		}
		return links
	} catch (err) {
		throw err
	}
}

const incrementTotalProfileLinks = user => {
	try {
		db.collection('users')
			.doc(user.uid)
			.update({
				totalProfileLinks: firebase.firestore.FieldValue.increment(1),
			})
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
