import React from 'react'
import './logo.styles.scss'

import { Link } from 'react-router-dom'

export default function Logo({ small, customStyle }) {
	return (
		<div className='text-center'>
			<Link to='/'>
				<img
					src='/images/logo.png'
					alt='Ava logo'
					className={`img-fluid ${small ? 'sm' : 'md'}`}
					style={customStyle}
				/>
			</Link>
		</div>
	)
}
