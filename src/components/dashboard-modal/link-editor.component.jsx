const LinkEditor = ({ type, closeLinkEditor, closeModal }) => (
	<div>
		<button className='btn btn-dark' onClick={() => closeLinkEditor()}>
			<i className='fas fa-chevron-left' /> Back
		</button>
		<br />
		<br />
		<h4>{type}</h4>
		<form>
			<div className='form-group'>
				<input
					type='text'
					className='form-control'
					placeholder={`paste your ${type} profile link here`}
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

export default LinkEditor
