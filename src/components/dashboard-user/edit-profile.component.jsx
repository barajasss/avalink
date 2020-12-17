const EditProfile = ({ name, about, updateName, updateAbout }) => (
	<div className='px-3'>
		<div className='row'>
			<div className='display-image col-md-4'>
				<img src={'/user.png'} />
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
