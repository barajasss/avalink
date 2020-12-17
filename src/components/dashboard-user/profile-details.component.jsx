import React, { Component } from 'react'
import DashboardModal from '../../components/dashboard-modal/dashboard-modal.component'

const QrView = () => (
	<div>
		<h4>Scan your QR Code</h4>
	</div>
)

const LinkView = () => (
	<div>
		<h4>Copy your profile link</h4>
	</div>
)

class ProfileDetails extends Component {
	constructor(props) {
		super(props)
		this.state = {
			show: false,
			displayQr: false,
		}
	}
	showModal = show => {
		console.log(show)
		this.setState({ show })
	}
	viewQr = () => {
		console.log('view qr')
		this.showModal(true)
		this.setState({ displayQr: true })
	}
	viewLink = () => {
		console.log('view link')
		this.showModal(true)
		this.setState({ displayQr: false })
	}
	render() {
		const { name, about } = this.props
		const { show, displayQr } = this.state
		return (
			<div className='row'>
				<div className='col-sm-4 display-image'>
					<img
						src={process.env.PUBLIC_URL + 'user.png'}
						alt='user display'
					/>
				</div>
				<div className='col-sm-6'>
					<h3 className='text-capitalize mt-1 profile-name'>
						{name}
					</h3>
					<p className='profile-about'>{about}</p>
				</div>
				<div className='col-sm-2 qr-and-link-contianer'>
					<img
						className='qr-icon'
						src={process.env.PUBLIC_URL + 'icons/qrcode.png'}
						alt='QR icon'
						onClick={this.viewQr}
					/>
					<i
						className='fas fa-link link-icon'
						onClick={this.viewLink}
					/>
				</div>
				<DashboardModal show={show} showModal={this.showModal} custom>
					{displayQr ? <QrView /> : <LinkView />}
				</DashboardModal>
			</div>
		)
	}
}

export default ProfileDetails
