import { useState } from 'react'
import { updateLink } from '../../redux/links/links.actions'
import { connect } from 'react-redux'
import Tooltip from '../tooltip/tooltip.component'

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
						<div className='d-flex flex-row'>
							<div className='input-group h-100'>
								{linkMeta.prefixSign && (
									<div className='input-group-prepend'>
										<span
											className='input-group-text'
											id='basic-addon1'>
											{linkMeta.prefixSign}
										</span>
									</div>
								)}
								<input
									type='text'
									className='form-control'
									placeholder={
										linkMeta.placeholder ||
										`paste your ${name} profile link here`
									}
									onChange={e => setLink(e.target.value)}
									value={link}
									required
								/>
							</div>
							<i
								className='fas fa-times text-danger fa-2x p-1 ml-3 clear-icon'
								onClick={() => {
									setLink('')
								}}
							/>
							<Tooltip data={linkMeta.linkInfo} />
						</div>
					)}
				</div>
				{!profilePage && (
					<>
						<button
							className='btn btn-info px-3 mr-1'
							type='button'
							onClick={() => {
								window.open(
									linkMeta.linkPrefix + link,
									'_blank'
								)
							}}>
							Open Link
						</button>{' '}
						<button className='btn btn-dark px-4'>Save</button>
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
