import React, { Component } from 'react'

import { connect } from 'react-redux'
import './dashboard-user.styles.scss'

const ProfileDetails = ({ name, about }) => (
	<div className='row'>
		<div className='col-sm-4 display-image'>
			<img src={process.env.PUBLIC_URL + 'user.png'} alt='user display' />
		</div>
		<div className='col-sm-6'>
			<h3 className='text-capitalize mt-1 profile-name'>{name}</h3>
			<p className='profile-about'>{about}</p>
		</div>
		<div className='col-sm-2 qr-and-link-contianer'>
			<img
				className='qr-icon'
				src={process.env.PUBLIC_URL + 'icons/qrcode.png'}
				alt='QR icon'
			/>
			<i className='fas fa-link link-icon' />
		</div>
	</div>
)

const EditProfile = () => (
	<div className='px-3'>
		<div className='row'>
			<div className='display-image col-md-4'>
				<img src={process.env.PUBLIC_URL + 'user.png'} />
			</div>
			<div className='col-md-8 edit-profile-input-container'>
				<form>
					<div className='form-group'>
						<label>Profile Name</label>
						<input type='text' className='form-control' />
					</div>
					<div className='form-group'>
						<label>About</label>
						<input type='text' className='form-control' />
					</div>
				</form>
			</div>
		</div>
	</div>
)

class DashboardUser extends Component {
	render() {
		const { name, about, editProfile } = this.props
		return (
			<div className='dashboard-user'>
				{editProfile ? (
					<EditProfile />
				) : (
					<ProfileDetails name={name} about={about} />
				)}
			</div>
		)
	}
}

const mapStateToProps = state => ({
	name: state.user.name,
	about: state.user.about,
})

export default connect(mapStateToProps)(DashboardUser)
