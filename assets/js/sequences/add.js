import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup  } from 'react-transition-group';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6
import {LoadingAnimation} from '../components/loading-animation';
import {ModalReact} from '../components/modalReact';
import {SemanticComp, PlaceholderC, ItemCard} from '../components/semantic';
import { Modal,Radio,Button,Icon,Label,Table,Segment,Transition,Card,List, TextArea, Container, Divider,Flag,Header,Image,Form, Grid, Menu, Reveal,Input,Select,Dimmer,Loader,Placeholder    } from 'semantic-ui-react';

console.log("Loading sequences...");
var convert = require('xml-js');
var tmp;
const requestIp = require('request-ip');

export class AddSequence extends React.Component {
    constructor(props) {
      super(props);
      this.preview = this.preview.bind(this);
      this.gotoinfo = this.gotoinfo.bind(this);
      this.post = this.post.bind(this);
      this.SkinColor = this.SkinColor.bind(this);
      this.HairColor = this.HairColor.bind(this);
      this.EyeColor = this.EyeColor.bind(this);
      this.onMapLoad = this.onMapLoad.bind(this);
      this.handleURLChange = this.handleURLChange.bind(this);
      this.apiUrlShowChange = this.apiUrlShowChange.bind(this);
      this.handleOpen = this.handleOpen.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.state = {
        imc: 20,
        selectedsex:'female',
        dotstyle: {
          position: 'absolute',
          top: 0,
          left: 0,
        },
        diseaselist: [],
        attlist: [],
        mapY:0,
        mapX:0,
        cm:170,
        kg:70,
        mapX:0,
        selectedY:0,
        selectedX:0,
        formSequence_seqName:'',
        formSequence_description:'',
        formSequence_isApi:true,
        apiseq_accNum:'',
        apiseq_databank:'ENA',
        apiseq_seq_length:'',
        apiseq_publication_date:'',
        apiseq_description:'',
        apiUrlShow:true,
        apiurl:'',
        accNum:'',
        comfirmBtn:'disabled',
        isPreviewLoaded:false,
        DiseaseModal:false,
        isPreviewDisplay:false,
        // ShowThis: "physic",
        ShowThis: "home",
        items: [],
        modalOpen: false,
        diseaseModalOpen: false,
        attModalOpen: false,
        isLoading: true,
        displayDot:false,
        isUser: false,
        SkinColor: '#D7A37B',
        HairColor: '#23120B',
        EyeColor: '#1B2260',
      }
    }


    componentDidMount() {

    }

