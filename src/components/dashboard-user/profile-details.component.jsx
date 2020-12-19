import React, { Component, useState, useEffect, createRef } from 'react'
import DashboardModal from '../../components/dashboard-modal/dashboard-modal.component'

import './profile-details.styles.scss'
import { getId } from '../../firebase/utils/firestore.utils'

import { toast } from 'react-toastify'

const createProflieUrl = id =>
	window.location.origin + process.env.REACT_APP_PROFILE_URL + id

const QrView = ({ id, name, profilePage }) => {
	const imageContainerRef = createRef()
	const qrDownloadBtn = createRef()

	const downloadQr = () => {
		const typeNumber = 4
		const errorCorrectionLevel = 'L'
		const qr = window.qrcode(typeNumber, errorCorrectionLevel)
		qr.addData(createProflieUrl(id))
		qr.make()
		let dataURL = qr.createDataURL(10)
		dataURL = dataURL.replace('gif', 'png')
		qrDownloadBtn.current.href = dataURL
		qrDownloadBtn.current.click()
	}
	useEffect(() => {
		const typeNumber = 4
		const errorCorrectionLevel = 'L'
		const qr = window.qrcode(typeNumber, errorCorrectionLevel)
		qr.addData(createProflieUrl(id))
		qr.make()
		imageContainerRef.current.innerHTML = qr.createSvgTag()
	}, [])
	return (
		<div>
			<h4 className='text-center'>
				{profilePage
					? 'Scan this profile link'
					: 'Share your profile link'}
			</h4>

			<hr />
			<div className='qr-container' ref={imageContainerRef}></div>
			<p className='text-center'>
				Scan this QR code using any QR scanner app/camera.
			</p>
			<div className='text-center' onClick={downloadQr}>
				<button className='btn btn-dark'>Download QR</button>
			</div>
			<a
				ref={qrDownloadBtn}
				href='#'
				className='d-none'
				download={`${name} QR code`}
			/>
		</div>
	)
}

const LinkView = ({ id }) => {
	const linkRef = createRef()
	const link = createProflieUrl(id)
	const copyLink = async () => {
		await navigator.clipboard.writeText(link)
		toast.success('Link copied to clipboard.', {
			autoClose: 2000,
		})
	}
	return (
		<div>
			<h4>Your Profile link</h4>
			<hr />
			<p
				className='profile-link-container'
				ref={linkRef}
				onClick={copyLink}>
				{link}
			</p>
			<div className='row pb-3'>
				<div className='col-6 col-md-4 offset-md-2'>
					<a
						href={link}
						className='btn btn-dark btn-block h-100'
						target='_blank'>
						Open in new tab
					</a>
				</div>
				<div className='col-6 col-md-4'>
					<button
						className='btn btn-dark btn-block h-100'
						onClick={copyLink}>
						Copy Link
					</button>
				</div>
			</div>
		</div>
	)
}

class ProfileDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			displayQr: false,
			id: '',
		}
	}
	async componentDidMount() {
		const { profilePage } = this.props
		if (!profilePage) {
			this.setState({ id: await getId() })
		}
	}
	showModal = show => {
		console.log(show)
		this.setState({ show })
	}
	viewQr = () => {
		this.showModal(true)
		this.setState({ displayQr: true })
	}
	viewLink = () => {
		this.showModal(true)
		this.setState({ displayQr: false })
	}
	render() {
		const { name, about, imageUrl, email, profilePage } = this.props
		const { id, show, displayQr } = this.state
		return (
			<div className='row'>
				<div className='col-sm-4 display-image-container'>
					<img
						className='display-image'
						src={imageUrl ? imageUrl : '/user.png'}
						alt='user display'
						onError={e => {
							e.target.onerror = null
							e.target.src = '/user.png'
						}}
					/>
				</div>
				<div className='col-sm-6'>
					<h3 className='text-capitalize mt-1 profile-name'>
						{name}
					</h3>
					{!profilePage && <p className='profile-email'>{email}</p>}
					<p className='profile-about'>{about}</p>
				</div>
				{profilePage ? (
					<div className='col-sm-2 qr-and-link-contianer'>
						<img
							className='qr-icon'
							src={'/icons/qrcode.png'}
							alt='QR icon'
							onClick={this.viewQr}
						/>
					</div>
				) : (
					<div className='col-sm-2 qr-and-link-contianer'>
						<img
							className='qr-icon'
							src={'/icons/qrcode.png'}
							alt='QR icon'
							onClick={this.viewQr}
						/>
						<i
							className='fas fa-link link-icon'
							onClick={this.viewLink}
						/>
					</div>
				)}
				<DashboardModal show={show} showModal={this.showModal} custom>
					{displayQr ? (
						<QrView id={id} name={name} profilePage />
					) : (
						<LinkView id={id} />
					)}
				</DashboardModal>
			</div>
		)
	}
}

export default ProfileDetails
