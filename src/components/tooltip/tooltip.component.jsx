import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'

export default class Tooltip extends Component {
	render() {
		const { data } = this.props
		return (
			<div>
				<ReactTooltip
					html={true}
					backgroundColor='#444'
					textColor='white'
				/>
				<button
					type='button'
					className='btn btn-secondary p-1'
					style={{
						width: 30,
						height: 30,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						padding: 0,
						marginTop: 5,
						marginLeft: 15,
					}}
					data-tip={
						`<p style='width: 200px; font-size: 1.1em'>${data}</p>` ||
						''
					}>
					<i className='fas fa-info-circle' />
				</button>
			</div>
		)
	}
}
