import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup  } from 'react-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {LoadingAnimation} from '../components/loading-animation';
import {ModalReact} from '../components/modalReact';
import {SemanticComp, PlaceholderC} from '../components/semantic';
import { Modal, Button,Icon,Label,Segment,Container, Divider,Flag,Header,Image,Form, Grid, Menu, Reveal,Input,Select,Dimmer,Loader,Placeholder    } from 'semantic-ui-react';

var list = [];
var allSeq = [];


console.log("Loading sequences...");

export class AppLogin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          SeqId: "",
      }
    }


    componentDidMount() {
    }


    render() {
      <Modal trigger={<Button>Show Modal</Button>}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content image>
          <Image wrapped size='medium' src='/images/avatar/large/rachel.png' />
          <Modal.Description>
            <Header>Default Profile Image</Header>
            <p>We've found the following gravatar image associated with your e-mail address.</p>
            <p>Is it okay to use this photo?</p>
          </Modal.Description>
        </Modal.Content>
      </Modal>
     }
  }


ReactDOM.render(<AppLogin />, document.getElementById('ModalPatient'));
