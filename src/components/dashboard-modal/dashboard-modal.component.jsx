import React, { Component } from 'react'

import './dashboard-modal.styles.scss'
import LinkEditor from './link-editor.component'
import LinkOptions from './link-options.component'

class DashboardModal extends Component {
	constructor(props) {
		super(props)
	}
	openLinkEditor = name => {
		const { showModal } = this.props
		showModal(true, {
			displayLinkEditor: true,
			linkEditorType: name,
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
		const {
			show,
			displayLinkEditor,
			linkEditorType,
			custom,
			profilePage,
		} = this.props
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

						{custom && this.props.children}

						{!custom &&
							(displayLinkEditor ? (
								<LinkEditor
									key={show}
									closeModal={this.closeModal}
									closeLinkEditor={this.closeLinkEditor}
									name={linkEditorType}
									profilePage={profilePage}
								/>
							) : (
								!profilePage && (
									<LinkOptions
										openLinkEditor={this.openLinkEditor}
									/>
								)
							))}
					</div>
				</div>
			</>
		)
	}
}

export default DashboardModal
