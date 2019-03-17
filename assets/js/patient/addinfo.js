import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import { Modal,Radio,Button,Icon,Label,Table,Segment,Transition,Card, TextArea, Container, Divider,Flag,Header,Image,Form, Grid, Menu, Reveal,Input,Select,Dimmer,Loader,Placeholder    } from 'semantic-ui-react';
import {SemanticComp, PlaceholderC, ItemCard} from '../components/semantic';

export class ModalPatientShow extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
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
    )
  }
}


ReactDOM.render(<ModalPatientShow />, document.getElementById('UserAddInfo'));
