import LinksActionTypes from './links.types'

const initialLinksState = []

const linksReducer = (state = initialLinksState, action) => {
	switch (action.type) {
		case LinksActionTypes.SET_LINK: {
			const { type, link } = action.payload
			const pos = state.findIndex(item => item.type === type)
			let updatedLinkState = [...state]
			if (pos && pos !== -1) {
				updatedLinkState[pos] = { type, link }
			} else {
				// insert new data
				updatedLinkState = [...updatedLinkState, { type, link }]
			}
			return updatedLinkState
		}
		case LinksActionTypes.SET_LINK_MULTIPLE: {
			const links = action.payload
			return [...links]
		}
		case LinksActionTypes.UNSET_LINK: {
			const type = action.payload
			const pos = state.findIndex(item => item.type === type)
			let updatedLinkState = [...state]
			if (pos && pos !== -1) {
				updatedLinkState[pos] = { type, link: '' }
			}
			return updatedLinkState
		}
		default:
			return state
	}
}

export default linksReducer
