import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { updateLink } from '../../redux/links/links.actions'

import './dashboard-link-item.styles.scss'

class DashboardLinkItem extends Component {
	removeHandler = async () => {
		const { name, removeFunc } = this.props
		try {
			// await removeLink(name)
			removeFunc(name)
		} catch (err) {
			console.log(err)
		}
	}
	handleClick = async () => {
		const {
			name,
			removeMode,
			generateVCard,
			updateLink,
			showModal,
			onClick,
			modalBtn,
			linkBtn,
			profilePage,
			quickLink,
			firstLink,
		} = this.props

		if (removeMode || (quickLink && firstLink && firstLink.name !== name))
			return

		if (name === 'contact') {
			if (generateVCard) {
				generateVCard()
			}
			await updateLink(name, 'card')
			return
		}

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
			getLinkMeta,
			hide,
			generateVCard,
			updateLink,
			index,
			firstLink,
		} = this.props
		const linkMeta = getLinkMeta(name)
		if (profilePage) {
			return (
				<div
					className='dashboard-link-item'
					onClick={async () => {
						if (onClick) {
							onClick()
						}
						if (name === 'contact' && !profilePage) {
							if (generateVCard) {
								generateVCard()
							}
						}
					}}>
					{!noIcon && name !== 'contact' && (
						<a
							href={linkMeta.linkPrefix + getUserLink(name).data}
							target='_blank'>
							<img
								src={`/icons/${name}.png`}
								className='icon-img img-fluid'
							/>
						</a>
					)}
					{name === 'contact' && (
						<a href='#' onClick={generateVCard}>
							<img
								src={`/icons/${name}.png`}
								className='icon-img img-fluid'
							/>
						</a>
					)}
					<p className='link-title text-center m-0 pt-1'>
						{(linkMeta && linkMeta.displayName) || name}
					</p>
				</div>
			)
		}

		return (
			<div
				className={`dashboard-link-item ${
					removeMode ||
					(quickLink && firstLink && firstLink.name !== name)
						? 'remove-mode'
						: ''
				}`}
				data-toggle='modal'
				data-target={`${modalBtn ? '#myModal' : '#addLinkModal'}`}
				onClick={this.handleClick}>
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
				<p className='link-title text-center m-0 pt-1'>
					{(linkMeta && linkMeta.displayName) || name}
				</p>
			</div>
		)
	}
}
const mapStateToProps = state => ({
	getUserLink: name => state.links.userLinks.find(link => link.name === name),
	getLinkMeta: name =>
		state.links.defaultLinks.find(link => link.name === name),
	firstLink: state.links.userLinks.filter(link => link.data)[0],
})
const mapDispatchToProps = dispatch => ({
	updateLink: (name, link) => dispatch(updateLink(name, link)),
})
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(DashboardLinkItem))
