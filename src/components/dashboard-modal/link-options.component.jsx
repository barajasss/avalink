import DashboardLinkItem from '../dashboard-link-item/dashboard-link-item.component'
import { useState, useEffect } from 'react'

import { fetchDefaultLinks } from '../../redux/links/links.actions'
import { connect } from 'react-redux'

const LinkOptions = ({
	openLinkEditor,
	fetchDefaultLinks,
	defaultLinksLoaded,
	defaultLinks,
	userLinks,
}) => {
	const [fetching, setFetching] = useState(false)

	useEffect(async () => {
		if (!defaultLinksLoaded) {
			setFetching(true)
			try {
				await fetchDefaultLinks()
			} catch (err) {
				console.log(err)
			}
			setFetching(false)
		}
	}, [])

	return (
		<div>
			<h4>Add a social link to your profile</h4>
			<hr />
			<div className='link-grid'>
				{fetching && <h5>Loading...</h5>}
				{defaultLinks.map(item => {
					const userAddedAlready =
						userLinks.findIndex(
							userLink => userLink.type === item.type
						) !== -1
					if (!userAddedAlready) {
						return (
							<DashboardLinkItem
								key={item.type}
								onClick={() => {
									openLinkEditor(item.type)
								}}>
								{item.type}
							</DashboardLinkItem>
						)
					} else {
						return (
							<DashboardLinkItem key={item.type} disabled>
								{item.type}
							</DashboardLinkItem>
						)
					}
				})}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	userLinks: state.links.userLinks,
	defaultLinks: state.links.defaultLinks,
	defaultLinksLoaded: state.links.defaultLinksLoaded,
})

const mapDispatchToProps = dispatch => ({
	fetchDefaultLinks: () => dispatch(fetchDefaultLinks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LinkOptions)
