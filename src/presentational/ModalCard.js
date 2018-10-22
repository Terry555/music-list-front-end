import React, { Component } from 'react';
import '../App.css';
import { connect } from 'react-redux';
import { Card, Image, Modal } from 'semantic-ui-react';
import defaultImage from '../images/defaultimage.gif';



class ModalCard extends Component {


  render() {
    return (
        <Modal
          closeIcon
          open={this.props.modalOpen}
          onClose={this.props.handleModalClose}
          basic
          size="small"
          >
        <Card>
          {this.props.oneArtist.artist ?
            <div>
            <Image src={this.props.oneArtist.artist.image[3]["#text"]} alt="artist" />
          <Card.Content>
            <Card.Header>{this.props.oneArtist.artist.name}</Card.Header>
            <Card.Description>{this.props.oneArtist.artist.bio.summary.split("<a href")[0]}...</Card.Description>
            <button className="ui tiny pink button" >SAVE</button>
          </Card.Content>
        </div>
          :
          <h2>Loading...</h2>}
        </Card>
      </Modal>
    );
  }


}


function mapStateToProps(state){
  return {
    oneArtist: state.oneArtist,
    modalOpen: state.modalOpen
  }
}

function mapDispatchToProps(dispatch){
  return {
    handleModalClose: (beef) => {
      dispatch({type: "HANDLE MODAL CLOSE", payload: null})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalCard);
