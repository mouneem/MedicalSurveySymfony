import React from 'react';
import { Modal,Button,Icon,Label,Table, Segment,Container, Divider,Flag,Header,Image,Form, Grid, Menu, Reveal,Input,Select,Dimmer,Loader,Placeholder, Card    } from 'semantic-ui-react';

const ItemCard = ({ preview }) => (
    <Card fluid>
      <Card.Content>
        <Card.Header content='Imported sequence' />
        <Divider />
        <Card.Content>
          <Table  selectable>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Accession number</Table.Cell>
                <Table.Cell>{preview[0]['accession']}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Sequence Length</Table.Cell>
                <Table.Cell>{preview[0]['sequenceLength']}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Publication date</Table.Cell>
                <Table.Cell>{preview[0]['firstPublic']}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Last updated date</Table.Cell>
                <Table.Cell>{preview[0]['lastUpdated']}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Description</Table.Cell>
                <Table.Cell>{preview[0]['description']}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Card.Content>
        <Divider />
        <Card.Content extra>
          <div className='ui two buttons'>
            <Button onClick={this.gotoinfo}>
              Confirm
            </Button>
            <Button >
              Cancel
            </Button>
          </div>
        </Card.Content>

      </Card.Content>
    </Card>
);

export {ItemCard as ItemCard}


const PlaceholderC = props => (
  <Placeholder fluid>
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
);

export {PlaceholderC as PlaceholderC}


