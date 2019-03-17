import React from 'react';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import { Modal,Radio,Button,Icon,Label,Table,Segment,Transition,Card, TextArea, Container, Divider,Flag,Header,Image,Form, Grid, Menu, Reveal,Input,Select,Dimmer,Loader,Placeholder    } from 'semantic-ui-react';
import {SemanticComp, PlaceholderC, ItemCard} from '../components/semantic';

export class ModalPatient extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
      return(
        <Container>
          <Grid columns='equal'>
            <Grid.Column>
              <Segment>
                <Container textAlign='center'>
                  <Header as='h3'>User Informations</Header>
                  <Image centered src='/img/ph.png' size='small' circular />
                </Container>
                <Form>
                  <Form.Input label='Username'  value='U-NAME' fluid />
                  <Form.Input label='Full Name' fluid />
                  <Form.Input label='Email' fluid />
                  <Form.Input label='Institute' fluid />
                  <Form.Input label='Educational level' fluid />
                  <Form.Input label='Personal acount' fluid />
                </Form>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <PlaceholderC></PlaceholderC>
              </Segment>
            </Grid.Column>
          </Grid>
        </Container>
    )
  }
}


ReactDOM.render(<ModalPatient />, document.getElementById('ModalPatient'));
