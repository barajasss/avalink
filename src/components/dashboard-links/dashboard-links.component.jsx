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
} from '../../redux/links/links.actions'

import './dashboard-links.styles.scss'

class DashboardLinks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			linkEditorType: '',
			displayLinkEditor: false,
			removeMode: false,
		}
		this.vCardDownloadBtn = createRef()
		this.imgRef = createRef()
	}

	async componentDidMount() {
		const { fetchLinks } = this.props
		try {
			await fetchLinks()
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
	generateVCard = async () => {
		const { user, match } = this.props
		const { name, imageUrl, about, email } = user

		const id = match.params.id
		const cleanUrl = imageUrl.slice(0, imageUrl.indexOf('?'))
		const type = cleanUrl.slice(cleanUrl.lastIndexOf('.') + 1)
		const url =
			window.location.origin + process.env.REACT_APP_PROFILE_URL + id

		// const canvas = document.createElement('canvas')
		// canvas.height = this.imgRef.current.naturalHeight
		// canvas.width = this.imgRef.current.naturalWidth
		// this.imgRef.current.crossOrigin = 'Anonymous'

		// const ctx = canvas.getContext('2d')
		// ctx.drawImage(this.imgRef.current, 0, 0)
		// const dataUrl = canvas.toDataURL()
		// console.log(dataUrl)

		const vCard = vCardsJS()
		vCard.formattedName = name
		// vCard.photo.attachFromUrl(imageUrl, type.toUpperCase())
		vCard.url = url
		vCard.email = email
		vCard.source = url
		vCard.note = about

		console.log(
			vCard.getFormattedString()
			// .replace('END:VCARD', 'EMAIL:' + email + '\nEND:VCARD')
		)

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
								className={`btn ${
									removeMode ? 'btn-dark' : 'btn-outline-dark'
								} mt-2 btn-block`}
								onClick={() =>
									this.setState(state => ({
										removeMode: !state.removeMode,
									}))
								}>
								{removeMode ? 'Done' : 'Edit links'}
							</button>
						</div>
						<div className='col-6 col-md-4'>
							<button
								className='btn btn-outline-dark mt-2 btn-block'
								onClick={this.toggleQuickLink}>
								{quickLink ? (
									<span>
										<i className='fas fa-check-square mr-2' />
										Quick Link Enabled
									</span>
								) : (
									'Enable Quick Link'
								)}
							</button>
						</div>
					</div>
				)}
				{/* LINKS */}
				<div className='link-grid'>
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
								type={'contact'}
							/>
						</>
					)}
					{links.map(link => (
						<DashboardLinkItem
							key={link.type}
							showModal={this.showModal}
							linkBtn
							type={link.type}
							removeMode={removeMode}
							profilePage={profilePage}
							quickLink={quickLink}
						/>
					))}
					{!profilePage && !removeMode && (
						<DashboardLinkItem
							modalBtn
							showModal={this.showModal}
							type={'new link'}
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
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(withRouter(DashboardLinks))
