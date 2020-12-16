import { useState } from 'react'
import { updateLink } from '../../redux/links/links.actions'
import { connect } from 'react-redux'

const LinkEditor = ({
	type,
	closeLinkEditor,
	closeModal,
	updateLink,
	links,
}) => {
	const [link, setLink] = useState(links[type] || '')

	const saveLink = async e => {
		e.preventDefault()
		try {
			await updateLink(type, link)
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<div>
			<button className='btn btn-dark' onClick={() => closeLinkEditor()}>
				<i className='fas fa-chevron-left' /> Back
			</button>
			<br />
			<br />
			<h4>{type}</h4>
			<form onSubmit={saveLink}>
				<div className='form-group'>
					<input
						type='text'
						className='form-control'
						placeholder={`paste your ${type} profile link here`}
						onChange={e => setLink(e.target.value)}
						required
					/>
				</div>
				<button
					className='btn btn-danger px-5'
					type='button'
					onClick={() => {
						closeLinkEditor()
					}}>
					Cancel
				</button>{' '}
				<button className='btn btn-dark px-5'>Save</button>
			</form>
		</div>
	)
}

const mapStateToProps = state => ({
	links: state.links,
})

const mapDispatchToProps = dispatch => ({
	updateLink: (type, link) => dispatch(updateLink(type, link)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LinkEditor)
