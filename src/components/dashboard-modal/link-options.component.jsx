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
							userLink =>
								userLink.data && userLink.name === item.name
						) !== -1
					if (!userAddedAlready) {
						return (
							<DashboardLinkItem
								key={item.name}
								onClick={() => {
									openLinkEditor(item.name)
								}}
								name={item.name}
							/>
						)
					} else {
						return (
							<DashboardLinkItem
								key={item.name}
								onClick={() => {
									openLinkEditor(item.name)
								}}
								name={item.name}
								checked
							/>
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
