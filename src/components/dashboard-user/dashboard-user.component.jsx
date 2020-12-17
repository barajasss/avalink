import React, { Component } from 'react'

import { connect } from 'react-redux'
import './dashboard-user.styles.scss'

import ProfileDetails from './profile-details.component'
import EditProfile from './edit-profile.component'

class DashboardUser extends Component {
	render() {
		const {
			name,
			about,
			editableName,
			editableAbout,
			editProfile,
			updateName,
			updateAbout,
			profilePage,
		} = this.props
		return (
			<div className='dashboard-user'>
				{editProfile ? (
					<EditProfile
						name={editableName}
						about={editableAbout}
						updateName={updateName}
						updateAbout={updateAbout}
					/>
				) : (
					<ProfileDetails
						name={name}
						about={about}
						profilePage={profilePage}
					/>
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
