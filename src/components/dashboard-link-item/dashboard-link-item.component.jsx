import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { removeLink } from '../../redux/links/links.actions'

import './dashboard-link-item.styles.scss'

class DashboardLinkItem extends Component {
	removeHandler = async () => {
		const { name, removeLink } = this.props
		try {
			await removeLink(name)
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
			name,
			removeMode,
			profilePage,
			quickLink,
			getUserLink,
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
						<a href={getUserLink(name).data} target='_blank'>
							<img
								src={`/icons/${name}.png`}
								className='icon-img img-fluid'
							/>
						</a>
					)}
					<p className='link-title text-center m-0 pt-1'>{name}</p>
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
							linkEditorType: name,
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
						src={`/icons/${name}.png`}
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
				<p className='link-title text-center m-0 pt-1'>{name}</p>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	getUserLink: name => state.links.userLinks.find(link => link.name === name),
})
const mapDispatchToProps = dispatch => ({
	removeLink: name => dispatch(removeLink(name)),
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(DashboardLinkItem))
