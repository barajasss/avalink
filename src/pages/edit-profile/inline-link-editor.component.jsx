import React from 'react'
import { connect } from 'react-redux'

class InlineLinkEditor extends React.Component {
	render() {
		const { type, link, updateLink } = this.props
		return (
			<div className='inline-link-editor'>
				<img
					src={`${process.env.PUBLIC_URL}icons/${type}.png`}
					className='icon'
				/>
				<div className='form-group'>
					<input
						className='form-control'
						type='text'
						placeholder={`${type} profile link`}
						onChange={e => updateLink(type, e.target.value)}
						value={link}
					/>
				</div>
				<i
					className='fas fa-times text-danger fa-2x p-1 ml-3 clear-icon'
					onClick={() => {
						this.setState({ link: '' })
					}}
				/>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	getLinkFromType: type => {
		const found = state.links.userLinks.find(link => link.type === type)
		if (found) {
			return found.link
		}
	},
})

export default connect(mapStateToProps)(InlineLinkEditor)
