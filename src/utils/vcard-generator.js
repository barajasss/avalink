import vCardsJS from 'vcards-js'

const createVCardDataUrl = ({ name, username, about, email }) => {
	console.log(name, username, about, email)
	const url =
		window.location.origin + process.env.REACT_APP_PROFILE_URL + username

	const vCard = vCardsJS()
	vCard.formattedName = name
	// vCard.photo.attachFromUrl(imageUrl, type.toUpperCase())
	vCard.url = url
	vCard.email = email
	vCard.source = url
	vCard.note = about
	const blob = new Blob([vCard.getFormattedString()], {
		type: 'text/vcard',
	})
	return URL.createObjectURL(blob)
}

export { createVCardDataUrl }
