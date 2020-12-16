import React, { Component } from 'react'

import './dashboard-modal.styles.scss'
import LinkEditor from './link-editor.component'
import LinkOptions from './link-options.component'

class DashboardModal extends Component {
	constructor(props) {
		super(props)
		this.state = {
			openLinkEditor: false,
			type: '',
		}
	}
	openLinkEditor = type => {
		this.setState({ openLinkEditor: true, type })
	}
	closeLinkEditor = () => {
		this.setState({ openLinkEditor: false })
	}
	closeModal = () => {
		const { showModal } = this.props
		showModal(false)
		this.timeout = setTimeout(
			() =>
				this.setState({
					openLinkEditor: false,
				}),
			1000
		)
	}
	componentWillUnmount() {
		clearTimeout(this.timeout)
	}
	render() {
		const { show } = this.props
		const { openLinkEditor, type } = this.state
		return (
			<>
				<div
					className={`black-screen ${show ? 'show' : 'hide'}`}
					onClick={this.closeModal}></div>
				<div className={`dashboard-modal ${show ? 'show' : 'hide'}`}>
					<div className='dashboard-modal-content'>
						<i
							className='fas fa-times close-icon'
							onClick={this.closeModal}></i>
						{openLinkEditor ? (
							<LinkEditor
								closeModal={this.closeModal}
								closeLinkEditor={this.closeLinkEditor}
								type={type}
							/>
						) : (
							<LinkOptions openLinkEditor={this.openLinkEditor} />
						)}
					</div>
				</div>
			</>
		)
	}
}

export default DashboardModal