    post(){
      fetch('/sequence/AddSequence', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formSequence_seqName : this.state.formSequence_seqName ,
          formSequence_description : this.state.formSequence_description ,
          formSequence_isApi : this.state.formSequence_isApi ,
          apiseq_accNum : this.state.apiseq_accNum ,
          apiseq_databank : this.state.apiseq_databank ,
          apiseq_seq_length : this.state.apiseq_seq_length ,
          apiseq_publication_date : this.state.apiseq_publication_date ,
          apiseq_description : this.state.apiseq_description ,
          mapY:this.state.mapY,
          mapX:this.state.mapX,
          selectedY:this.state.selectedY,
          selectedX:this.state.selectedX,
          isUser: this.state.isUser,
          selectedCountry:this.state.selectedCountry,
          selectedRegion:this.state.selectedRegion,
          selectedCity:this.state.selectedCity,
          SkinColor:this.state.SkinColor,
          HairColor:this.state.HairColor,
          EyeColor:this.state.EyeColor,
          imc:this.state.imc,
          selectedsex:this.state.selectedsex,
          diseaselist:this.state.diseaselist,
          attlist:this.state.attlist,
          attlist:this.state.attlist,
          attlist:this.state.attlist,
          cm:this.state.cm,
          kg:this.state.kg,

        })
      })
    }

    preview(){
      this.setState({isPreviewDisplay : false});
      this.setState({isPreviewLoaded : true});
      if (this.state.apiUrlShow ) {
        tmp = this.state.apiurl;
      }
      else if (this.state.Databank == "ENA") {
        tmp = 'https://www.ebi.ac.uk/ena/data/view/'+this.state.accNum+'%26display%3Dxml';
      }
      console.log(tmp);
      fetch(tmp)
          .then(res => res.text())
          .then(xml => {
              this.setState({
                  preview: [{
                    accession : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["_attributes"]["accession"],
                    sequenceLength : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["_attributes"]["sequenceLength"],
                    firstPublic : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["_attributes"]["firstPublic"],
                    lastUpdated : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["_attributes"]["lastUpdated"],
                    description : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["description"]['_text'],
                  }],
                  apiseq_accNum : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["_attributes"]["accession"],
                  apiseq_seq_length : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["_attributes"]["sequenceLength"],
                  apiseq_publication_date : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["_attributes"]["firstPublic"],
                  apiseq_description : convert.xml2js(xml, {compact: true})['ROOT']["entry"]["description"]['_text'],
                  isPreviewLoaded: false,
                  isPreviewDisplay: true,
              });
            });
    }

    handleOpen($Seq_id) {
      this.setState({ modalOpen: true });
      fetch('/fechtSequencesAPI/'+$Seq_id+'')
          .then(res => res.json())
          .then(json => {
              this.setState({
                  SeqId: $Seq_id,
                  seqById: json
              });
          });
    }


    handleClose() {
      this.setState({ modalOpen: false });
          this.setState({
              SeqId: '',
              seqById: ''
          });
    }

    gotoapi(){
      if (this.state.ShowThis == 'home') {
        this.setState({
            ShowThis: 'api',
        });
      }
      else {
        this.setState({
            ShowThis: 'home',
        });
      }
    }

    gotoinfo(){
        this.setState({
            ShowThis: 'info',
        });
    }

    gotophysic(){
        this.setState({
            ShowThis: 'physic',
        });
    }

    handleURLChange(e){
      this.setState({apiurl:e.target.value});
    }

    apiUrlShowChange(e){
      this.setState({apiUrlShow:!this.state.apiUrlShow});
    }

    accNumChange(e){
      this.setState({accNum:e.target.value});
    }

    selectedDatabankChange(e, data){
      this.setState({Databank:data.value});
      this.setState({apiseq_databank:data.value})
    }
    selectCountry(e, data){
      this.setState({selectedCountry:data.value});
    }
    selectSex(e, data){
      this.setState({selectedSex:data.value});
    }
    selectRegion(e){
      this.setState({selectedRegion:e.target.value});
    }
    selectCity(e){
      this.setState({selectedCity:e.target.value});
    }

    seqNameHandle(e){this.setState({formSequence_seqName:e.target.value})}
    seqDesc(e){this.setState({formSequence_description:e.target.value})}
    seqisAPI(e){this.setState({formSequence_isApi:!this.state.formSequence_isApi})}
    isUser(e){this.setState({isUser:!this.state.isUser})}

    _onMapMouseMove(e) {
      if (this.state.displayDot) {
        this.setState({ displayDot:false});
      } else {
      var y = e.nativeEvent.offsetY;
      var x = e.nativeEvent.offsetX;
      this.setState({dotstyle:{position: 'absolute' , top: y , left: x}});
      this.setState({mapY:e.target.offsetHeight});
      this.setState({mapX:e.target.offsetWidth});
      this.setState({selectedY:y});
      this.setState({selectedX:x});
      this.setState({ displayDot:true});
      }
     }
    setSexMale(e){
      this.setState({selectedsex:'male'});
    }
    setSexFemale(e){
      this.setState({selectedsex:'female'});
    }
    SkinColor(e, parmtr){
      this.setState({SkinColor:parmtr});
    }
    HairColor(e, parmtr){
      this.setState({HairColor:parmtr});
    }
    EyeColor(e, parmtr){
      this.setState({EyeColor:parmtr});
    }
    kgminus(e){
      this.setState({kg: this.state.kg - 10});
      this.setState({imc: (this.state.kg/(this.state.cm*this.state.cm))*100*100});
    }
    kgplus(e){
      this.setState({kg: this.state.kg + 10});
      this.setState({imc: (this.state.kg/(this.state.cm*this.state.cm))*100*100});
    }
    cmminus(e){
      this.setState({cm: this.state.cm - 10});
      this.setState({imc: (this.state.kg/(this.state.cm*this.state.cm))*100*100});
    }
    cmplus(e){
      this.setState({cm: this.state.cm + 10});
      this.setState({imc: (this.state.kg/(this.state.cm*this.state.cm))*100*100});
    }
    diseaseName(e){
      this.setState({diseaseName: e.target.value});
    }
    diseaseDesc(e){
      this.setState({diseaseDesc: e.target.value});
    }
    diseaseModalOpen(e){
      this.setState({diseaseModalOpen: true});
    }
    diseaseModalClose(e){
      this.setState({diseaseModalOpen: false});
    }
    validateDiseaseModal(e){
      var diseases = this.state.diseaselist;
      diseases.push({name:this.state.diseaseName,descr:this.state.diseaseDesc});
      this.setState({diseaselist: diseases});
      this.setState({diseaseName: ''});
      this.setState({diseaseDesc: ''});
      this.setState({diseaseModalOpen: false});
    }
    attName(e){
      this.setState({attName: e.target.value});
    }
    attDesc(e){
      this.setState({attDesc: e.target.value});
    }
    attModalOpen(e){
      this.setState({attModalOpen: true});
    }
    attModalClose(e){
      this.setState({attModalOpen: false});
    }
    validateattModal(e){
      var atts = this.state.attlist;
      atts.push({name:this.state.attName,descr:this.state.attDesc});
      this.setState({attlist: atts});
      this.setState({attName: ''});
      this.setState({attDesc: ''});
      this.setState({attModalOpen: false});
    }

     onMapLoad(e){
       this.setState({mapY:e.target.offsetHeight});
       this.setState({mapX:e.target.offsetWidth});
     }

    render() {
      if (this.state.ShowThis=='home') {
        return(
          <div>
            <div>
              <ReactCSSTransitionGroup
                transitionName="fade"
                transitionEnterTimeout={200}
                transitionLeaveTimeout={200}
                transitionAppear={true}
                transitionAppearTimeout={2000}
                key='key'
              >
              <Segment>
                <h4>Add new sequence to the databank:</h4>
                <Divider/>
                <Container>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Container>
                <Divider/>
                <Grid columns='equal'>
                  <Grid.Column>
                  </Grid.Column>
                  <Grid.Column width={8}>
                    <Form>
                      <Form.Input label='Sequence name' onChange={this.seqNameHandle.bind(this)} value={this.state.formSequence_seqName} fluid placeholder='ID00000' />
                      <Form.Field control={TextArea} label='About' onChange={this.seqDesc.bind(this)} value={this.state.formSequence_description}  placeholder='Tell us more about you...' />
                      <Form.Group inline>
                        <label>Your sequence exist in other database: </label>
                         <Radio onChange={this.seqisAPI.bind(this)} checked={this.state.formSequence_isApi} toggle />
                      </Form.Group>
                      <Form.Group inline>
                        <Button animated='vertical'  onClick={this.gotoapi.bind(this)}>
                          <Button.Content visible>Continue</Button.Content>
                          <Button.Content hidden>
                            <Icon name='upload' />
                          </Button.Content>
                        </Button>
                      </Form.Group>
                    </Form>
                  </Grid.Column>
                  <Grid.Column>
                  </Grid.Column>
                  </Grid>
              </Segment>
              </ReactCSSTransitionGroup>
            </div>
          </div>
      )
    } else if (this.state.ShowThis == 'api') {
      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionAppear={true}
          transitionAppearTimeout={2000}
          key='key1'
        >
          <Segment className='container-a'>
            <h4>Import alredy uploaded sequence:</h4>
            <Divider/>
            <Container>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor r. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Container>
            <Divider/>
            <Grid columns='equal'>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column width={8}>


                <Form>

                  <Form.Group inline>
                    <label>Use UPI url: </label>
                     <Radio fluid="true" onChange={this.apiUrlShowChange} checked={this.state.apiUrlShow} toggle />
                  </Form.Group>
                  {this.state.apiUrlShow
                    ?<ReactCSSTransitionGroup transitionName="fadedown" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500} key='l'><Form.Input label='API URL' onChange={this.handleURLChange.bind(this)} value={this.state.apiUrl} fluid placeholder='http://ID00000' /></ReactCSSTransitionGroup>
                  : <ReactCSSTransitionGroup transitionName="fadedown" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500} key='2'><div> <Form.Input label='Accession number' onChange={this.accNumChange.bind(this)} fluid placeholder='ID00000' /><Form.Select onChange={this.selectedDatabankChange.bind(this)} value={this.state.Databank} label='Select a databank' fluid options={[{ key: 'NCBI', value: 'NCBI', text: 'NCBI Databank'}, { key: 'EBI - ERA', value: 'EBI - ERA', text: 'ERA'}, { key: 'ENA', value: 'ENA', text: 'ENA'}]} /></div></ReactCSSTransitionGroup>
                  }




                  <Form.Group inline>
                    <div className='mt-3'>
                      <Button animated onClick={this.gotoapi.bind(this)}>
                        <Button.Content visible>Previous</Button.Content>
                        <Button.Content hidden>
                          <Icon name='arrow left' />
                        </Button.Content>
                      </Button>
                      <Button onClick={this.preview.bind(this)} disabled={!(this.state.apiurl || (this.state.accNum && this.state.Databank))}>Continue</Button>
                    </div>
                  </Form.Group>
                </Form>
                {this.state.isPreviewLoaded?<PlaceholderC></PlaceholderC>:''}
                {this.state.isPreviewDisplay?
                  <Card fluid>
                    <Card.Content>
                      <Card.Header content='Imported sequence' />
                      <Divider />
                      <Card.Content>
                        <Table  selectable>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>Accession number</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['accession']}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Sequence Length</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['sequenceLength']}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Publication date</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['firstPublic']}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Last updated date</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['lastUpdated']}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Description</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['description']}</Table.Cell>
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
                  :''}
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid>
          </Segment>
        </ReactCSSTransitionGroup>
        )
    } else if (this.state.ShowThis == 'info') {
      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionAppear={true}
          transitionAppearTimeout={2000}
          key='key2'
        >
          <Segment>
            <Container>
              <Grid columns='equal'>
                <Grid.Column >
                </Grid.Column>
                <Grid.Column width={12}>
                  <Header>
                    Location and other informations
                  </Header>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <Divider />
                  <Container>
                    <Form>
                      <Form.Group inline>
                        <label>Are you the owner </label>
                        <Form.Radio label='Yes' value='yes' onChange={this.isUser.bind(this)} checked={this.state.isUser}  />
                        <Form.Radio label='No' value='no'  />
                      </Form.Group>
                      <Select onChange={this.selectCountry.bind(this)} value={this.state.selectedCountry} placeholder='' fluid options={[{ key: 'Algeria', value: 'Algeria', flag: 'Algeria', text: 'Algeria' },{ key: 'Botswana', value: 'Botswana',  flag: 'Botswana', text: 'Botswana' },{ key: 'Other', value: 'Other',flag: 'Other', text: 'Other' }]} />
                      <Form.Input label='City' onChange={this.selectCity.bind(this)} value={this.state.selectedCity}/>
                      <Form.Input label='Region' onChange={this.selectRegion.bind(this)} value={this.state.selectedRegion}/>
                    </Form>
                  </Container>
                </Grid.Column>
                <Grid.Column >
                </Grid.Column>
              </Grid>
            </Container>
            <Container>
              <Grid columns='equal'>
                <Grid.Column>
                </Grid.Column>
                <Grid.Column width={5}>
                  <Image fluid src='/svg/a.svg'onLoad={this.onMapLoad} onClick={this._onMapMouseMove.bind(this)} />
                  {this.state.displayDot ?
                    <ReactCSSTransitionGroup
                      transitionName="fadedown"
                      transitionEnterTimeout={200}
                      transitionLeaveTimeout={200}
                      transitionAppear={true}
                      transitionAppearTimeout={2000}
                      key='key'
                    >
                    <Image src='/svg/dot.svg' style={this.state.dotstyle} height={20} width={20} />
                    </ReactCSSTransitionGroup> :''
                  }
                  <Container fluid textAlign='center'>Please select the origin of the sequence from the map</Container>
                </Grid.Column>
                <Grid.Column>
                </Grid.Column>
              </Grid>
            </Container>
            {this.state.displayDot ?
              <Container textAlign='center'>
                <ReactCSSTransitionGroup
                  transitionName="fade"
                  transitionEnterTimeout={200}
                  transitionLeaveTimeout={200}
                  transitionAppear={true}
                  transitionAppearTimeout={2000}
                  key='key3'
                >
                <Button onClick={this.goto}>Post</Button>
                </ReactCSSTransitionGroup> </Container>:''
              }
              <Button onClick={this.gotophysic.bind(this)}>Continue</Button>
            </Segment>
          </ReactCSSTransitionGroup>
        )
    }else if (this.state.ShowThis == 'api') {
      return (
        <ReactCSSTransitionGroup
          transitionName="fade"
          transitionEnterTimeout={200}
          transitionLeaveTimeout={200}
          transitionAppear={true}
          transitionAppearTimeout={2000}
          key='key1'
        >
          <Segment className='container-a'>
            <h4>Import alredy uploaded sequence:</h4>
            <Divider/>
            <Container>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor r. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            </Container>
            <Divider/>
            <Grid columns='equal'>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column width={8}>
                <Form>
                  <Form.Group inline>
                    <label>Use UPI url: </label>
                     <Radio fluid="true" onChange={this.apiUrlShowChange} checked={this.state.apiUrlShow} toggle />
                  </Form.Group>
                  {this.state.apiUrlShow
                    ?<ReactCSSTransitionGroup transitionName="fadedown" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500} key='l'><Form.Input label='API URL' onChange={this.handleURLChange.bind(this)} value={this.state.apiUrl} fluid placeholder='http://ID00000' /></ReactCSSTransitionGroup>
                  : <ReactCSSTransitionGroup transitionName="fadedown" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500} key='2'><div> <Form.Input label='Accession number' onChange={this.accNumChange.bind(this)} fluid placeholder='ID00000' /><Form.Select onChange={this.selectedDatabankChange.bind(this)} value={this.state.Databank} label='Select a databank' fluid options={[{ key: 'NCBI', value: 'NCBI', text: 'NCBI Databank'}, { key: 'EBI - ERA', value: 'EBI - ERA', text: 'ERA'}, { key: 'ENA', value: 'ENA', text: 'ENA'}]} /></div></ReactCSSTransitionGroup>
                  }
                  <Form.Group inline>
                    <div className='mt-3'>
                      <Button animated onClick={this.gotoapi.bind(this)}>
                        <Button.Content visible>Previous</Button.Content>
                        <Button.Content hidden>
                          <Icon name='arrow left' />
                        </Button.Content>
                      </Button>
                      <Button onClick={this.preview.bind(this)} disabled={!(this.state.apiurl || (this.state.accNum && this.state.Databank))}>Continue</Button>
                      <Button onClick={this.post.bind(this)}>Continue</Button>
                    </div>
                  </Form.Group>
                </Form>
                {this.state.isPreviewLoaded?<PlaceholderC></PlaceholderC>:''}
                {this.state.isPreviewDisplay?
                  <Card fluid>
                    <Card.Content>
                      <Card.Header content='Imported sequence' />
                      <Divider />
                      <Card.Content>
                        <Table  selectable>
                          <Table.Body>
                            <Table.Row>
                              <Table.Cell>Accession number</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['accession']}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Sequence Length</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['sequenceLength']}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Publication date</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['firstPublic']}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Last updated date</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['lastUpdated']}</Table.Cell>
                            </Table.Row>
                            <Table.Row>
                              <Table.Cell>Description</Table.Cell>
                              <Table.Cell>{this.state.preview[0]['description']}</Table.Cell>
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
                  :''}
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid>
          </Segment>
        </ReactCSSTransitionGroup>
        )
    } else if (this.state.ShowThis == 'physic') {
      return (
          <Grid columns='equal'>
            <Grid.Column width={10}>
              <Segment className='container-a'>
                <h4>Add physical informations</h4>
                <Divider/>
                <Container>
                  <Form>
                    <Form.Group >
                      <div className="field">
                        <label>Sex</label>
                        <Card.Group>
                          <Card onClick={this.setSexMale.bind(this)} color={this.state.selectedsex=='male'?'grey':''} floated='right' style={{width: '80px'}}>
                            <Card.Content>
                              <Image style={{height: '50px', width: '50px'}} src='/svg/ml.svg' />
                            </Card.Content>
                          </Card>
                          <Card onClick={this.setSexFemale.bind(this)} color={this.state.selectedsex=='female'?'grey':''} floated='right' style={{width: '80px'}}>
                            <Card.Content>
                              <Image style={{height: '50px', width: '50px'}} src='/svg/fml.svg' />
                            </Card.Content>
                          </Card>
                        </Card.Group>
                      </div>
                    </Form.Group>
                    <Form.Group >
                      <div className="field">
                        <label>Skin color</label>
                        <Card.Group>
                          <Card onClick={(e) => {this.SkinColor(e, '#FDEFD5' )}} style={{backgroundColor:'#FDEFD5', width: 60, height: 30}} color={this.state.SkinColor=='#FDEFD5'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.SkinColor(e, '#FBDCA9' )}} style={{backgroundColor:'#FBDCA9', width: 60, height: 30}} color={this.state.SkinColor=='#FBDCA9'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.SkinColor(e, '#EEBC99' )}} style={{backgroundColor:'#EEBC99', width: 60, height: 30}} color={this.state.SkinColor=='#EEBC99'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.SkinColor(e, '#D7A37B' )}} style={{backgroundColor:'#D7A37B', width: 60, height: 30}} color={this.state.SkinColor=='#D7A37B'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.SkinColor(e, '#BF836B' )}} style={{backgroundColor:'#BF836B', width: 60, height: 30}} color={this.state.SkinColor=='#BF836B'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.SkinColor(e, '#88563D' )}} style={{backgroundColor:'#88563D', width: 60, height: 30}} color={this.state.SkinColor=='#88563D'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.SkinColor(e, '#54200C' )}} style={{backgroundColor:'#54200C', width: 60, height: 30}} color={this.state.SkinColor=='#54200C'?'black':''} floated='right' />
                        </Card.Group>
                      </div>
                    </Form.Group>
                    <Form.Group >
                      <div className="field">
                        <label>Hair color</label>
                        <Card.Group>
                          <Card onClick={(e) => {this.HairColor(e, '#CC4F11' )}} style={{backgroundColor:'#CC4F11', width: 60, height: 30}} color={this.state.HairColor=='#CC4F11'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.HairColor(e, '#DD7F2A' )}} style={{backgroundColor:'#DD7F2A', width: 60, height: 30}} color={this.state.HairColor=='#DD7F2A'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.HairColor(e, '#CC9966' )}} style={{backgroundColor:'#CC9966', width: 60, height: 30}} color={this.state.HairColor=='#CC9966'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.HairColor(e, '#CCB8A6' )}} style={{backgroundColor:'#CCB8A6', width: 60, height: 30}} color={this.state.HairColor=='#CCB8A6'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.HairColor(e, '#5A3825' )}} style={{backgroundColor:'#5A3825', width: 60, height: 30}} color={this.state.HairColor=='#5A3825'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.HairColor(e, '#2D1A13' )}} style={{backgroundColor:'#2D1A13', width: 60, height: 30}} color={this.state.HairColor=='#2D1A13'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.HairColor(e, '#23120B' )}} style={{backgroundColor:'#23120B', width: 60, height: 30}} color={this.state.HairColor=='#23120B'?'black':''} floated='right' />
                        </Card.Group>
                      </div>
                    </Form.Group>
                    <Form.Group >
                      <div className="field">
                        <label>Eyes color</label>
                        <Card.Group>
                          <Card onClick={(e) => {this.EyeColor(e, '#1B2260' )}} style={{backgroundColor:'#1B2260', width: 60, height: 30}} color={this.state.EyeColor=='#1B2260'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.EyeColor(e, '#65C6CF' )}} style={{backgroundColor:'#65C6CF', width: 60, height: 30}} color={this.state.EyeColor=='#65C6CF'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.EyeColor(e, '#7FB75E' )}} style={{backgroundColor:'#7FB75E', width: 60, height: 30}} color={this.state.EyeColor=='#7FB75E'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.EyeColor(e, '#2A4732' )}} style={{backgroundColor:'#2A4732', width: 60, height: 30}} color={this.state.EyeColor=='#2A4732'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.EyeColor(e, '#5F3D21' )}} style={{backgroundColor:'#5F3D21', width: 60, height: 30}} color={this.state.EyeColor=='#5F3D21'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.EyeColor(e, '#3A2C1C' )}} style={{backgroundColor:'#3A2C1C', width: 60, height: 30}} color={this.state.EyeColor=='#3A2C1C'?'black':''} floated='right' />
                          <Card onClick={(e) => {this.EyeColor(e, '#0F0B07' )}} style={{backgroundColor:'#0F0B07', width: 60, height: 30}} color={this.state.EyeColor=='#0F0B07'?'black':''} floated='right' />
                        </Card.Group>
                      </div>
                    </Form.Group>
                    <Form.Group >
                      <div className="field">
                        <label>Height</label>
                        <Button.Group>
                          <Button  size='tiny' onClick={this.cmminus.bind(this)} icon='minus' />
                          <Button  size='tiny' content={this.state.cm+" cm"} disabled />
                          <Button  size='tiny'  onClick={this.cmplus.bind(this)}  icon='plus' />
                        </Button.Group>
                      </div>
                      <div className="field">
                        <label>Weight</label>
                        <Button.Group>
                          <Button  size='tiny' onClick={this.kgminus.bind(this)} icon='minus' />
                          <Button  size='tiny' content={this.state.kg+" Kg"} disabled />
                          <Button  size='tiny' onClick={this.kgplus.bind(this)} icon='plus' />
                        </Button.Group>
                      </div>
                    </Form.Group>
                    <Form.Input label='City' onChange={this.selectCity.bind(this)} value={this.state.selectedCity}/>
                    <Form.Input label='Region' onChange={this.selectRegion.bind(this)} value={this.state.selectedRegion}/>
                      <div className="field">
                        <label>Known disease</label>
                      </div>
                      <div className="field">
                          {this.state.diseaselist.map(item => (
                          <ReactCSSTransitionGroup
                            transitionName="slide"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                            transitionAppear={true}
                            key={item['name']}
                          >
                            <div className=' border border-light rounded p-4 m-2 w-100'>
                              <a href='#' color="black">
                                <Header as='h3'>{item['name']}</Header>
                                {item['descr']}
                              </a>
                            </div>
                          </ReactCSSTransitionGroup>
                            ))}
                      </div>
                      <div className="field text-right">
                          <Modal open={this.state.diseaseModalOpen} onClose={this.diseaseModalClose.bind(this)} trigger={<Button onClick={this.diseaseModalOpen.bind(this)} color='black' size='mini' compact>Add disease</Button>}>
                            <Modal.Header>Please fill the following inputs</Modal.Header>
                            <Modal.Content >
                              <Container>
                                <Grid columns='equal'>
                                  <Grid.Column></Grid.Column>
                                  <Grid.Column width={10}>
                                    <Form fluid>
                                      <Form.Field fluid>
                                        <label>Disease name</label>
                                        <input onChange={this.diseaseName.bind(this)} value={this.state.diseaseName} fluid placeholder='Disease name' />
                                      </Form.Field>
                                      <Form.Field fluid>
                                        <label>Short description</label>
                                        <input onChange={this.diseaseDesc.bind(this)} value={this.state.diseaseDesc} fluid placeholder='Short description' />
                                      </Form.Field>
                                      <Button floated="right" onClick={this.validateDiseaseModal.bind(this)}>Add</Button>
                                    </Form>
                                  </Grid.Column>
                                  <Grid.Column></Grid.Column>
                                </Grid>
                              </Container>
                            </Modal.Content>
                          </Modal>
                      </div>
                      <div className="field">
                        <label>Additional informations</label>
                      </div>
                      <div className="field">
                          {this.state.attlist.map(item => (
                          <ReactCSSTransitionGroup
                            transitionName="slide"
                            transitionEnterTimeout={500}
                            transitionLeaveTimeout={500}
                            transitionAppear={true}
                            key={item['name']}
                          >
                            <div className=' border border-light rounded p-4 m-2 w-100'>
                              <a href='#' color="black">
                                <Header as='h3'>{item['name']}</Header>
                                {item['descr']}
                              </a>
                            </div>
                          </ReactCSSTransitionGroup>
                            ))}

                      </div>

                      <div className="field text-right">
                          <Modal open={this.state.attModalOpen} onClose={this.attModalClose.bind(this)} trigger={<Button onClick={this.attModalOpen.bind(this)} color='black' size='mini' compact>Add att</Button>}>
                            <Modal.Header>Please fill the following inputs</Modal.Header>
                            <Modal.Content >
                              <Container>
                                <Grid columns='equal'>
                                  <Grid.Column></Grid.Column>
                                  <Grid.Column width={10}>
                                    <Form fluid>
                                      <Form.Field fluid>
                                        <label>Disease name</label>
                                        <input onChange={this.attName.bind(this)} value={this.state.attName} fluid placeholder='Information name' />
                                      </Form.Field>
                                      <Form.Field fluid>
                                        <label>Short description</label>
                                        <input onChange={this.attDesc.bind(this)} value={this.state.attDesc} fluid placeholder='Short description' />
                                      </Form.Field>
                                      <Button floated="right" onClick={this.validateattModal.bind(this)}>Add</Button>
                                    </Form>
                                  </Grid.Column>
                                  <Grid.Column></Grid.Column>
                                </Grid>
                              </Container>
                            </Modal.Content>
                          </Modal>
                      </div>
                      <Button onClick={this.post.bind(this)}>Comfirm</Button>
                      
                  </Form>
                </Container>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment className='container-a'>
                <h4>Preview</h4>
                <Divider/>
                <Container>
                  <Card fluid textAlign='center'>
                    <Card.Content textAlign='center'>
                      <svg x="0px" y="0px" style={{height: '300px'}} viewBox="0 0 316 1080">
                        {this.state.selectedsex =='male'?
                          <g>
                            {this.state.imc<19?
                              <path fill={this.state.SkinColor}  d="M301.2,540c0.2-10.9-7-37.5-5.4-63.5c1.2-21.1,2.8-48.1,3-62.2c0.1-4.3-0.5-8.6-1.7-12.7
                            	c-2.9-9.5-4.6-23.7-2.9-33.7c1.9-10.7,3.7-63.2-1.4-75.3c-2.8-6.6-3.2-14.3-3.7-23.2c-0.7-13.2-1.6-28.2-10.6-42.8
                            	c-12.7-20.8-42-21.4-45.3-21.4c0,0-0.5,0-0.5,0c-0.8,0-1.7-0.1-2.5-0.4c-13.8-4.5-37.9-13.3-43.4-21.2c-1.4-2.1-3.1-5.5-3.9-13.6
                            	h0.1c-0.2-9.9,8-28.1,8-28.1c9.3-6.9,10.3-27.3,10.3-27.3s0.7,3.6,4.3,1.2c3.6-2.4,4.8-26.6,3.8-28.8c-0.9-2.1-5-1.4-5-1.4
                            	s5.7-31.6-4.1-47.9C190.3,21.4,167.1,19,158,19c-9.1,0-32.3,2.4-42.2,18.7c-9.8,16.3-4,48-4,48s-4-0.8-5,1.4s0.2,26.4,3.8,28.8
                            	c3.6,2.4,4.3-1.2,4.3-1.2s1,20.4,10.3,27.3c0,0,8.2,18.1,8,28h0.1c-0.8,8.1-2.5,11.6-3.9,13.7c-5.5,7.9-29.5,16.7-43.4,21.2
                            	c-0.8,0.3-1.7,0.4-2.5,0.4c-0.1,0-0.4,0-0.4,0c-3.3,0-32.6,0.6-45.5,21.4c-9,14.6-9.9,29.6-10.6,42.8c-0.5,8.9-0.9,16.6-3.7,23.2
                            	c-5.1,12.2-3.3,64.6-1.4,75.3c1.7,9.5,0.2,23-2.5,32.4c-1.5,5.5-2.2,11.2-2.1,16.9c0.3,14.5,1.8,39,2.9,58.4
                            	c1.5,26.4-5.6,53.3-5.4,64.3c-1.5,15.7-6.5,57.3-4.6,60.9c1.9,3.6,14.6,35.7,27.8,37.6c0,0,9.5,7,12.9,4.8c3.4-2.2-0.7-7-0.7-7
                            	s2.6,0.5,4.3-1.2c1.7-1.7-12.7-15.6-12.7-15.6s7.2,3.1,9.6,0.2c2.4-2.8-18.4-13.9-22-22c-3.6-8.1,1.2-13.4,1.2-13.4l6,2.9
                            	c0,0,5.7,19,9.8,19.2c4.1,0.3,6.8,0.3,3.4-22c0,0,4.8-16.6,1-24c-3.8-7.5-8.1-9.4-8.1-17.3c0-0.7,0.1-1.8,0.3-3.1
                            	c1.3-6,5.6-59.3,7.4-70.2c1.9-11,0.9-28.2,0.1-43.5c-1-18.6-1.5-28.5,1-34.1c3.5-8,7.7-27.4,7.9-40.5c0.3-13.4,3.7-35.9,9.3-43.4
                            	c2.4-3.2,5.4-3.7,7-3.7c2.4,0,8.1,1,8.7,10.1c0.1,1.9,0.1,4.4,0.2,7.5c0,9.5,0.1,25.5,4.4,36.6c10.7,28.1-0.6,75.3-1.1,77.3
                            	C84,452,71.6,538.8,70.4,569.5c-0.6,16.8,1.7,59.4,3.8,96.9c1.9,33.3,3.5,62,2.9,70.3c-0.4,5.7-1.5,12.1-2.8,19.4
                            	c-2.7,15.6-6.5,37.1-6.5,70c0,36,4.4,46.2,9.6,57.9c1.7,3.8,3.4,7.8,5.1,12.7c4.4,13,1.7,45.9,4.3,66.3c1,9.2,1.6,16.4,1.3,19.5
                            	c0,0-4.2,6.9-4.4,11c-0.2,4,0,9.1-1.4,14.1c-1.4,5-16,40.5-11.7,45.5s29.7,5.5,38.6,4.8c0,0,2.1,4,11,2.6c8.8-1.4,7.6-32.6,5-48.9
                            	c-2.7-16.3,5-20.4,2.6-30.7c-2.1-9.2-5.9-13.8-7.1-17.9c-0.9-16.3-11.3-64.4-5.9-86.6c6.1-25.3,4.7-62.4-0.5-77.5
                            	c-5.3-15.4-1.1-26,3.9-38.3c1.8-4.4,3.6-9,5.3-14.4c6.2-20.2,9.4-70.2,9.4-91.3c0-18.4,4.7-32.5,8.4-43.9c1.1-3.2,2.1-6.3,2.9-9.1
                            	l8.5-16.6c2.2-4.3,8.3-4.3,10.5,0l8.4,16.6c0.8,2.8,1.8,5.9,2.9,9.1c3.8,11.3,8.4,25.4,8.4,43.9c0,21.3,3.2,71.5,9.4,91.4
                            	c1.7,5.6,3.6,10.2,5.4,14.8c4.9,12.2,9.1,22.7,3.8,37.9c-5.2,15.1-6.5,52.2-0.5,77.5c5.2,22.1-5.3,84.4-5.8,86.6h0
                            	c-1.1,4.1-5,8.7-7.1,17.9c-2.4,10.3,5.2,14.4,2.6,30.7c-2.7,16.3-3.9,47.5,5,48.9c8.8,1.5,11-2.6,11-2.6c8.9,0.7,34.3,0.2,38.6-4.8
                            	c4.4-5-10.3-40.5-11.7-45.5c-1.5-5-1.2-10-1.4-14.1c-0.2-4.1-4.4-11-4.4-11c-0.2-3.1,0.3-10.3,1.4-19.5c4-13-0.1-53.2,4.3-66.3
                            	c1.7-4.9,3.4-8.9,5.1-12.7c5.1-11.8,9.6-21.9,9.6-58c0-32.9-3.7-54.3-6.5-70c-1.3-7.3-2.4-13.6-2.8-19.4c-0.6-8.3,1-37,2.9-70.3
                            	c2.1-37.6,4.5-80.1,3.8-97c-1.2-30.7-13.6-117.5-17.5-133.3c-4.2-16.8-9.9-54.7-1.1-77.4c4.2-11,4.3-27,4.4-36.5
                            	c0-3.1,0-5.6,0.2-7.5c0.6-9.1,6.3-10.1,8.7-10.1c1.6,0,4.6,0.5,7,3.7c5.7,7.6,9.1,30.5,9.3,43.5c0.2,13.1,4.4,32.5,7.9,40.4
                            	c2.6,5.7,2.1,15.8,1.1,34.6c-0.8,15.1-1.8,32.1,0,43c1.8,10.6,6.1,64.1,7.4,70.2c0.2,1.3,0.3,2.3,0.3,3c0,8-4.3,9.9-8.1,17.3
                            	c-3.8,7.5,1,24,1,24c-3.3,22.2-0.7,22.2,3.4,22c4-0.3,9.8-19.2,9.8-19.2l6-2.9c0,0,4.8,5.3,1.2,13.4c-3.5,8.1-24.4,19.1-22,22
                            	c2.4,2.9,9.6-0.2,9.6-0.2s-14.4,13.9-12.7,15.6s4.3,1.2,4.3,1.2s-4.1,4.8-0.7,7c3.3,2.1,12.9-4.8,12.9-4.8
                            	c13.2-1.9,25.9-34,27.8-37.6C307.7,597.2,302.7,555.8,301.2,540z"/>
                            :''}
                            {this.state.imc>35?
                              <path fill={this.state.SkinColor} d="M309.8,381.1c-0.7-5.2-2.5-80.5-9.4-97.4c-1.6-3.8-4-48.3-14.7-65.9c-15.6-26.1-47.5-28.3-55.7-28.5
                              	c-14.2-4.8-28.4-11.1-31.6-13.9c-1.3-3.4-9.8-11.8-9.3-27c0-0.1,0-0.2-0.2-0.4c0.1-2.1,0.2-3.4,0.2-3.4c0.3-0.2,0.6-0.5,0.9-0.8
                              	c8-7.3,8.8-25.6,8.8-25.6s0.7,3.5,4.1,1.2c3.4-2.3,4.5-25.7,3.6-27.8c-0.9-2-4.7-1.4-4.7-1.4s5.4-30.5-3.9-46.2
                              	c-9.4-15.7-31.3-18-39.9-18c-8.6,0-30.6,2.3-39.9,18c-9.3,15.7-3.8,46.3-3.8,46.3s-3.8-0.8-4.7,1.4s0.2,25.5,3.6,27.8
                              	c3.4,2.3,4.1-1.2,4.1-1.2s0.9,18.1,8.7,25.5c0.3,0.3,0.7,0.6,1,0.9c0,0,0.1,1.3,0.2,3.5c-0.2,0.1-0.3,0.2-0.2,0.4
                              	c0.6,15.1-8,23.5-9.3,26.9c-3.1,2.8-17.4,9.1-31.6,13.9c-8.4,0.2-40,2.5-55.7,28.4c-10.7,17.7-13.2,62.1-14.7,65.9
                              	c-6.9,16.9-8.7,89.6-9.1,93.9c-0.6,6.3,1.7,32.1,5,89.9c1.1,20.1,4.9,90.8,5.7,116c0,0.7,0.2,1.3,0.5,1.8c0.1,1,0.2,1.7,0.3,2
                              	c1.8,3.5,13.8,34.4,26.3,36.3c0,0,9,6.8,12.2,4.6c3.2-2.1-0.7-6.8-0.7-6.8s2.5,0.5,4.1-1.2c1.6-1.6-12-15-12-15s6.8,3,9.1,0.2
                              	c2.3-2.7-17.4-13.4-20.8-21.2c-3.4-7.8,1.1-12.9,1.1-12.9l5.7,2.8c0,0,5.4,18.3,9.3,18.5c3.9,0.3,6.4,0.3,3.2-21.2
                              	c0,0,4.5-16,0.9-23.2c-1.7-3.5-3.6-5.7-5-8c2.4-6.7,9.7-27.8,11.9-37c0.5-2,1-4.1,1.5-6.1c-1.3,10.6-2.6,21.1-3.6,30.5
                              	c-1.3,12.2-2.1,21.9-2.3,28.8c-0.6,17,1.6,58.4,3.6,95c1.6,28.9,3.2,58.8,2.7,65.8c-0.3,4.7-1.3,10.1-2.4,17
                              	c-2.7,15.7-6.4,37.1-6.4,70.3c0,38.2,5,50,10.4,62.4c1.5,3.4,3,6.9,4.4,11c2,5.9,10.6,31.2,19,56.1c0.2,1.4,0.3,2.7,0.4,3.9
                              	c0.9,8.2,1.3,14.6,1.1,17.4c0,0-4,6.7-4.2,10.6c-0.2,3.9,0,8.8-1.3,13.6c-1.3,4.8-15.1,39.1-11.1,43.9c4.1,4.8,28.1,5.3,36.5,4.6
                              	c0,0,2,3.9,10.4,2.5c8.3-1.4,7.2-31.4,4.7-47.2c-2.6-15.7,4.7-19.7,2.5-29.6c-1.8-7.8-4.8-12.2-6.2-15.8c-0.4-1-0.7-1.9-0.8-2.9
                              	c-0.2-1.9-0.9-12.5-1.2-26c1.2-12.5,7.2-34,11.6-52.3c3.2-13.4,7.9-66.4,11.6-116.9c7-24.9,10.5-56.1,12.2-78.7
                              	c0.5,28.7,6.9,50.5,14.2,66.2c3.9,54,9.1,115,12.5,129.4c4.8,19.8,10.5,44.1,11.6,53.3c-0.3,12.9-1,23-1.2,24.8
                              	c-0.1,0.9-0.4,1.9-0.8,2.9c-1.4,3.6-4.5,8-6.2,15.8c-2.3,9.9,4.9,13.9,2.5,29.6c-2.6,15.7-3.7,45.8,4.7,47.2
                              	c8.3,1.4,10.4-2.5,10.4-2.5c8.4,0.7,32.5,0.2,36.5-4.6c4.2-4.8-9.7-39.1-11.1-43.9c-1.4-4.8-1.1-9.6-1.3-13.6
                              	c-0.2-4-4.2-10.6-4.2-10.6c-0.2-2.8,0.2-9.2,1.1-17.4c0.2-2.2,0.5-4.4,0.8-6.8c0,0,0,0,0,0c0-0.3,0.1-0.6,0.1-1
                              	c0-0.3,0.1-0.7,0.1-1.1c2.7-19.5,14.3-39,18.4-51.2c1.4-4.1,2.9-7.6,4.3-11c5.4-12.5,10.4-24.3,10.4-62.5c0-33.2-3.7-54.6-6.4-70.3
                              	c-1.2-6.9-2.1-12.3-2.4-17c-0.5-7,1.1-36.8,2.7-65.7c2-36.6,4.3-78.1,3.6-95.1c-0.3-6.8-1-16.5-2.3-28.7c-1-9.6-2.3-20.3-3.6-31
                              	c0.5,2,0.9,3.9,1.4,5.8c1,4.2,7.1,17.5,14.4,32.4c-1,5.1-4.3,7.3-7.3,13.3c-3.6,7.2,0.9,23.2,0.9,23.2c-3.1,21.4-0.7,21.4,3.2,21.2
                              	c3.8-0.3,9.3-18.5,9.3-18.5l5.7-2.8c0,0,4.5,5.1,1.1,12.9c-3.3,7.8-23.1,18.4-20.8,21.2c2.3,2.8,9.1-0.2,9.1-0.2s-13.6,13.4-12,15
                              	c1.6,1.6,4.1,1.2,4.1,1.2s-3.9,4.6-0.7,6.8c3.1,2,12.2-4.6,12.2-4.6c11.7-1.7,22.9-28.8,25.8-35.2c0.1-0.3,0.3-0.5,0.4-0.8
                              	c0-0.1,0.1-0.2,0.1-0.2c0.1-0.1,0.1-0.3,0.2-0.5c0.7-2.1,1.2-4.8,1.9-6.6c0.5-1.3,2.2-51.2,2.1-52.6l0-0.2c-0.6-6.2,1-34.3,2.5-59.2
                              	C307.8,409.9,310.5,386.3,309.8,381.1z M244.1,410.5c-3.1-15.7-6.8-32.7-8.4-39.6c0.3-2.2,0.6-4.2,1.1-6.2c1.7,11,4.6,21.8,7.2,28
                              	C244.7,395,244.5,402.7,244.1,410.5z M72,392.7c2.6-6,5.4-16.9,7.2-27.8c0.9,3.7,1.4,7.9,1.6,12.3c-2.4,9.5-6.1,24-8.8,34.5
                              	C71.6,403.5,71.3,395.1,72,392.7z"/>
                            :''}
                            {this.state.imc>19 && this.state.imc<35?
                        <path fill={this.state.SkinColor} d="M9.9,403.4c3.1-6.9,6-23.2,4.1-34c-1.9-10.8-4.1-65.4,1.9-79.8c6-14.4-1.2-41,14.9-67.1
                          c16.1-26.1,52.7-25.2,52.7-25.2s34.5-11.3,39.3-18.2c4.8-6.9,2.4-37.1,2.4-37.1c-9.3-6.9-10.3-27.3-10.3-27.3s-0.7,3.6-4.3,1.2
                          c-3.6-2.4-4.8-26.6-3.8-28.8c1-2.2,5-1.4,5-1.4S106,54,115.8,37.7C125.7,21.4,148.9,19,158,19c9.1,0,32.3,2.4,42.2,18.7
                          c9.8,16.3,4.1,47.9,4.1,47.9s4.1-0.7,5,1.4c1,2.2-0.2,26.4-3.8,28.8c-3.6,2.4-4.3-1.2-4.3-1.2s-1,20.4-10.3,27.3
                          c0,0-2.4,30.2,2.4,37.1c4.8,6.9,39.3,18.2,39.3,18.2s36.7-1,52.7,25.2c16.1,26.1,8.9,52.7,14.9,67.1c6,14.4,3.8,69,1.9,79.8
                          c-1.9,10.8,1,27.1,4.1,34c3.1,6.9-6.5,120.8-5,136.4c1.4,15.6,6.5,57.5,4.6,61.1c-1.9,3.6-14.6,35.7-27.8,37.6
                          c0,0-9.6,6.9-12.9,4.8c-3.4-2.2,0.7-7,0.7-7s-2.6,0.5-4.3-1.2c-1.7-1.7,12.7-15.6,12.7-15.6s-7.2,3.1-9.6,0.2
                          c-2.4-2.9,18.5-13.9,22-22c3.6-8.1-1.2-13.4-1.2-13.4l-6,2.9c0,0-5.8,18.9-9.8,19.2c-4.1,0.2-6.7,0.2-3.4-22c0,0-4.8-16.5-1-24
                          c3.8-7.4,8.1-9.3,8.1-17.3c0-7.9-11.7-49.1-15.6-71.9c-3.8-22.8,3.4-67.1-0.5-75.7c-3.8-8.6-8.4-29-8.6-43.6
                          c-0.2-14.6-4.1-34-7.7-38.8c-3.6-4.8,1.6,27.8-6.4,48.6c-8,20.8-2.5,57,1.4,72.6c3.8,15.6,16.5,103,17.7,134.9
                          c1.2,31.9-7.9,150-6.7,167c1.2,17,9.3,41,9.3,89.9c0,48.9-8.1,53-15.1,73.3c-6.9,20.4-13.9,73.3-13.2,83.2c0,0,4.2,6.9,4.4,11
                          c0.2,4.1-0.1,9.1,1.4,14.1c1.4,5,16.1,40.5,11.7,45.5c-4.3,5-29.7,5.5-38.6,4.8c0,0-2.2,4.1-11,2.6c-8.9-1.4-7.7-32.6-5-48.9
                          c2.6-16.3-5-20.4-2.6-30.7c2.4-10.3,7-14.9,7.4-19.4c0.5-4.6,4.1-57.5-2.2-83.2c-6.2-25.6-5.3-64.7,0.7-82
                          c6-17.3-2.9-26.8-9.3-47.7c-6.5-20.8-9.8-71.4-9.8-93.7c0-22.3-7.4-37.9-11-50.8c-3.6-12.9-3.1-31.6-3.1-31.6l-2.9-1.2l-2.9,1.2
                          c0,0,0.5,18.7-3.1,31.6c-3.6,12.9-11,28.5-11,50.8c0,22.3-3.4,72.9-9.8,93.7c-6.5,20.8-15.3,30.4-9.3,47.7
                          c6,17.3,6.9,56.3,0.7,82c-6.2,25.6-2.6,78.6-2.2,83.2c0.5,4.6,5,9.1,7.4,19.4c2.4,10.3-5.3,14.4-2.6,30.7
                          c2.6,16.3,3.8,47.5-5,48.9c-8.9,1.4-11-2.6-11-2.6c-8.9,0.7-34.3,0.2-38.6-4.8c-4.3-5,10.3-40.5,11.7-45.5
                          c1.4-5,1.2-10.1,1.4-14.1c0.2-4.1,4.4-11,4.4-11c0.7-9.8-6.2-62.8-13.2-83.2C67.9,879,59.8,875,59.8,826.1
                          c0-48.9,8.1-72.9,9.3-89.9c1.2-17-7.9-135.2-6.7-167c1.2-31.9,13.9-119.3,17.7-134.9c3.8-15.6,9.3-51.8,1.4-72.6
                          c-8-20.8-2.8-53.4-6.4-48.6c-3.6,4.8-7.4,24.2-7.7,38.8c-0.2,14.6-4.8,35-8.6,43.6c-3.8,8.6,3.4,53-0.5,75.7
                          c-3.8,22.8-15.6,64-15.6,71.9c0,7.9,4.3,9.8,8.1,17.3c3.8,7.4-1,24-1,24c3.4,22.3,0.7,22.3-3.4,22c-4.1-0.2-9.8-19.2-9.8-19.2
                          l-6-2.9c0,0-4.8,5.3-1.2,13.4s24.4,19.2,22,22c-2.4,2.9-9.6-0.2-9.6-0.2s14.4,13.9,12.7,15.6c-1.7,1.7-4.3,1.2-4.3,1.2
                          s4.1,4.8,0.7,7c-3.4,2.2-12.9-4.8-12.9-4.8c-13.2-1.9-25.9-34-27.8-37.6c-1.9-3.6,3.1-45.5,4.6-61.1
                          C16.4,524.2,6.8,410.3,9.9,403.4z"/>: ''
                          }
                            <path fill={this.state.HairColor}  d="M164.2,13.7h-12.2c-14.9,0-44.3,20.3-42.3,44l2.2,27.6c0,0,3.9,7.2,3.9,12.8l7.7-25.6l2.4-13.2
                              c1.8-6.8,7.5-11.6,14.3-11.9l18-0.8l18,0.8c6.7,0.3,12.5,5.1,14.3,11.9l2.4,13.2l7.7,25.6c0-5.5,3.9-12.8,3.9-12.8l2.2-27.6
                              C208.4,34,179,13.7,164.2,13.7z"/>
                          </g>
                        :
                          <g>
                            {this.state.imc<19?<path fill={this.state.SkinColor} d="M23.1,537.1c0,0,5.3-14.5,4.3-76.8c-1-62.3,4.8-73.9,7.2-85.9c2.4-12.1,6.3-53.1,8.7-101.4
                              c2.4-48.3,7.7-48.3,14-59.9c6.3-11.6,54.5-22.7,61.3-25.6c6.8-2.9,15-9.2,15.9-14.5c0.9-5.3,0-30.4,0-30.4
                              c-13.6-12.6-15-33.1-15-33.1c-4.8,0.3-5.3-7.5-5.4-10.1c-0.2-2.6-3.4-14.1-3.2-19.9c0.2-5.8,7.3-3.7,7.3-3.7
                              c0-45.4,23.5-49.9,39.9-49.9c16.4,0,39.9,4.5,39.9,49.9c0,0,7.1-2,7.3,3.7c0.2,5.8-3,17.3-3.2,19.9c-0.2,2.6-0.6,10.4-5.4,10.1
                              c0,0-1.4,20.5-14.9,33.1c0,0-0.9,25.1,0,30.4c0.9,5.3,9.1,11.6,15.9,14.5c6.8,2.9,55,14,61.3,25.6c6.3,11.6,11.6,11.6,14,59.9
                              c2.4,48.3,6.3,89.3,8.7,101.4c2.4,12.1,8.2,23.7,7.2,85.9c-1,62.3,4.3,76.8,4.3,76.8s8.7,43.4,3.9,53.6
                              c-4.8,10.1-10.6,17.4-13.5,16.9c-2.9-0.5-1.4-5.8-1.4-5.8s-12.1,7.8-15,5.8c-2.9-2-3.9-0.5-6.3-3.9c-2.4-3.4,1.9-6.8,1.9-6.8
                              s-2.9-1-4.8-3.4c-1.9-2.4,13.5-11.1,13.5-23.2c0-12.1-2.4-25.6,1.4-39.6c3.9-14-17.4-54.1-20.8-96.5c-3.4-42.5,1-42-2.4-56
                              c-3.4-14-17.9-63.7-17.9-80.6c0-0.7,0-1.3,0-1.9c0,0-3.9,23.7-10.1,30.9c-6.3,7.2-9.7,53.6-7.7,59.4c1.9,5.8,37.2,84.5,36.7,136.1
                              c-0.5,51.7-23.6,148.2-22.4,165.1c1.2,16.9,7.4,68.1,7.9,109.6c0.5,41.5-28,139-27,182c1,43,17.4,70.5,12.5,78.2
                              c-4.8,7.7-20.3,12.5-25.6,12.5c0,0-3.9,4.8-10.6,2.9c-6.8-1.9-8.7-18.3-7.2-36.2c1.4-17.9,1-41.5-2.4-51.7
                              c-3.4-10.1,12.1-23.7,9.7-39.6c-2.4-15.9,2.9-28.5-3.9-71c-6.8-42.5-5.3-85.4-1-106.2c4.3-20.8-5.3-66.1-9.2-79.6
                              c-3.9-13.5-13.4-113.4-13.4-113.4s-9.6,99.9-13.4,113.4c-3.9,13.5-13.5,58.9-9.2,79.6c4.3,20.8,5.8,63.7-1,106.2
                              c-6.8,42.5-1.4,55-3.9,71c-2.4,15.9,13,29.4,9.7,39.6c-3.4,10.1-3.9,33.8-2.4,51.7c1.4,17.9-0.5,34.3-7.2,36.2
                              c-6.8,1.9-10.6-2.9-10.6-2.9c-5.3,0-20.8-4.8-25.6-12.5c-4.8-7.7,11.6-35.2,12.6-78.2c1-43-27.5-140.5-27-182
                              c0.5-41.5,6.8-92.7,7.9-109.6c1.2-16.9-21.9-113.4-22.4-165.1c-0.5-51.7,34.8-130.3,36.7-136.1c1.9-5.8-1.4-52.1-7.7-59.4
                              c-6.3-7.2-10.1-30.9-10.1-30.9c0,0.6,0,1.2,0,1.9c0,16.9-14.5,66.6-17.9,80.6c-3.4,14,1,13.5-2.4,56c-3.4,42.5-24.6,82.5-20.8,96.5
                              c3.9,14,1.4,27.5,1.4,39.6c0,12.1,15.4,20.8,13.5,23.2c-1.9,2.4-4.8,3.4-4.8,3.4s4.3,3.4,1.9,6.8c-2.4,3.4-3.4,1.9-6.3,3.9
                              c-2.9,2-15-5.8-15-5.8s1.4,5.3-1.4,5.8c-2.9,0.5-8.7-6.8-13.5-16.9C14.4,580.5,23.1,537.1,23.1,537.1z"/>:''}

                            {this.state.imc>19 && this.state.imc<30?
                            <path fill={this.state.SkinColor}   d="M295.1,536.9c0,0-0.9-2.5-1.9-9.9c0-0.3-0.1-0.5-0.1-0.8c0.1-21.5,1.2-39.4,1.6-67c0.8-53.9-3.3-71-6.1-82.3
                            c-0.5-2.1-0.9-3.8-1.3-5.6c-2.4-11.9-6.3-53.3-8.7-102.1c-2.1-42.2-6.4-49-11.8-57.6c-0.9-1.5-1.9-3-2.8-4.7
                            c-5.2-9.6-29.4-17.4-53.8-24.5c-4.8-1.4-8.9-2.6-10.3-3.2c-6.6-2.8-13.2-8.4-13.7-11.7c-0.5-2.9-3.4-20.4-4.1-26.4
                            c0.1-2.3,0.1-3.7,0.1-3.7c0.4-0.4,0.9-0.8,1.3-1.3c12.5-12.8,13.9-32.3,13.9-32.3c4.9,0.3,5.4-7.6,5.5-10.2
                            c0.2-2.6,3.4-14.3,3.2-20.1c-0.2-5.8-7.4-3.8-7.4-3.8c0-46-23.8-50.6-40.5-50.6c-16.6,0-40.5,4.6-40.5,50.6c0,0-7.2-2.1-7.4,3.8
                            c-0.2,5.8,3.1,17.5,3.2,20.1c0.2,2.6,0.7,10.6,5.5,10.2c0,0,1.3,19.5,13.9,32.3c0.4,0.4,0.8,0.8,1.3,1.3c0,0,0.1,1.4,0.1,3.7
                            c-0.6,6.1-3.6,23.5-4.1,26.4c-0.6,3.3-7.1,8.8-13.7,11.7c-1.4,0.6-5.5,1.8-10.3,3.2c-24.4,7.1-48.6,14.9-53.8,24.5
                            c-1,1.8-1.9,3.3-2.8,4.7c-5.4,8.6-9.7,15.5-11.8,57.6c-2.4,48.8-6.4,90.3-8.7,102.1c-0.4,1.8-0.8,3.6-1.3,5.6
                            c-2.8,11.3-6.9,28.4-6.1,82.3c0.6,36.7-1.3,79.4-2.7,89.8c0,0.1,0.1,0.1,0.1,0.1c-2.2,13.8-5,35.3-1.7,42.1
                            c4.9,10.3,10.8,17.6,13.7,17.1c2.9-0.5,1.5-5.9,1.5-5.9s12.2,7.9,15.2,5.9c2.9-2,3.9-0.5,6.4-3.9c2.4-3.4-2-6.8-2-6.8s2.9-1,4.9-3.4
                            c2-2.4-13.7-11.2-13.7-23.5c0-9.9,1.6-20.8,0.1-32.1c1.4-10.9,6-31.9,9.3-42.7c5.5-17.8,12.3-39.9,14.1-62.8
                            c1.8-23,1.4-33.8,1.2-40.9c-0.2-6.1-0.3-9.1,1.2-15.3c0.7-3,2-7.9,3.5-13.6c3.4-12.8,7.8-29.3,10.9-43.7c2.2,5.9,5.7,11.1,10.1,15.3
                            c3.3,14.9,5.4,42.9,4,47.5c-0.2,0.6-1,2.6-2.1,5.2c-5.9,14.4-11.1,28.1-15.5,40.9c-13,19.5-21.3,50.5-21.2,85.5
                            c0,12.2,1.1,24,3.1,34.9c2.8,27.8,8.6,60.5,13.4,87.9c4.3,24.4,8,45.4,7.6,51.9c-0.3,4.6-1,11.6-1.9,20.5
                            c-2.3,23.9-5.8,59.9-6.2,90.8c-0.2,21,6.4,54.6,13.5,90.2c6.2,31.2,16.3,81.1,17.4,103.4c-2.8,38.3-16.8,62.8-12.3,70.1
                            c4.9,7.8,20.5,12.7,25.9,12.7c0,0,3.9,4.9,10.8,2.9c6.8-2,8.8-18.6,7.3-36.7c-1.5-18.1-1-42.1,2.4-52.3c0.3-1,0.5-2,0.5-3.1
                            c0.2-0.1,0.4-0.2,0.3-0.3c-0.4-0.8-0.9-14.3-1.3-15.2c-3.2-6.7-6.5-13.7-5.4-20.9c1-6.4,0.8-12.4,0.5-19.2
                            c-0.4-11.6-0.9-26.1,3.4-52.6c6.7-42.3,5.6-86.9,0.9-109.1c-4.2-20.3,5.4-65.5,9.2-78.8c2.4-8.2,6.6-45.9,9.8-76
                            c3.2,30.2,7.4,67.8,9.8,76c3.8,13.3,13.5,58.5,9.2,78.8c-4.6,22.1-5.8,66.7,0.9,109.1c4.2,26.5,3.7,41,3.4,52.6
                            c-0.2,6.9-0.4,12.8,0.5,19.2c1.1,7.3-2.2,14.2-5.4,20.9c-0.4,0.9-1.3,13.4-1.7,14.2c-0.1,0.1,0.2,0.3,0.7,0.5
                            c-0.1,1.3,0.1,2.6,0.5,3.8c3.4,10.3,3.9,34.2,2.4,52.3c-1.5,18.1,0.5,34.7,7.3,36.7c6.8,2,10.8-2.9,10.8-2.9c5.4,0,21-4.9,25.9-12.7
                            c4.7-7.5-10.2-33.1-12.5-73.1c1.8-23.5,11.7-70.5,17.6-100.4c7.1-35.6,13.8-69.2,13.5-90.2c-0.4-30.9-3.9-66.9-6.2-90.8
                            c-0.9-8.9-1.5-15.9-1.9-20.5c-0.4-6.5,3.3-27.5,7.6-51.9c5.1-28.8,11.2-63.4,13.8-92.1c1.5-9.9,2.3-20.5,2.3-31.4
                            c-0.1-33.4-7.9-63.2-20.1-82.8c-4.6-13.4-10-27.7-16.2-42.9c-1-2.6-1.9-4.6-2.1-5.2c-1.4-4.7,0.8-33.2,4.1-48
                            c4.4-4.3,7.7-9.6,9.9-15.6c3.1,14.5,7.6,31.4,11,44.4c1.5,5.6,2.8,10.5,3.5,13.6c1.5,6.1,1.4,9.2,1.2,15.3
                            c-0.3,7.1-0.6,17.8,1.2,40.9c1.8,22.9,8.6,45,14.1,62.8c3,9.8,7.8,23.5,10,38.7c-2.5,12.8-0.5,25-0.5,36.1c0,12.2-15.7,21-13.7,23.5
                            c2,2.4,4.9,3.4,4.9,3.4s-4.4,3.4-2,6.8c2.4,3.4,3.4,2,6.4,3.9c2.9,2,15.2-5.9,15.2-5.9s-1.5,5.4,1.5,5.9c2.9,0.5,8.8-6.8,13.7-17.1
                            C303.9,580.9,295.1,536.9,295.1,536.9z"/>
                          :''}
                          {this.state.imc>30?
                            <path fill={this.state.SkinColor}  d="M189.2,1038c-1.7,0-3.4-0.2-5.1-0.7c-12.9-3.5-13.9-24.8-12.4-42c1.6-18.6,0.7-39.4-2.1-47.3
                              	c-0.3-1-0.6-2-0.7-3c-0.2-0.3-0.3-0.6-0.4-0.9l-1-2.6l0.9-1.8c0.2-1.1,0.4-3.5,0.6-5.2c0.7-6.8,0.8-7.8,1.5-9.2
                              	c2.9-5.8,5.6-11.2,4.8-16.1c-1.1-6.7-0.9-13-0.6-19.6c0.4-10.8,0.8-24.3-3.3-49c-6.9-41.2-5.6-84.8-0.9-106.5
                              	c3.7-17.1-4.9-57.9-9.1-72c-0.8-2.7-1.8-8.2-3-16.6c-1.2,8.4-2.2,13.9-3,16.6c-4.2,14.1-12.9,54.9-9.1,72c4.8,21.7,6,65.3-0.9,106.5
                              	c-4.1,24.7-3.6,38.2-3.3,49c0.2,6.6,0.4,12.8-0.6,19.6c-0.8,4.9,1.9,10.4,4.8,16.1c0.8,1.5,0.9,2.8,1.3,9.9c0.1,2,0.3,5.1,0.4,6
                              	c0.3,1.3,0.2,2.7-0.3,4c-0.1,1-0.4,2-0.7,2.9c-2.8,7.9-3.7,28.7-2.1,47.3c1.5,17.2,0.5,38.5-12.4,42c-1.7,0.5-3.4,0.7-5.1,0.7
                              	c-4.8,0-8.3-1.8-10.5-3.5c-8.5-1.1-23.2-6.3-28.9-15.1c-3.8-5.8-1.6-13.5,2.1-26.2c3.2-11,7.6-26.1,9.1-44.3
                              	c-1.2-20-10.4-64.1-16.4-93.3l-0.8-4c-7.1-34.3-13.9-66.8-13.6-87.5c0.4-29.8,3.9-64.3,6.2-87.2c0.9-8.4,1.5-15.1,1.8-19.4
                              	c0.4-5.4-3.6-27-7.5-47.9c-2.1-11.5-4.5-24.2-6.7-37.1c-0.1,0.1-0.3,0.3-0.4,0.4c0.7,2.7,0.3,5.7-1.7,8.5c-2.7,3.6-5.2,4.5-7.4,5.1
                              	c-0.5,0.1-0.6,0.2-0.8,0.3c-1.5,1-3.2,1.4-5.2,1.4c-2.8,0-6.2-1.1-9.5-2.6c-1.3,1.2-2.9,1.9-4.7,2.2c-0.5,0.1-1,0.1-1.4,0.1
                              	c-8,0-15.1-11-19.7-20.2c-1.3-2.6-4.6-9.3,0.9-42.8c0-0.4,0-0.9,0.1-1.3c1.4-10,3.2-50.8,2.7-84.7c-0.8-52.3,3.5-69.1,6.3-80.2
                              	c0.5-1.9,0.9-3.5,1.2-5.1c2.3-11.1,6.2-50.2,8.6-96.5c2.1-40,6.3-48.2,12.9-58.2c0.9-1.4,1.8-2.7,2.6-4.2c5.9-10.4,25-17.4,58-26.6
                              	c3.8-1,8.4-2.4,9.5-2.8c4.8-2,8.7-5.3,9.7-6.6c0.8-4.5,7.2-18.4,7.7-23.8c0-0.1,0-0.3,0-0.4c-8.6-10-11.7-23.2-12.8-30
                              	c-2.6-2-4.9-6.1-5.4-14.2c-0.1-0.5-0.4-2.5-0.8-4.1c-1-5-2.2-11.3-2.1-15.7c0.1-4.9,2.7-8.5,6.6-9.9c0.9-18.1,5.7-31.3,14.2-39.3
                              	c8.9-8.3,19.8-9.3,27.2-9.3c7.4,0,18.3,1,27.2,9.3c8.6,8,13.3,21.2,14.2,39.3c3.9,1.4,6.5,5,6.6,9.9c0.1,4.5-1.1,10.7-2.1,15.7
                              	c-0.3,1.6-0.7,3.6-0.8,4.2c-0.5,8.1-2.8,12.2-5.4,14.2c-1.1,6.8-4.1,20-12.8,30c0,0.1,0,0.3,0,0.4c0.6,5.5,6.9,19.3,7.7,23.8
                              	c0.9,1.4,4.9,4.7,9.7,6.6c1,0.4,5.7,1.7,9.5,2.8c33,9.2,52.1,16.2,58,26.6c0.8,1.5,1.7,2.8,2.6,4.1c6.6,10.1,10.8,18.3,12.9,58.2
                              	c2.4,46.3,6.3,85.4,8.6,96.5c0.3,1.6,0.7,3.2,1.2,5c2.9,11.2,7.2,28,6.3,80.3c-0.2,12.4-0.5,22.5-0.9,32.3
                              	c-0.4,10.5-0.7,20.4-0.8,31.1l0,0.3c0.8,5.4,1.5,7.7,1.6,8.1l0.2,0.5l0,0.4c2.2,10.4,8.8,45.1,3.4,56c-4.6,9.2-11.7,20.2-19.7,20.2
                              	l0,0c-0.5,0-1,0-1.4-0.1c-1.8-0.3-3.4-1-4.7-2.2c-3.3,1.5-6.7,2.6-9.5,2.6c-2,0-3.7-0.5-5.2-1.4c-0.2-0.2-0.3-0.2-0.8-0.3
                              	c-2.2-0.6-4.7-1.5-7.4-5.1c-2-2.7-2.4-5.7-1.7-8.5c-0.1-0.1-0.3-0.3-0.4-0.4c-2.2,12.9-4.6,25.6-6.7,37.1
                              	c-3.9,20.9-7.9,42.5-7.5,47.9c0.3,4.3,1,11.3,1.8,19.4c2.3,22.9,5.8,57.5,6.2,87.2c0.3,20.7-6.5,53.2-13.6,87.5
                              	c-0.8,3.6-1.6,7.5-2.4,11.5c-5.7,26.9-13.4,63.7-15.1,83.1c1.2,19.5,5.9,35.4,9.2,47c3.7,12.7,5.9,20.4,2.1,26.2
                              	c-5.7,8.8-20.5,14-28.9,15.1C197.5,1036.2,194,1038,189.2,1038z M261.7,521.4c-1.1,11.8-2.9,24.7-5,37.7c0.4-0.4,0.8-0.8,1.1-1.1
                              	c3.5-3.4,8.2-8.1,8.2-12.7c0-3-0.2-6.1-0.3-9.4c-0.4-7.6-0.9-16.3,0.8-25.2c-0.7-4.3-1.6-8.4-2.6-12.4
                              	C263.6,506.1,262.9,513.9,261.7,521.4z M50.5,514.7c0.9,7.5,0.5,14.8,0.2,21.2c-0.2,3.3-0.4,6.4-0.4,9.4c0,4.6,4.8,9.3,8.2,12.7
                              	c0.4,0.4,0.7,0.7,1.1,1.1c-1.8-11.5-3.4-23-4.6-33.6c-1.3-7-2.2-14.2-2.7-21.5C51.6,507.9,51,511.6,50.5,514.7z M225.4,363.8
                              	c0.3,0.7,1,2.4,1.7,4l0.1,0.3c5.5,12.7,10.4,25,14.6,36.6c-1-15.8-0.7-24.2-0.5-30c0.2-5.7,0.3-7.8-1-12.8c-0.7-2.8-2-7.4-3.5-12.8
                              	c-2.1-7.6-4.8-17.1-7.2-26.5c-0.2,0.2-0.3,0.4-0.5,0.5C226.2,337.2,224.6,359.6,225.4,363.8z M86.6,322.9c-2.4,9.3-5,18.6-7.1,26.2
                              	c-1.5,5.4-2.8,10-3.5,12.8c-1.3,5-1.2,7.1-1,12.8c0.2,5.8,0.5,14.2-0.5,30c4.2-11.5,9.1-23.8,14.6-36.6c0.7-1.7,1.5-3.6,1.8-4.3
                              	c0.7-4.1-0.8-26.1-3.7-40.2C87.1,323.4,86.9,323.1,86.6,322.9z"/>
                              : ''}
                              <path fill={this.state.HairColor} d="M211,165c-6-18-2-88-2-88l-0.2-0.1C209,75,209,74,209,74l-0.4-0.3l0,0v-4.1c0-14.6-2.3-26.8-6.8-36.1
                                c-1.9-3.9-4.3-7.5-7-10.5c-11.3-12.6-26.4-11-36.7-11c-10.3,0-25.3-1.5-36.7,11c-2.7,3-5.1,6.5-7,10.5c-4.5,9.3-6.8,21.5-6.8,36.1
                                v1.9c-0.1,1.6-0.2,3.4-0.2,5.2c0,0,3.5,70.3-2.5,88.3s-16,19-16,19h25.5c1.7-0.5,2.9-0.9,3.7-1.3c6.8-2.9,15.2-9.3,16.1-14.7
                                c0.6-3.7,0.4-16.8,0.2-24.7c-0.1-3.6-0.2-6.1-0.2-6.1c-13.7-12.7-15.2-33.5-15.2-33.5c-4.9,0.3-5.4-7.6-5.5-10.2
                                c-0.1-2.4-2.9-12.4-3.2-18.6c0-0.2,0-0.5,0-0.7c0-0.3,0-0.6,0-0.9c0.1-2.2,1.1-3.3,2.4-3.8c1.1-0.4,2.3-0.4,3.3-0.3
                                c0.2,0.3,0.4,0.6,0.6,0.9c0.1-0.1,0.2-0.1,0.3-0.2l3.2,6.4c0-0.1,0-0.2,0-0.3c0.2-1.5,0.5-3.1,0.7-5c0.1-1,0.3-1.9,0.4-2.9
                                c1.1-7.6,2.4-15.8,2.6-16.5l-0.3,0.6c0.6-2,1.5-5.3,2.2-8.2c0.8-3,3.9-4.9,6.9-4.2c1.2,0.3,2.7,0.8,4.3,1.5
                                c13.3,5.3,28.1,5.2,41.4,0c2.1-0.8,3.9-1.4,5-1.7c3-0.7,6.1,1.2,6.8,4.2c0.7,2.7,1.4,5.3,2.2,7.8l0,0c0.2,0.5,1,5.8,1.9,11.7
                                c0.3,1.7,0.5,3.4,0.8,5.1c0.1,0.9,0.3,1.7,0.4,2.5c0.3,1.8,0.5,3.5,0.7,5c0.1,0.5,0.1,1,0.2,1.4c0.6-1.2,1.3-2.6,2-3.8
                                c0.2-0.9,0.5-1.8,0.9-2.6c0.1-0.3,0.3-0.5,0.4-0.8c0.2-0.4,0.5-0.7,0.8-1.1c0.1,0,0.2,0,0.3,0c0.1-0.2,0.2-0.3,0.2-0.3l0.1,0.3
                                c0.5,0,1,0,1.5,0.1c0.4,0.1,0.7,0.1,1.1,0.3c0.9,0.3,1.6,0.9,2.1,2c0.2,0.5,0.3,1.1,0.3,1.8c0,0.3,0,0.6,0,0.9c0,0.3,0,0.6,0,0.9
                                c-0.4,6.2-3,16-3.2,18.3c-0.2,2.6-0.7,10.6-5.5,10.2c0,0-1.4,20.8-15.1,33.5c0,0-0.1,1.6-0.1,4c-0.2,7.4-0.6,22.8,0.1,26.8
                                c0.9,5.4,9.2,11.7,16.1,14.7c0.8,0.3,2,0.7,3.7,1.3H227C227,184,217,183,211,165z"/>
                              <path fill={this.state.HairColor} d="M121,71c0,0-4,21-2,40s-11.2-28.5-11.2-28.5S112,67,114,58S121,71,121,71z"/>
                              <path fill={this.state.HairColor} d="M195.8,71c0,0,4,21,2,40S208,82.5,208,82.5S204.8,67,202.8,58S195.8,71,195.8,71z"/>
                          </g>
                        }
                    </svg>
                    </Card.Content>
                  </Card>
                </Container>
              </Segment>
            </Grid.Column>
          </Grid>
        )
    }
  }
}


ReactDOM.render(<AddSequence />, document.getElementById('SeqAdd'));
