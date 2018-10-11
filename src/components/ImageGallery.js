import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-modal'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class ImageGallery extends React.Component {
	constructor(imageUrls) {
		super(imageUrls);
	
		this.state = {
		  modalIsOpen: false
		};
	
		this.openModal = this.openModal.bind(this);
		this.afterOpenModal = this.afterOpenModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
	  }
	
	  openModal() {
		this.setState({modalIsOpen: true});
	  }
	
	  afterOpenModal() {
		// references are now sync'd and can be accessed.
		this.subtitle.style.color = '#f00';
	  }
	
	  closeModal() {
		this.setState({modalIsOpen: false});
	  }
	render() {
		<div className="columns wrap">
			{imageUrls.map((image, index) => (
				<div key={index} className="column is-one-quarter-desktop is-one-half-tablet">
					<a href='javascript:void(0)' onClick={this.openModal}><img src={image.imageUrl} /></a>
					<Modal
					isOpen={this.state.modalIsOpen}
					onAfterOpen={this.afterOpenModal}
					onRequestClose={this.closeModal}
					style={customStyles}
					contentLabel="Example Modal"
					>
						<img src={image.imageUrl} />
					</Modal>
				</div>
			))}
		</div>
	}
}

ImageGallery.propTypes = {
  imageUrls: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string
    })
  ),
}

export default ImageGallery
