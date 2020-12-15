import React, { Component } from 'react'

import DashboardLinkItem from '../dashboard-link-item/dashboard-link-item.component'
import DashboardModal from '../dashboard-modal/dashboard-modal.component'

import './dashboard-links.styles.scss'

export default class DashboardLinks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
		}
	}
	showModal = show => {
		this.setState({ showModal: show })
	}
	render() {
		const { showModal } = this.state
		return (
			<div className='dashboard-links link-grid'>
				<DashboardLinkItem>Contact</DashboardLinkItem>
				<DashboardLinkItem modalBtn showModal={this.showModal}>
					<i className='fas fa-plus fa-3x'></i>
				</DashboardLinkItem>
				<DashboardModal show={showModal} showModal={this.showModal} />
			</div>
		)
	}
}