const SemanticComp = props => (
  <div>
    <Segment>
      <Modal trigger={<Button secondary>Show Modal</Button>} centered={false}>
        <Modal.Header>Select a Photo</Modal.Header>
        <Modal.Content>
          <Segment>
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </Segment>
        </Modal.Content>
      </Modal>
      <Modal animated='vertical' trigger={<Button negative>Basic Modal</Button>} basic size='small'>
        <Header icon='archive' content='Archive Old Messages' />
        <Modal.Content>
          <p>
            Your inbox is getting full, would you like us to enable automatic archiving of old messages?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
      <Modal
        trigger={<Button>Show Modal</Button>}
        header='Reminder!'
        content='Call Benjamin regarding the reports.'
        actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
      />


    </Segment>
    <Segment>
      <div>
        <Button primary>Primary</Button>
        <Button secondary>Secondary</Button>
        <Button animated='vertical'>
          <Button.Content hidden>Shop</Button.Content>
          <Button.Content visible>
            <Icon name='shop' />
          </Button.Content>
        </Button>
      </div>



      <Header as='h2'>
        <Image circular src='https://react.semantic-ui.com/images/avatar/large/patrick.png' /> Patrick
      </Header>
      <Header as='h2'>
        <Icon name='plug' />
        <Header.Content>Uptime Guarantee</Header.Content>
      </Header>
      <Header as='h2'>
       <Icon name='settings' />
       <Header.Content>
         Account Settings
         <Header.Subheader>Manage your preferences</Header.Subheader>
       </Header.Content>
     </Header>
    </Segment>
    <Segment>
      <div>
        <Icon loading name='spinner' />
        <Icon loading name='certificate' />
        <Icon loading name='asterisk' />
      </div>
      <div>
        This icon<Icon fitted name='help' />is fitted.
        <br />
        This icon<Icon name='help' />is not.
      </div>
      <div>
        <Icon link name='close' />
        <Icon link name='help' />
        <Icon flipped='horizontally' name='cloud' />
        <Icon flipped='vertically' name='cloud' />
        <Icon rotated='clockwise' name='cloud' />
        <Icon rotated='counterclockwise' name='cloud' />
        <Icon circular name='users' />
        <Icon circular color='teal' name='users' />
        <Icon circular inverted name='users' />
        <Icon circular inverted color='teal' name='users' />
        <Icon bordered name='users' />
        <Icon bordered color='teal' name='users' />
        <Icon bordered inverted color='black' name='users' />
        <Icon bordered inverted color='teal' name='users' />
      </div>
      <div>
        <Icon color='red' name='users' />
        <Icon color='orange' name='users' />
        <Icon color='yellow' name='users' />
        <Icon color='olive' name='users' />
        <Icon color='green' name='users' />
        <Icon color='teal' name='users' />
        <Icon color='blue' name='users' />
        <Icon color='violet' name='users' />
        <Icon color='purple' name='users' />
        <Icon color='pink' name='users' />
        <Icon color='brown' name='users' />
        <Icon color='grey' name='users' />
        <Icon color='black' name='users' />
      </div>

      <Segment inverted>
        <Icon inverted color='red' name='users' />
        <Icon inverted color='orange' name='users' />
        <Icon inverted color='yellow' name='users' />
        <Icon inverted color='olive' name='users' />
        <Icon inverted color='green' name='users' />
        <Icon inverted color='teal' name='users' />
        <Icon inverted color='blue' name='users' />
        <Icon inverted color='violet' name='users' />
        <Icon inverted color='purple' name='users' />
        <Icon inverted color='pink' name='users' />
        <Icon inverted color='brown' name='users' />
        <Icon inverted color='grey' name='users' />
        <Icon inverted color='black' name='users' />
      </Segment>
      <div>
        <Icon.Group size='huge'>
          <Icon size='big' name='circle outline' />
          <Icon name='user' />
        </Icon.Group>
        <Icon.Group size='huge'>
          <Icon size='big' color='red' name='dont' />
          <Icon color='black' name='user' />
        </Icon.Group>
        <Icon.Group size='huge'>
          <Icon loading size='big' name='circle notch' />
          <Icon name='user' />
        </Icon.Group>
      </div>
      <React.Fragment>
        <Icon.Group size='huge'>
          <Icon name='puzzle' />
          <Icon corner='top left' name='add' />
        </Icon.Group>

        <Icon.Group size='huge'>
          <Icon name='puzzle' />
          <Icon corner='top right' name='add' />
        </Icon.Group>

        <Icon.Group size='huge'>
          <Icon name='puzzle' />
          <Icon corner='bottom left' name='add' />
        </Icon.Group>

        <Icon.Group size='huge'>
          <Icon name='puzzle' />
          <Icon corner='bottom right' name='add' />
        </Icon.Group>
      </React.Fragment>
    </Segment>
    <Segment>
      <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'  size='tiny' verticalAlign='top' /> <span>Top Aligned</span>
      <Divider />
      <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'  size='tiny' verticalAlign='middle' /> <span>Middle Aligned</span>
      <Divider />
      <Image src='https://react.semantic-ui.com/images/avatar/small/joe.jpg'  size='tiny' verticalAlign='bottom' /> <span>Bottom Aligned</span>
    </Segment>
    <Segment>
      <Input placeholder='Search...' />
      <Input focus placeholder='Search...' />
      <Input loading icon='user' placeholder='Search...' />
      <Input loading placeholder='Search...' />
      <Input error placeholder='Search...' />
      <Input icon='search' placeholder='Search...' />
      <Input icon='users' iconPosition='left' placeholder='Search users...' />
      <Input icon={<Icon name='search' inverted circular link />} placeholder='Search...' />
    </Segment>
    <Segment>
      <div>
        <Label as='a' image>
          <img src='https://react.semantic-ui.com/images/avatar/small/joe.jpg' />
          Joe
        </Label>
        <Label as='a' image>
          <img src='https://react.semantic-ui.com/images/avatar/small/elliot.jpg' />
          Elliot
        </Label>
        <Label as='a' image>
          <img src='https://react.semantic-ui.com/images/avatar/small/stevie.jpg' />
          Stevie
        </Label>
      </div>
      <div>
        <Label image>
          <img src='https://react.semantic-ui.com/images/avatar/small/ade.jpg' />
          Adrienne
          <Icon name='delete' />
        </Label>
        <Label image>
          <img src='https://react.semantic-ui.com/images/avatar/small/zoe.jpg' />
          Zoe
          <Icon name='delete' />
        </Label>
        <Label image>
          <img src='https://react.semantic-ui.com/images/avatar/small/nan.jpg' />
          Nan
          <Icon name='delete' />
        </Label>
      </div>
      <Form>
        <Form.Field>
          <input type='text' placeholder='First name' />
          <Label pointing>Please enter a value</Label>
        </Form.Field>
        <Divider />

        <Form.Field>
          <Label pointing='below'>Please enter a value</Label>
          <input type='text' placeholder='Last Name' />
        </Form.Field>
        <Divider />

        <Form.Field inline>
          <input type='text' placeholder='Username' />
          <Label pointing='left'>That name is taken!</Label>
        </Form.Field>
        <Divider />

        <Form.Field inline>
          <Label pointing='right'>Your password must be 6 characters or more</Label>
          <input type='password' placeholder='Password' />
        </Form.Field>

        <Form.Field>
          <input type='text' placeholder='First name' />
          <Label basic color='red' pointing>
            Please enter a value
          </Label>
        </Form.Field>
        <Divider />

        <Form.Field>
          <Label basic color='red' pointing='below'>
            Please enter a value
          </Label>
          <input type='text' placeholder='Last Name' />
        </Form.Field>
        <Divider />

        <Form.Field inline>
          <input type='text' placeholder='Username' />
          <Label basic color='red' pointing='left'>
            That name is taken!
          </Label>
        </Form.Field>
        <Divider />

        <Form.Field inline>
          <Label basic color='red' pointing='right'>
            Your password must be 6 characters or more
          </Label>
          <input type='password' placeholder='Password' />
        </Form.Field>
      </Form>

      <Grid columns={2}>
        <Grid.Column>
          <Image
            fluid
            label={{ as: 'a', corner: 'left', icon: 'heart' }}
            src='https://react.semantic-ui.com/images/wireframe/image.png'
          />
        </Grid.Column>

        <Grid.Column>
          <Image
            fluid
            label={{ as: 'a', color: 'red', corner: 'right', icon: 'save' }}
            src='https://react.semantic-ui.com/images/wireframe/image.png'
          />
        </Grid.Column>
      </Grid>
    </Segment>
    <Segment>
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>
          <Segment padded>
            <Label attached='top'>HTML</Label>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment padded>
            <Label attached='bottom'>CSS</Label>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment padded>
            <Label attached='top right'>Code</Label>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column>
          <Segment padded>
            <Label attached='top left'>View</Label>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment padded>
            <Label attached='bottom left'>User View</Label>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Grid.Column>
        <Grid.Column>
          <Segment padded>
            <Label attached='bottom right'>Admin View</Label>
            <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </Segment>
    <Segment>
      <Menu compact>
        <Menu.Item as='a'>
          <Icon name='mail' /> Messages
          <Label color='red' floating>
            22
          </Label>
        </Menu.Item>
        <Menu.Item as='a'>
          <Icon name='users' /> Friends
          <Label color='teal' floating>
            22
          </Label>
        </Menu.Item>
      </Menu>
    </Segment>
    <Segment>
      <Dimmer active>
        <Loader />
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active>
        <Loader>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>


    <Segment>
      <Dimmer active>
        <Loader size='mini'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active>
        <Loader size='tiny'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active>
        <Loader size='small'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active>
        <Loader size='medium'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active>
        <Loader size='large'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active>
        <Loader size='big'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active>
        <Loader size='huge'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
      <Dimmer active>
        <Loader size='massive'>Loading</Loader>
      </Dimmer>

      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
      <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
    </Segment>

    <Segment>
     <Dimmer active inverted>
       <Loader size='mini'>Loading</Loader>
     </Dimmer>

     <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
   </Segment>

   <Segment>
     <Dimmer active inverted>
       <Loader size='small'>Loading</Loader>
     </Dimmer>

     <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
   </Segment>

   <Segment>
     <Dimmer active inverted>
       <Loader size='medium'>Loading</Loader>
     </Dimmer>

     <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
   </Segment>

   <Segment>
     <Dimmer active inverted>
       <Loader size='large'>Loading</Loader>
     </Dimmer>

     <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
   </Segment>


    <Segment>
      <Placeholder>
        <Placeholder.Header image>
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
          <Placeholder.Line />
        </Placeholder.Paragraph>
      </Placeholder>
    </Segment>


      <Segment raised>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line length='medium' />
            <Placeholder.Line length='short' />
          </Placeholder.Paragraph>
        </Placeholder>
      </Segment>


    <Segment center>
      <Placeholder style={{ height: 150, width: 150 }}>
        <Placeholder.Image />
      </Placeholder>
    </Segment>
    <Segment>
      <Reveal animated='move down'>
        <Reveal.Content visible>
          <Image src='https://react.semantic-ui.com/images/wireframe/square-image.png' size='small' />
        </Reveal.Content>
        <Reveal.Content hidden>
          <Image src='https://react.semantic-ui.com/images/avatar/large/nan.jpg' size='small' />
        </Reveal.Content>
      </Reveal>
    </Segment>

    <Segment>
      <Container textAlign='left'>Left Aligned</Container>
      <Container textAlign='center'>Center Aligned</Container>
      <Container textAlign='right'>Right Aligned</Container>
      <Container textAlign='justified'>
        <b>Justified</b>
        <Divider />
        <p>
          Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
          Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.
        </p>
      </Container>
    </Segment>
    <Segment  textAlign='center'>
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
      <Flag name='ma' />
    </Segment>
    <Segment  textAlign='center'>
      <Header as='h2' icon>
        <Icon name='settings' />
        Account Settings
        <Header.Subheader>Manage your account settings and set e-mail preferences.</Header.Subheader>
      </Header>
    </Segment>
    <Segment>
      <Header as='h2' icon textAlign='center'>
        <Icon name='users' circular />
        <Header.Content>Friends</Header.Content>
      </Header>
      <Image centered size='large' src='https://react.semantic-ui.com/images/wireframe/centered-paragraph.png' />
    </Segment>
  </div>
);

export {SemanticComp as SemanticComp}
