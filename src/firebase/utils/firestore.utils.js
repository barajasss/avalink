import firebase from '../firebase'

import shortId from 'shortid'
const db = firebase.firestore()

const createUserDefaults = async user => {
	try {
		await db.collection('users').doc(user.uid).set({
			id: shortId.generate(),
			totalProfileLinks: 0,
			quickLink: false,
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

const fetchData = async (user, name) => {
	try {
		const doc = await db.collection('users').doc(user.uid).get()
		const data = doc.data()
		if (data) {
			return data[name]
		}
	} catch (err) {
		throw err
	}
}

const fetchLinks = async user => {
	try {
		let links = []
		const doc = await db.collection('users').doc(user.uid).get()
		const data = doc.data()

		// filter links with empty string
		if (data) {
			// transform data to a proper format
			Object.keys(data).forEach(link => {
				if (
					data[link] &&
					link !== 'id' &&
					link !== 'about' &&
					link !== 'quickLink' &&
					link !== 'totalProfileLinks'
				) {
					links = [...links, { type: link, link: data[link] }]
				}
			})
		}
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
	getId,
	createUserDefaults,
	updateData,
	incrementTotalProfileLinks,
	fetchLinks,
	fetchDefaultLinks,
	fetchData,
	updateBulkData,
}
