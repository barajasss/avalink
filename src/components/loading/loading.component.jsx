import React, { Component } from 'react'

export default class Loading extends Component {
	constructor(props) {
		super(props)
		this.state = {
			defaultText: 'Loading...',
			extraText: '',
		}
	}
	componentDidMount() {
		this.timeout = setTimeout(() => {
			console.log('mounted')
			this.setState({
				extraText:
					'Please refresh the page or check your internet connection.',
				defaultText: '',
			})
		}, 15000)
	}
	componentWillUnmount() {
		clearTimeout(this.timeout)
	}
	render() {
		const { text } = this.props
		const { extraText, defaultText } = this.state
		return (
			<>
				<h3 className='text-center m-5'>{text ? text : defaultText}</h3>
				<h5 className='text-center m-5'>{extraText}</h5>
			</>
		)
	}
}
