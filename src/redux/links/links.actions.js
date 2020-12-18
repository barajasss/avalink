import LinksActionTypes from './links.types'
import store from '../store'

import { getCurrentUser } from '../../firebase/utils/auth.utils'
import {
	updateData as updateDataFirebase,
	fetchLinks as fetchLinksFirebase,
	fetchDefaultLinks as fetchDefaultLinksFirebase,
	updateBulkData as updateBulkDataFirebase,
	fetchData as fetchDataFirebase,
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
		const quickLink = await fetchDataFirebase('details', user, 'quickLink')
		const totalProfileLinks = await fetchDataFirebase(
			'details',
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
			links = data.links
			quickLink = data.details.quickLink
		} else {
			links = await fetchLinksFirebase(id, true)
			quickLink = await fetchDataFirebase(
				'details',
				id,
				'quickLink',
				true
			)
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
		const links = fetchDefaultLinksFirebase()
		dispatch(setDefaultLinks(links))
		return links
	} catch (err) {
		throw err
	}
}

const updateLink = (name, data) => async dispatch => {
	// use to set or unset or modify any links.
	const user = await getCurrentUser()
	const userLinks = store.getState().links.userLinks
	const updatedLinks = userLinks.map(link => {
		if (link.name === name) {
			link.data = data
		}
		return link
	})
	try {
		await updateDataFirebase(user, 'links', updatedLinks)
		dispatch(setLinkMultiple(updatedLinks))
	} catch (err) {
		throw err
	}
}

const updateMultipleLinks = links => async dispatch => {
	try {
		// filter links from empty values
		links = links.filter(item => item.data !== '')

		// map and transform data to a proper format before persisting to firebase
		// links.forEach(link => {
		// 	transformedLinks = {
		// 		...transformedLinks,
		// 		[link.name]: link.data,
		// 	}
		// })

		await updateBulkDataFirebase(await getCurrentUser(), { links })
		dispatch(setLinkMultiple(links))
	} catch (err) {
		throw err
	}
}

const removeLink = name => async dispatch => {
	// use to set or unset or modify any links.
	const user = await getCurrentUser()
	const userLinks = store.getState().links.userLinks
	const updatedLinks = userLinks.map(link => {
		if (link.name === name) {
			link.data = ''
		}
		return link
	})
	try {
		await updateDataFirebase(user, 'links', updatedLinks)
		dispatch(setLinkMultiple(updatedLinks))
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
		await updateDataFirebase(user, 'details.quickLink', true)
		dispatch(setQuickLink())
	} catch (err) {
		throw err
	}
}

const unsetQuickLinkAsync = () => async dispatch => {
	// use to set or unset or modify any links.
	const user = await getCurrentUser()
	try {
		await updateDataFirebase(user, 'details.quickLink', false)
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
