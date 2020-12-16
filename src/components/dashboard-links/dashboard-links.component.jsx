import React, { Component } from 'react'

import DashboardLinkItem from '../dashboard-link-item/dashboard-link-item.component'
import DashboardModal from '../dashboard-modal/dashboard-modal.component'

import { connect } from 'react-redux'
import { fetchLinks } from '../../redux/links/links.actions'

import './dashboard-links.styles.scss'

class DashboardLinks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
		}
	}

	async componentDidMount() {
		const { fetchLinks } = this.props
		try {
			await fetchLinks()
		} catch (err) {
			console.log(err)
		}
	}

	showModal = show => {
		this.setState({ showModal: show })
	}
	render() {
		const { showModal } = this.state
		const { links } = this.props
		return (
			<div className='dashboard-links link-grid'>
				<DashboardLinkItem>Contact</DashboardLinkItem>
				{links.map(link => (
					<DashboardLinkItem key={link.type}>
						{link.type}
					</DashboardLinkItem>
				))}
				<DashboardLinkItem modalBtn showModal={this.showModal}>
					<i className='fas fa-plus fa-3x'></i>
				</DashboardLinkItem>
				<DashboardModal show={showModal} showModal={this.showModal} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	links: state.links,
})

const mapDispatchToProps = dispatch => ({
	fetchLinks: () => dispatch(fetchLinks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLinks)
