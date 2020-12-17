import LinksActionTypes from './links.types'

import { getCurrentUser } from '../../firebase/utils/auth.utils'
import {
	updateData as updateLinkFirebase,
	fetchLinks as fetchLinksFirebase,
	fetchDefaultLinks as fetchDefaultLinksFirebase,
	updateBulkData as updateBulkDataFirebase,
} from '../../firebase/utils/firestore.utils'

const setLink = (type, link) => ({
	type: LinksActionTypes.SET_LINK,
	payload: { type, link },
})

const setDefaultLinks = links => ({
	type: LinksActionTypes.SET_DEFAULT_LINKS,
	payload: links,
})

const setLinkMultiple = links => ({
	type: LinksActionTypes.SET_LINK_MULTIPLE,
	payload: links,
})

const unsetLink = type => ({
	type: LinksActionTypes.UNSET_LINK,
	payload: type,
})

const fetchLinks = () => async dispatch => {
	try {
		const user = await getCurrentUser()
		const links = await fetchLinksFirebase(user)
		dispatch(setLinkMultiple(links))
		return links
	} catch (err) {
		throw err
	}
}

const fetchDefaultLinks = () => async dispatch => {
	try {
		const links = await fetchDefaultLinksFirebase()
		dispatch(setDefaultLinks(links))
		return links
	} catch (err) {
		throw err
	}
}

const updateLink = (type, link) => async dispatch => {
	// use to set or unset or modify any links.
	const user = await getCurrentUser()
	try {
		await updateLinkFirebase(user, type, link)
		dispatch(setLink(type, link))
	} catch (err) {
		throw err
	}
}

const updateMultipleLinks = links => async dispatch => {
	try {
		let transformedLinks = {}

		// filter links from empty values
		links = links.filter(item => item.link !== '')

		// map and transform data to a proper format before persisting to firebase
		links.forEach(link => {
			transformedLinks = {
				...transformedLinks,
				[link.type]: link.link,
			}
		})
		await updateBulkDataFirebase(await getCurrentUser(), transformedLinks)
		dispatch(setLinkMultiple(links))
	} catch (err) {
		throw err
	}
}

const removeLink = type => async dispatch => {
	// use to set or unset or modify any links.
	const user = await getCurrentUser()
	try {
		await updateLinkFirebase(user, type, '')
		dispatch(unsetLink(type))
	} catch (err) {
		throw err
	}
}

export {
	setLink,
	unsetLink,
	updateLink,
	removeLink,
	fetchLinks,
	fetchDefaultLinks,
	updateMultipleLinks,
}
