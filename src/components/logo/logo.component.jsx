import React from 'react'
import './logo.styles.scss'

export default function Logo({ small, customStyle }) {
	return (
		<div className='text-center'>
			<img
				src={process.env.PUBLIC_URL + '/Ava logo.png'}
				alt='Ava logo'
				className={`img-fluid ${small ? 'sm' : 'md'}`}
				style={customStyle}
			/>
		</div>
	)
}
