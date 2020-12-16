import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './dashboard-link-item.styles.scss'

class DashboardLinkItem extends Component {
	render() {
		const {
			disabled,
			modalBtn,
			linkBtn,
			showModal,
			onClick,
			type,
		} = this.props
		return (
			<div
				className={`dashboard-link-item ${disabled ? 'disabled' : ''}`}
				data-toggle='modal'
				data-target={`${modalBtn ? '#myModal' : '#addLinkModal'}`}
				onClick={() => {
					if (disabled) return
					if (modalBtn && showModal) {
						showModal(true, {
							displayLinkEditor: false,
							linkEditorType: '',
						})
					} else if (linkBtn) {
						showModal(true, {
							displayLinkEditor: true,
							linkEditorType: type,
						})
					}
					// run any custom onclick prop
					if (onClick) {
						onClick()
					}
				}}>
				{this.props.children}
				{type}
			</div>
		)
	}
}
export default withRouter(DashboardLinkItem)
