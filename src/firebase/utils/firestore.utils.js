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
			.update({
				[name]: value,
			})
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

export { createUserDefaults, updateData, incrementTotalProfileLinks }
