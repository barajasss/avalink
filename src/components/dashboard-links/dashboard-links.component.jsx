import React, { Component } from 'react'

import DashboardLinkItem from '../dashboard-link-item/dashboard-link-item.component'
import DashboardModal from '../dashboard-modal/dashboard-modal.component'

import { connect } from 'react-redux'
import { fetchLinks } from '../../redux/links/links.actions'

import './dashboard-links.styles.scss'

class DashboardLinks extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showModal: false,
			linkEditorType: '',
			displayLinkEditor: false,
			removeMode: false,
		}
	}

	async componentDidMount() {
		const { fetchLinks } = this.props
		try {
			await fetchLinks()
		} catch (err) {
			console.log(err)
		}
	}

	showModal = (show, opts) => {
		if (opts) {
			this.setState({
				showModal: show,
				linkEditorType: opts.linkEditorType || '',
				displayLinkEditor: opts.displayLinkEditor || false,
			})
		} else {
			this.setState({
				showModal: show,
			})
		}
	}
	render() {
		const {
			removeMode,
			showModal,
			linkEditorType,
			displayLinkEditor,
		} = this.state
		const { links, profilePage } = this.props
		return (
			<div className='dashboard-links'>
				{/* CONTROLS */}
				{!profilePage && (
					<div className='mx-2 mx-sm-0 px-0 row mb-4'>
						<div className='col-6 col-md-4 offset-md-2'>
							<button
								className={`btn ${
									removeMode ? 'btn-dark' : 'btn-outline-dark'
								} mt-2 btn-block`}
								onClick={() =>
									this.setState(state => ({
										removeMode: !state.removeMode,
									}))
								}>
								{removeMode ? 'Done' : 'Edit links'}
							</button>
						</div>
						<div className='col-6 col-md-4'>
							<button className='btn btn-outline-dark mt-2 btn-block'>
								Enable Quick Link
							</button>
						</div>
					</div>
				)}
				{/* LINKS */}
				<div className='link-grid'>
					{!removeMode && <DashboardLinkItem type={'contact'} />}
					{links.map(link => (
						<DashboardLinkItem
							key={link.type}
							showModal={this.showModal}
							linkBtn
							type={link.type}
							removeMode={removeMode}
						/>
					))}
					{!profilePage && !removeMode && (
						<DashboardLinkItem
							modalBtn
							showModal={this.showModal}
							type={'new link'}
						/>
					)}
					<DashboardModal
						show={showModal}
						showModal={this.showModal}
						displayLinkEditor={displayLinkEditor}
						linkEditorType={linkEditorType}
						profilePage={profilePage}
					/>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => ({
	links: state.links.userLinks,
})

const mapDispatchToProps = dispatch => ({
	fetchLinks: () => dispatch(fetchLinks()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardLinks)
