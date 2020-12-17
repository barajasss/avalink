import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { removeLink } from '../../redux/links/links.actions'

import './dashboard-link-item.styles.scss'

class DashboardLinkItem extends Component {
	removeHandler = async () => {
		const { type, removeLink } = this.props
		try {
			await removeLink(type)
		} catch (err) {
			console.log(err)
		}
	}
	render() {
		const {
			checked,
			modalBtn,
			linkBtn,
			showModal,
			onClick,
			noIcon,
			type,
			removeMode,
			profilePage,
			quickLink,
			getLinkFromType,
		} = this.props

		if (profilePage && quickLink) {
			return (
				<div
					className='dashboard-link-item'
					onClick={() => {
						if (onClick) {
							onClick()
						}
					}}>
					{!noIcon && (
						<a href={getLinkFromType(type)} target='_blank'>
							<img
								src={`/icons/${type}.png`}
								className='icon-img img-fluid'
							/>
						</a>
					)}
					<p className='link-title text-center m-0 pt-1'>{type}</p>
				</div>
			)
		}
		return (
			<div
				className={`dashboard-link-item ${
					removeMode ? 'remove-mode' : ''
				}`}
				data-toggle='modal'
				data-target={`${modalBtn ? '#myModal' : '#addLinkModal'}`}
				onClick={() => {
					if (removeMode) return
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
						src={`/icons/${type}.png`}
						className='icon-img img-fluid'
					/>
				)}
				{removeMode && (
					<i
						className='fas fa-times remove-icon'
						onClick={this.removeHandler}
					/>
				)}
				{checked && <i className='fas fa-check check-icon' />}
				<p className='link-title text-center m-0 pt-1'>{type}</p>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	getLinkFromType: type => {
		const found = state.links.userLinks.find(link => link.type === type)
		if (found) {
			return found.link
		}
	},
})
const mapDispatchToProps = dispatch => ({
	removeLink: type => dispatch(removeLink(type)),
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(DashboardLinkItem))
