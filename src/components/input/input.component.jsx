import React, { Component } from 'react'
import './input.styles.scss'

export default class Input extends Component {
	constructor(props) {
		super(props)
		this.state = {
			type: props.type,
			showPassword: props.showPassword || false,
		}
	}
	render() {
		const { text, name, placeholder, onChange, value } = this.props
		const { type, showPassword } = this.state
		return (
			<div className='form-group'>
				<div className='input-group'>
					<input
						className='form-control px-3 py-4 input-element'
						type={type && !showPassword ? type : 'text'}
						placeholder={placeholder}
						name={name}
						value={value}
						onChange={onChange}
						minLength={4}
						required
					/>
					{/* PASSWORD SHOW logic */}
					<div
						className='input-group-append'
						style={{ background: 'none' }}>
						{name === 'password' && (
							<span
								className='input-group-text text-center'
								style={{ width: 50 }}
								onClick={() => {
									this.setState(state => ({
										showPassword: !state.showPassword,
									}))
								}}>
								{showPassword ? (
									<i
										className='fas fa-eye'
										style={{
											display: 'block',
											margin: 'auto',
										}}
									/>
								) : (
									<i
										className='fas fa-eye-slash'
										style={{
											display: 'block',
											margin: 'auto',
										}}
									/>
								)}
							</span>
						)}
					</div>
				</div>
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
