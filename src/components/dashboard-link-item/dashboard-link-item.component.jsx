import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './dashboard-link-item.styles.scss'

class DashboardLinkItem extends Component {
	render() {
		const {
			checked,
			modalBtn,
			linkBtn,
			showModal,
			onClick,
			noIcon,
			type,
		} = this.props
		return (
			<div
				className={`dashboard-link-item ${checked ? 'checked' : ''}`}
				data-toggle='modal'
				data-target={`${modalBtn ? '#myModal' : '#addLinkModal'}`}
				onClick={() => {
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
				{!noIcon && (
					<img
						src={`${process.env.PUBLIC_URL}icons/${type}.png`}
						className='icon-img img-fluid'
					/>
				)}
				{checked && <i className='fas fa-check check-icon' />}
				<p className='link-title text-center m-0 pt-1'>{type}</p>
			</div>
		)
	}
}
export default withRouter(DashboardLinkItem)
