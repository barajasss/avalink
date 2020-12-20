import React, { Component } from 'react'
import ReactTooltip from 'react-tooltip'
import './tooltip.styles.scss'

export default class Tooltip extends Component {
	render() {
		const { data, marginLeft, marginTop, minHeight, onlyIcon } = this.props
		return (
			<div style={{ display: 'flex', minWidth: 30 }}>
				<ReactTooltip
					html={true}
					backgroundColor='#444'
					textColor='white'
					place='left'
					effect='solid'
					className='tooltip-element'
				/>
				{!onlyIcon && (
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
							marginTop: marginTop || 5,
							marginLeft: marginLeft || 15,
							minHeight: `${minHeight}%` || 0,
						}}
						data-tip={
							`<p style='width: 200px; font-size: 1.1em'>${data}</p>` ||
							''
						}>
						<i className='fas fa-info-circle' />
					</button>
				)}
				{onlyIcon && (
					<i
						className='fas fa-info-circle'
						data-tip={
							`<p style='width: 200px; font-size: 1.1em'>${data}</p>` ||
							''
						}
						style={{ fontSize: '1.4em', marginLeft: 10 }}
					/>
				)}
			</div>
		)
	}
}
