import React from 'react'
import { connect } from 'react-redux'

class InlineLinkEditor extends React.Component {
	render() {
		const { name, updateLink, getUserLink } = this.props
		const { data } = getUserLink(name)
		console.log(name)
		return (
			<div className='inline-link-editor'>
				<img src={`/icons/${name}.png`} className='icon' />
				<div className='form-group'>
					<input
						className='form-control'
						type='text'
						placeholder={`${name} profile link`}
						onChange={e => updateLink(name, e.target.value)}
						value={data}
					/>
				</div>
				<i
					className='fas fa-times text-danger fa-2x p-1 ml-3 clear-icon'
					onClick={() => updateLink(name, '')}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	getUserLink: name => state.links.userLinks.find(link => link.name === name),
})

export default connect(mapStateToProps)(InlineLinkEditor)
