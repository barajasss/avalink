import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './dashboard-link-item.styles.scss'

class DashboardLinkItem extends Component {
	render() {
		const { modalBtn, showModal, history, onClick } = this.props
		return (
			<div
				className='dashboard-link-item'
				data-toggle='modal'
				data-target={`${modalBtn ? '#myModal' : '#addLinkModal'}`}
				onClick={() => {
					if (showModal) {
						console.log('modal')
						showModal(true)
						// history.push('/dashboard/links')
					}
					if (onClick) {
						onClick()
					}
				}}>
				{this.props.children}
			</div>
		)
	}
}
export default withRouter(DashboardLinkItem)
