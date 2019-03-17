import React from 'react';
import ReactDOM from 'react-dom';
import { Modal,Button,Icon,Label,Segment,Container, Divider,Flag,Header,Image,Form, Grid, Menu, Reveal,Input,Select,Dimmer,Loader,Placeholder    } from 'semantic-ui-react';

const colorsA = ['red', 'orange', 'yellow', 'olive', 'green', 'teal']

class Navbar extends React.Component {
  constructor(props) {
    super(props)
    this.InputChange = this.InputChange.bind(this)
    this.showInput = this.showInput.bind(this)
    this.hideInput = this.hideInput.bind(this)
    this.state = { cc: 'Search',show: false, activeA: colorsA[0] }
    this.handleAClickNavBar = this.handleAClickNavBar.bind(this)
  }


  handleAClickNavBar(e, { name }){
    this.setState({ activeA: name })
  }


  showInput() {
    console.log("Change...")
    this.setState({ show: true });
  };

    hideInput() {
      this.setState({ show: false });
    };

    InputChange() {
      console.log("Change...")
    };

  render() {
    const { activeA } = this.state
    return (
      <Menu inverted>
        {colorsA.map(c => (
          <Menu.Item
            key={c}
            name={c}
            active={activeA === c}
            color={c}
            onClick={this.handleAClickNavBar}
          />
        ))}
      </Menu>
    )
  }
}
