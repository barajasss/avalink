import './edit-profile.styles.scss'
import { createRef } from 'react'

const EditProfile = ({ name, about, updateName, updateAbout }) => {
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
			}
			reader.readAsDataURL(file)
		}
	}

	return (
		<div className='px-3 edit-profile-dashboard'>
			<div className='row'>
				<div className='col-md-4 image-container'>
					<div className='display-image'>
						<img ref={imageRef} src={'/user.png'} />
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
							<label>Profile Name</label>
							<input
								type='text'
								className='form-control'
								value={name}
								onChange={e => updateName(e.target.value)}
							/>
						</div>
						<div className='form-group'>
							<label>About</label>
							<input
								type='text'
								className='form-control'
								value={about}
								onChange={e => updateAbout(e.target.value)}
							/>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}
export default EditProfile
