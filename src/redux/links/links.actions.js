import LinksActionTypes from './links.types'

import { getCurrentUser } from '../../firebase/utils/auth.utils'
import {
	updateData as updateDataFirebase,
	fetchLinks as fetchLinksFirebase,
	fetchDefaultLinks as fetchDefaultLinksFirebase,
	updateBulkData as updateBulkDataFirebase,
	fetchData as fetchDataFirebase,
	transformLinksForApp,
} from '../../firebase/utils/firestore.utils'

const setTotalProfileLinks = count => ({
	type: LinksActionTypes.SET_TOTAL_PROFILE_LINKS,
	payload: count,
})

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
		const quickLink = await fetchDataFirebase(user, 'quickLink')
		const totalProfileLinks = await fetchDataFirebase(
			user,
			'totalProfileLinks'
		)
		dispatch(setTotalProfileLinks(totalProfileLinks))
		if (quickLink) {
			dispatch(setQuickLink())
		} else {
			dispatch(unsetQuickLink())
		}
		return links
	} catch (err) {
		throw err
	}
}
const fetchLinksById = (id, data) => async dispatch => {
	// can fetch from firebase or use preloaded data if id===0...
	try {
		let links = []
		let quickLink
		if (id === 0 && data) {
			// use preloaded data if id === 0
			links = transformLinksForApp(data)
			quickLink = data.quickLink
		} else {
			links = await fetchLinksFirebase(id, true)
			quickLink = await fetchDataFirebase(id, 'quickLink', true)
		}

		if (links) {
			dispatch(setLinkMultiple(links))
		}
		if (quickLink) {
			dispatch(setQuickLink())
		} else {
			dispatch(unsetQuickLink())
		}
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
		await updateDataFirebase(user, type, link)
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
		await updateDataFirebase(user, type, '')
		dispatch(unsetLink(type))
	} catch (err) {
		throw err
	}
}

/* QUICK LINKS */
const setQuickLink = () => ({
	type: LinksActionTypes.SET_QUICK_LINK,
})

const unsetQuickLink = () => ({
	type: LinksActionTypes.UNSET_QUICK_LINK,
})

const setQuickLinkAsync = () => async dispatch => {
	// use to set or unset or modify any links.
	const user = await getCurrentUser()
	try {
		await updateDataFirebase(user, 'quickLink', true)
		dispatch(setQuickLink())
	} catch (err) {
		throw err
	}
}

const unsetQuickLinkAsync = () => async dispatch => {
	// use to set or unset or modify any links.
	const user = await getCurrentUser()
	try {
		await updateDataFirebase(user, 'quickLink', false)
		dispatch(unsetQuickLink())
	} catch (err) {
		throw err
	}
}

// EXPORT

export {
	setLink,
	unsetLink,
	updateLink,
	removeLink,
	fetchLinks,
	fetchDefaultLinks,
	updateMultipleLinks,
	setQuickLinkAsync,
	unsetQuickLinkAsync,
	fetchLinksById,
}
