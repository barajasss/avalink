import React, { Component } from 'react'

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props)
		this.state = {
			hasError: false,
		}
	}
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
		}
	}
	componentDidCatch(error, errorInfo) {
		console.log(error)
		this.setState({ hasError: true })
	}
	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h1 className='text-center mt-3 mb-2'>
						Something went wrong
					</h1>
					<p className='text-center'>
						Try refreshing the page... or come back later.
					</p>
				</div>
			)
		}
		return this.props.children
	}
}
