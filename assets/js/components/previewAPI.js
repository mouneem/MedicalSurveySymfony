import React from 'react';
import { Modal,Button,Icon,Label,Segment,Container, Divider,Flag,Header,Image,Form, Grid, Menu, Reveal,Input,Select,Dimmer,Loader,Placeholder    } from 'semantic-ui-react';
import {Previewcard} from '../components/previewcard';
var tmp;

const PreviewAPI = props => (
  <Segment>
    {tmp == false
      ? <Placeholder fluid><Placeholder.Paragraph /><Placeholder.Line /></Placeholder>
      : <Previewcard></Previewcard>
    }
  </Segment>
);


export {PreviewAPI as PreviewAPI}
