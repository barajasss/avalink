import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './dashboard-link-item.styles.scss'

class DashboardLinkItem extends Component {
	render() {
		const { modalBtn, showModal, onClick } = this.props
		return (
			<div
				className='dashboard-link-item'
				data-toggle='modal'
				data-target={`${modalBtn ? '#myModal' : '#addLinkModal'}`}
				onClick={() => {
					if (showModal) {
						console.log('modal')
						showModal(true)
					}
					if (onClick) {
						// run the custom onclick prop
						onClick()
					}
				}}>
				{this.props.children}
			</div>
		)
	}
}
export default withRouter(DashboardLinkItem)
