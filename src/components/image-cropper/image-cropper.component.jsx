import React, { Component, createRef } from 'react'

import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

import './image-cropper.styles.scss'

class ImageCropper extends Component {
	constructor(props) {
		super(props)
		this.cropImageRef = createRef()
	}
	componentDidMount() {
		const { dataUrl } = this.props
		this.cropImageRef.current.src = dataUrl
		this.cropper = new Cropper(this.cropImageRef.current, {
			aspectRatio: 1,
			zoomable: false,
			background: false,
			modal: false,
		})
	}
	rotate = () => {
		this.cropper.rotate(90)
	}
	cropImage = () => {
		const { cropImage } = this.props
		const dataUrl = this.cropper.getCroppedCanvas().toDataURL()
		cropImage(dataUrl)
	}
	render() {
		const { dataUrl, cancelCrop } = this.props
		return (
			<div className='image-cropper'>
				<div className='image-cropper-container'>
					<img
						className='img-fluid'
						ref={this.cropImageRef}
						src={dataUrl}
						alt='image cropper'
					/>
				</div>
				<div className='rotate-btn-container'>
					<button
						className='image-rotate-button'
						onClick={this.rotate}>
						<img
							className='img-fluid'
							src='https://img.icons8.com/cute-clipart/64/000000/rotate-left.png'
						/>
					</button>
				</div>
				<div className='image-cropper-buttons'>
					<button
						className='btn btn-warning save-btn'
						onClick={cancelCrop}>
						Cancel
					</button>
					<button
						className='btn btn-success crop-btn'
						onClick={this.cropImage}>
						Crop
					</button>
				</div>
			</div>
		)
	}
}
export default ImageCropper
