import './edit-profile.styles.scss'
import { useState, createRef } from 'react'
import { connect } from 'react-redux'

import ImageCropper from '../image-cropper/image-cropper.component'

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
	const [fileType, setFileType] = useState('')
	const [showCropper, setShowCropper] = useState(false)
	const [dataUrl, setDataUrl] = useState('')

	const openFilePicker = () => {
		fileRef.current.click()
	}
	const cropImage = dataUrl => {
		setShowCropper(false)
		imageRef.current.src = dataUrl
		updateFile(dataUrl, fileType)
	}
	const cancelCrop = () => {
		setShowCropper(false)
		setDataUrl('')
		setFileType('')
	}
	const uploadFile = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onload = () => {
				console.log('reader load')
				// imageRef.current.src = reader.result
				setShowCropper(true)
				setDataUrl(reader.result)
				setFileType(file.type)
				// updateFile(reader.result, file.type)
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='px-3 edit-profile-dashboard'>
			<div className='row'>
				<div className='col-md-4 image-container'>
					<div className='display-image-container'>
						<img
							className='display-image'
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
							onClick={e => (e.target.value = null)}
						/>
						{showCropper && (
							<ImageCropper
								key={dataUrl}
								dataUrl={dataUrl}
								cropImage={cropImage}
								cancelCrop={cancelCrop}
							/>
						)}
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
