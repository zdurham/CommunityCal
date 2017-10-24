import React, { Component } from "react";
import FontAwesome from 'react-fontawesome';
import './JoinBtn.css';
import SignUpForm from '../SignUpForm';
import { Container, Modal, ModalFooter, ModalHeader, ModalBody, Button } from 'reactstrap';

class JoinBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

    handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container className="btn-container">
        <Button size="lg" className="button-primary" onClick={this.toggle}>{this.props.buttonLabel}Join Our Community!</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader id="header" toggle={this.toggle}>Join</ModalHeader>
          <ModalBody>
          <SignUpForm
            username={this.state.username}
            password={this.state.password}
            handleInputChange={this.handleInputChange}
          />
            <br />
            <h4>Or Via</h4>
            <hr />
            <Button color="info" block>Twitter
              <br />
              <FontAwesome id="icon" icon="ion-social-twitter" fontSize="20" color="white"></FontAwesome></Button>
            <Button color="primary" block>Facebook
              <br />
              <FontAwesome id="icon" icon="ion-social-facebook" fontSize="22" color="white"></FontAwesome>
            </Button>
            <Button color="danger" block>Google
              <br />
              <FontAwesome id="icon" icon="ion-social-googleplus" fontSize="20" color="white"></FontAwesome>
            </Button>
          <ModalFooter>
          </ModalFooter>
          </ModalBody>
        </Modal>
      </Container>
    );
  }
}

export default JoinBtn;
