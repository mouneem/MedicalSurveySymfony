import React from 'react';
import { Modal,Button,Icon,Label,Segment,Container, Divider,Flag,Header,Image,Form, Grid, Menu, Reveal,Input,Select,Dimmer,Loader,Placeholder    } from 'semantic-ui-react';

var tmp;
const Previewcard = props => (
  <Segment>
    {JSON.stringify(tmp["ROOT"]["entry"]["_attributes"]["accession"])}
  </Segment>
);
export {Previewcard as Previewcard}
