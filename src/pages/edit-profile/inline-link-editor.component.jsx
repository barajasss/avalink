import React from 'react'
import { connect } from 'react-redux'
import Tooltip from '../../components/tooltip/tooltip.component'

class InlineLinkEditor extends React.Component {
	render() {
		const { name, data, updateLink, getLinkMeta } = this.props
		const linkMeta = getLinkMeta(name)
		return (
			<div className='inline-link-editor'>
				<img src={`/icons/${name}.png`} className='icon' />
				<div className='form-group'>
					<input
						className='form-control'
						type='text'
						placeholder={
							linkMeta.placeholder || `${name} profile link`
						}
						onChange={e => updateLink(name, e.target.value)}
						value={data}
					/>
				</div>
				<i
					className='fas fa-times text-danger fa-2x p-1 ml-3 clear-icon'
					onClick={() => updateLink(name, '')}
				/>
				<Tooltip data={linkMeta.linkInfo} />
			</div>
		)
	}
}

const mapStateToProps = state => ({
	getLinkMeta: name =>
		state.links.defaultLinks.find(link => link.name === name),
})

export default connect(mapStateToProps)(InlineLinkEditor)
