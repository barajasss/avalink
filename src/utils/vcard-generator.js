import vCardsJS from 'vcards-js'

const createVCardDataUrl = (props, links) => {
	console.log(props, links)
	const phoneNumber = links.find(link => link.name === 'text').data
	const { name, username, about, email } = props
	const url =
		window.location.origin + process.env.REACT_APP_PROFILE_URL + username

	const vCard = vCardsJS()
	vCard.formattedName = name
	// vCard.photo.attachFromUrl(imageUrl, type.toUpperCase())
	vCard.url = url
	vCard.email = email
	vCard.source = url
	vCard.note = about
	vCard.workPhone = phoneNumber
	const blob = new Blob([vCard.getFormattedString()], {
		type: 'text/vcard',
	})
	return URL.createObjectURL(blob)
}

export { createVCardDataUrl }
