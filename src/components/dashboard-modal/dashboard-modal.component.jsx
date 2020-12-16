import React, { Component } from 'react'

import './dashboard-modal.styles.scss'
import LinkEditor from './link-editor.component'
import LinkOptions from './link-options.component'

class DashboardModal extends Component {
	constructor(props) {
		super(props)
	}
	openLinkEditor = type => {
		const { showModal } = this.props
		showModal(true, {
			displayLinkEditor: true,
			linkEditorType: type,
		})
	}
	closeLinkEditor = () => {
		const { showModal } = this.props
		showModal(true, {
			displayLinkEditor: false,
			linkEditorType: '',
		})
	}
	closeModal = () => {
		const { showModal } = this.props
		showModal(false)
	}
	componentWillUnmount() {}
	render() {
		const { show, displayLinkEditor, linkEditorType } = this.props
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
						{displayLinkEditor ? (
							<LinkEditor
								key={linkEditorType}
								closeModal={this.closeModal}
								closeLinkEditor={this.closeLinkEditor}
								type={linkEditorType}
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
