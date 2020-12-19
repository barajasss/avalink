import React, { Component } from 'react'
import './input.styles.scss'

export default class Input extends Component {
	render() {
		const { text, name, placeholder, onChange, type, value } = this.props
		return (
			<div className='form-group'>
				<input
					className='form-control px-3 py-4 input-element'
					type={type ? type : 'text'}
					placeholder={placeholder}
					name={name}
					value={value}
					onChange={onChange}
					minLength={4}
					required
				/>
				{value && text && text.message && !text.processing && (
					<p
						className={`pt-1 mb-0 pb-0 ${
							text.error ? 'text-danger' : 'text-success'
						}`}>
						{text.error ? (
							<i className='fas fa-times-circle mr-1' />
						) : (
							<i className='fas fa-check-circle mr-1' />
						)}
						{text.message}
					</p>
				)}

				{value && text && text.message && text.processing && (
					<p className={`pt-1 mb-0 pb-0 text-info`}>{text.message}</p>
				)}
			</div>
		)
	}
}
