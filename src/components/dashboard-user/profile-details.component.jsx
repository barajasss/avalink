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

export default ProfileDetails
