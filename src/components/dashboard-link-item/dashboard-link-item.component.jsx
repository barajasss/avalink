import React, { Component } from 'react'
import './dashboard-link-item.styles.scss'

export default class DashboardLinkItem extends Component {
	render() {
		const { modalBtn } = this.props
		return (
			<div
				className='dashboard-link-item'
				data-toggle={`${modalBtn ? 'modal' : ''}`}
				data-target={`${modalBtn ? '#myModal' : ''}`}>
				{this.props.children}
			</div>
		)
	}
}
