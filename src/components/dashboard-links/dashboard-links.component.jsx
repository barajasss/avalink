import React, { Component, createRef } from 'react'

import DashboardLinkItem from '../dashboard-link-item/dashboard-link-item.component'
import DashboardModal from '../dashboard-modal/dashboard-modal.component'
import vCardsJS from 'vcards-js'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {
	fetchLinks,
	setQuickLinkAsync,
	unsetQuickLinkAsync,
	updateMultipleLinks,
} from '../../redux/links/links.actions'

import { ReactSortable } from 'react-sortablejs'

import './dashboard-links.styles.scss'

class DashboardLinks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			linkEditorType: '',
			displayLinkEditor: false,
			removeMode: false,
			sortedLinks: [],
		}
		this.vCardDownloadBtn = createRef()
		this.imgRef = createRef()
		this.saveButton = createRef()
	}

	async componentDidMount() {
		const { fetchLinks } = this.props
		try {
			const links = await fetchLinks()
			this.setState({ sortedLinks: links.filter(link => link.data) })
		} catch (err) {
			console.log(err)
		}
	}

	showModal = (show, opts) => {
		if (opts) {
			this.setState({
				showModal: show,
				linkEditorType: opts.linkEditorType || '',
				displayLinkEditor: opts.displayLinkEditor || false,
			})
		} else {
			this.setState({
				showModal: show,
			})
		}
	}
	toggleQuickLink = async () => {
		const { quickLink, setQuickLinkAsync, unsetQuickLinkAsync } = this.props
		try {
			if (quickLink) {
				await unsetQuickLinkAsync()
			} else {
				await setQuickLinkAsync()
			}
		} catch (err) {
			console.log(err)
		}
	}
	saveOrder = async orderedLinks => {
		const { links, updateMultipleLinks } = this.props
		// update the position orders of the links
		orderedLinks.map((item, index) => {
			item.order = index + 1
			return item
		})
		const processedLinks = links.map((item, index) => {
			// update item if any ordered Link is found
			const orderedItem = orderedLinks.find(
				orderedLink => orderedLink.name === item.name
			)
			if (orderedItem) {
				item.order = orderedItem.order
			}
			return item
		})
		try {
			await updateMultipleLinks(processedLinks)
		} catch (err) {
			console.log(err)
		}
	}
	generateVCard = async () => {
		const { user, match } = this.props
		const { name, imageUrl, about, email } = user

		const id = match.params.id
		const url =
			window.location.origin + process.env.REACT_APP_PROFILE_URL + id

		const vCard = vCardsJS()
		vCard.formattedName = name
		// vCard.photo.attachFromUrl(imageUrl, type.toUpperCase())
		vCard.url = url
		vCard.email = email
		vCard.source = url
		vCard.note = about

		const blob = new Blob([vCard.getFormattedString()], {
			type: 'text/vcard',
		})
		this.vCardDownloadBtn.current.href = URL.createObjectURL(blob)
		this.vCardDownloadBtn.current.click()
	}
	render() {
		const {
			removeMode,
			showModal,
			linkEditorType,
			displayLinkEditor,
			sortedLinks,
		} = this.state
		const {
			links,
			quickLink,
			profilePage,
			user: { name, imageUrl },
		} = this.props
		return (
			<div className='dashboard-links'>
				{/* CONTROLS */}
				{!profilePage && (
					<div className='mx-2 mx-sm-0 px-0 row mb-4'>
						<div className='col-6 col-md-4 offset-md-2'>
							<button
								ref={this.saveButton}
								className={`dashboard-button btn ${
									removeMode ? 'btn-dark' : 'btn-outline-dark'
								} mt-2 btn-block`}
								onClick={async () => {
									if (removeMode) {
										await this.saveOrder(sortedLinks)
										this.saveButton.current.textContent =
											'Saving...'
									}
									// restore state
									this.setState(state => ({
										removeMode: !state.removeMode,
									}))
								}}>
								{removeMode ? 'Save' : 'Shift'}
							</button>
						</div>
						<div className='col-6 col-md-4'>
							<button
								className='dashboard-button btn btn-outline-dark mt-2 btn-block'
								onClick={this.toggleQuickLink}>
								{quickLink ? (
									<span>
										<i className='fas fa-check-square mr-2' />
										Quick Link On
									</span>
								) : (
									'Quick Link Off'
								)}
							</button>
						</div>
					</div>
				)}

				{/* LINKS */}
				<div className={`${removeMode ? '' : 'link-grid'}`}>
					{!removeMode && (
						<>
							<img
								ref={this.imgRef}
								src={imageUrl}
								className='d-none'
							/>
							<a
								className='d-none'
								ref={this.vCardDownloadBtn}
								href='#'
								download={`${name}.vcf`}
							/>
							<DashboardLinkItem
								onClick={this.generateVCard}
								name={'contact'}
							/>
						</>
					)}
					{removeMode ? (
						<ReactSortable
							list={sortedLinks}
							setList={newState =>
								this.setState({ sortedLinks: newState })
							}
							className='link-grid'
							animation={200}>
							{sortedLinks.map(link => (
								<DashboardLinkItem
									key={link.name}
									showModal={this.showModal}
									linkBtn
									name={link.name}
									removeMode={removeMode}
									profilePage={profilePage}
									quickLink={quickLink}
								/>
							))}
						</ReactSortable>
					) : (
						links.map(
							link =>
								link.data && (
									<DashboardLinkItem
										key={link.name}
										showModal={this.showModal}
										linkBtn
										name={link.name}
										removeMode={removeMode}
										profilePage={profilePage}
										quickLink={quickLink}
									/>
								)
						)
					)}
					{!profilePage && !removeMode && (
						<DashboardLinkItem
							modalBtn
							showModal={this.showModal}
							name={'new link'}
						/>
					)}
					<DashboardModal
						show={showModal}
						showModal={this.showModal}
						displayLinkEditor={displayLinkEditor}
						linkEditorType={linkEditorType}
						profilePage={profilePage}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	user: state.user,
	links: state.links.userLinks,
	quickLink: state.links.quickLink,
})

const mapDispatchToProps = dispatch => ({
	fetchLinks: () => dispatch(fetchLinks()),
	setQuickLinkAsync: () => dispatch(setQuickLinkAsync()),
	unsetQuickLinkAsync: () => dispatch(unsetQuickLinkAsync()),
	updateMultipleLinks: links => dispatch(updateMultipleLinks(links)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(DashboardLinks))
