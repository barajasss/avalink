import firebase from '../firebase'

const db = firebase.firestore()

const createUserDefaults = async user => {
	try {
		await db.collection('users').doc(user.uid).set({
			totalProfileLinks: 0,
			bio: '',
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

const fetchLinks = async user => {
	try {
		let links = []
		const doc = await db.collection('users').doc(user.uid).get()
		const data = doc.data()

		// filter links with empty string
		if (data) {
			Object.keys(data).forEach(link => {
				if (
					data[link] &&
					link !== 'bio' &&
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
	createUserDefaults,
	updateData,
	incrementTotalProfileLinks,
	fetchLinks,
	fetchDefaultLinks,
}
