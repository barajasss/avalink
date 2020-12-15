import React, { Component } from 'react'

export default class Loading extends Component {
	render() {
		const { text } = this.props
		return <h3 className='text-center m-5'>{text ? text : 'Loading...'}</h3>
	}
}
