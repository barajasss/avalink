import './edit-profile.styles.scss'
import { createRef } from 'react'

import { connect } from 'react-redux'

const EditProfile = ({
	username,
	name,
	about,
	imageUrl,
	updateName,
	updateAbout,
	updateFile,
}) => {
	const fileRef = createRef()
	const imageRef = createRef()

	const openFilePicker = () => {
		fileRef.current.click()
	}
	const uploadFile = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				imageRef.current.src = reader.result
				updateFile(reader.result, file.type)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='px-3 edit-profile-dashboard'>
			<div className='row'>
				<div className='col-md-4 image-container'>
					<div className='display-image'>
						<img
							ref={imageRef}
							src={imageUrl ? imageUrl : '/user.png'}
							alt='user display'
							onError={e => {
								e.target.onerror = null
								e.target.src = '/user.png'
							}}
						/>
						<button
							className='btn btn-dark btn-sm'
							onClick={openFilePicker}>
							Change
						</button>
						<input
							ref={fileRef}
							type='file'
							accept='image/*'
							className='d-none'
							onChange={uploadFile}
						/>
					</div>
				</div>
				<div className='col-md-8 edit-profile-input-container'>
					<form>
						<div className='form-group'>
							<label>Full Name</label>
							<input
								type='text'
								className='form-control'
								value={name}
								onChange={e => updateName(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label>Bio</label>
							<input
								type='text'
								className='form-control'
								value={about}
								onChange={e => updateAbout(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label>Your Profile URL</label>
							<p
								className='p-2'
								style={{
									background: '#dde',
									borderRadius: 5,
									color: '#777',
									cursor: 'not-allowed',
								}}>
								{window.location.origin +
									process.env.REACT_APP_PROFILE_URL +
									username}
							</p>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

const mapStateToProps = state => ({
	username: state.user.username,
})

const mapDispatchToProps = {}

export default connect(mapStateToProps)(EditProfile)
