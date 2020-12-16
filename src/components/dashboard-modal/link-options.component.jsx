import DashboardLinkItem from '../dashboard-link-item/dashboard-link-item.component'
import { useEffect } from 'react'

import { fetchDefaultLinks } from '../../redux/links/links.actions'
import { connect } from 'react-redux'

const LinkOptions = ({
	openLinkEditor,
	fetchDefaultLinks,
	defaultLinksLoaded,
	defaultLinks,
}) => {
	useEffect(async () => {
		if (!defaultLinksLoaded) {
			try {
				await fetchDefaultLinks()
			} catch (err) {
				console.log(err)
			}
		}
	}, [])

	return (
		<div>
			<h4>Add a social link to your profile</h4>
			<hr />
			<div className='link-grid'>
				{defaultLinks.map(item => (
					<DashboardLinkItem
						key={item.type}
						onClick={() => {
							openLinkEditor(item.type)
						}}>
						{item.type}
					</DashboardLinkItem>
				))}
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	defaultLinks: state.links.defaultLinks,
	defaultLinksLoaded: state.links.defaultLinksLoaded,
})

const mapDispatchToProps = dispatch => ({
	fetchDefaultLinks: () => dispatch(fetchDefaultLinks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(LinkOptions)
