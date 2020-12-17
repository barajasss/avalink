import './edit-profile.styles.scss'

const EditProfile = ({ name, about, updateName, updateAbout }) => (
	<div className='px-3 edit-profile-dashboard'>
		<div className='row'>
			<div className='col-md-4 image-container'>
				<div className='display-image'>
					<img src={'/user.png'} />
					<button className='btn btn-dark btn-sm'>Change</button>
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
export default EditProfile
