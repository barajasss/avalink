import { useState } from 'react'
import { updateLink } from '../../redux/links/links.actions'
import { connect } from 'react-redux'

const LinkEditor = ({
	closeLinkEditor,
	closeModal,
	updateLink,
	name,
	getUserLink,
	getLinkMeta,
	profilePage,
}) => {
	const [link, setLink] = useState(
		(getUserLink(name) && getUserLink(name).data) || ''
	)
	const linkMeta = getLinkMeta(name)
	const saveLink = async e => {
		e.preventDefault()
		try {
			console.log(link)
			await updateLink(name, link)
			closeModal()
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<div>
			{!profilePage && (
				<>
					<button
						className='btn btn-dark'
						onClick={() => closeLinkEditor()}>
						<i className='fas fa-chevron-left' /> Back
					</button>
					<br />
					<br />
				</>
			)}
			<h4 className='text-capitalize pb-2 pb-md-4'>{name}</h4>
			<form onSubmit={saveLink}>
				<div className='form-group'>
					{profilePage ? (
						<input
							type='text'
							className='form-control'
							placeholder={
								linkMeta.placeholder ||
								`paste your ${name} profile link here`
							}
							onChange={e => setLink(e.target.value)}
							defaultValue={link}
							readOnly
							required
						/>
					) : (
						<input
							type='text'
							className='form-control'
							placeholder={
								linkMeta.placeholder ||
								`paste your ${name} profile link here`
							}
							onChange={e => setLink(e.target.value)}
							defaultValue={link}
							required
						/>
					)}
				</div>
				{!profilePage && (
					<>
						<button
							className='btn btn-danger px-5'
							type='button'
							onClick={() => {
								closeModal()
							}}>
							Cancel
						</button>{' '}
						<button className='btn btn-dark px-5'>Save</button>
					</>
				)}
				{profilePage && (
					<div className='row'>
						<div className='col-6 col-md-4 offset-md-2'>
							<a
								className='btn btn-dark btn-block'
								href={link}
								target='_blank'>
								Open in new tab
							</a>
						</div>
						<div className='col-6 col-md-4'>
							<button
								className='btn btn-dark btn-block'
								href={link}
								target='_blank'
								onClick={() =>
									window.navigator.clipboard.writeText(link)
								}
								type='button'>
								Copy Link
							</button>
						</div>
					</div>
				)}
			</form>
		</div>
	)
}

const mapStateToProps = state => ({
	links: state.links.userLinks,
	getUserLink: name => state.links.userLinks.find(link => link.name === name),
	getLinkMeta: name =>
		state.links.defaultLinks.find(link => link.name === name),
})

const mapDispatchToProps = dispatch => ({
	updateLink: (name, link) => dispatch(updateLink(name, link)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LinkEditor)
