import React, { Component } from 'react'
import './input.styles.scss'

export default class Input extends Component {
	render() {
		const { name, placeholder, onChange, type } = this.props
		return (
			<div className='form-group'>
				<input
					className='form-control px-3 py-4 input-element'
					type={type ? type : 'text'}
					placeholder={placeholder}
					name={name}
					onChange={onChange}
				/>
			</div>
		)
	}
}
