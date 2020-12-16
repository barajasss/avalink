const EditProfile = ({ name, about }) => (
	<div className='px-3'>
		<div className='row'>
			<div className='display-image col-md-4'>
				<img src={process.env.PUBLIC_URL + 'user.png'} />
			</div>
			<div className='col-md-8 edit-profile-input-container'>
				<form>
					<div className='form-group'>
						<label>Profile Name</label>
						<input
							type='text'
							className='form-control'
							defaultValue={name}
						/>
					</div>
					<div className='form-group'>
						<label>About</label>
						<input
							type='text'
							className='form-control'
							defaultValue={about}
						/>
					</div>
				</form>
			</div>
		</div>
	</div>
)
export default EditProfile
