import LinksActionTypes from './links.types'

const initialLinksState = {
	userLinks: [],
	quickLink: false,
	totalProfileLinks: 0,
	totalProfileLinksLoaded: false,
	defaultLinks: [],
	defaultLinksLoaded: false,
	userLinksLoaded: false,
}

const linksReducer = (state = initialLinksState, action) => {
	switch (action.type) {
		case LinksActionTypes.SET_TOTAL_PROFILE_LINKS: {
			return {
				...state,
				totalProfileLinks: action.payload,
				totalProfileLinksLoaded: true,
			}
		}
		case LinksActionTypes.SET_QUICK_LINK: {
			return { ...state, quickLink: true }
		}
		case LinksActionTypes.UNSET_QUICK_LINK: {
			return { ...state, quickLink: false }
		}
		case LinksActionTypes.SET_DEFAULT_LINKS: {
			const defaultLinks = action.payload
			// sort alphabetically
			// defaultLinks.sort(function (a, b) {
			// 	var textA = a.type.toUpperCase()
			// 	var textB = b.type.toUpperCase()
			// 	return textA < textB ? -1 : textA > textB ? 1 : 0
			// })
			return {
				...state,
				defaultLinks,
				defaultLinksLoaded: true,
			}
		}
		// case LinksActionTypes.SET_LINK: {
		// 	const { data, link } = action.payload
		// 	const pos = state.userLinks.findIndex(item => item.data === data)
		// 	let updatedLinkState = [...state.userLinks]
		// 	if (pos !== -1) {
		// 		updatedLinkState[pos] = { data, link }
		// 	} else {
		// 		// insert new data
		// 		updatedLinkState = [...updatedLinkState, { data, link }]
		// 	}
		// 	return { ...state, userLinks: updatedLinkState }
		// }
		case LinksActionTypes.SET_LINK_MULTIPLE: {
			let links = action.payload
			// sort alphabetically
			// links.sort(function (a, b) {
			// 	var textA = a.type.toUpperCase()
			// 	var textB = b.type.toUpperCase()
			// 	return textA < textB ? -1 : textA > textB ? 1 : 0
			// })
			return { ...state, userLinks: [...links], userLinksLoaded: true }
		}
		// case LinksActionTypes.UNSET_LINK: {
		// 	const data = action.payload
		// 	const updatedLinkState = state.userLinks.filter(
		// 		item => item.data !== data
		// 	)
		// 	return { ...state, userLinks: updatedLinkState }
		// }
		default:
			return state
	}
}

export default linksReducer
