import React from 'react'
import './logo.styles.scss'

export default function Logo({ size }) {
	return (
		<div className='text-center'>
			<img
				src={process.env.PUBLIC_URL + '/Ava logo.png'}
				alt='Ava logo'
				className={`img-fluid ${size === 'md' ? 'md' : 'sm'}`}
			/>
		</div>
	)
}
