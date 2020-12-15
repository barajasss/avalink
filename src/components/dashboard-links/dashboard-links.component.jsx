import React, { Component } from 'react'

import DashboardLinkItem from '../dashboard-link-item/dashboard-link-item.component'
import './dashboard-links.styles.scss'

export default class DashboardLinks extends Component {
	render() {
		return (
			<div className='dashboard-links link-grid'>
				<DashboardLinkItem>Contact</DashboardLinkItem>
				<DashboardLinkItem modalBtn>
					<i className='fas fa-plus fa-3x'></i>
				</DashboardLinkItem>

				<div className='modal fade' id='myModal'>
					<div
						className='modal-dialog'
						role='document'
						style={{ zIndex: 1000 }}>
						<div className='modal-content'>
							<div className='modal-body'>
								<h4>Add a social link to your profile</h4>
								<hr />
								<div className='link-grid'>
									<DashboardLinkItem>
										Contact
									</DashboardLinkItem>
									<DashboardLinkItem>
										Contact
									</DashboardLinkItem>
									<DashboardLinkItem>
										Contact
									</DashboardLinkItem>
									<DashboardLinkItem>
										Contact
									</DashboardLinkItem>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
