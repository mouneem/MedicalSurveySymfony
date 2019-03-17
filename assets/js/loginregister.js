import React from 'react';
import ReactDOM from 'react-dom';
import { Component } from 'react';
import {findDOMNode} from 'react-dom';
import WOW from "wowjs";
import { TransitionGroup  } from 'react-transition-group'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

import '../css/animate.min.css';


export class AppLogin extends React.Component {
    constructor(props) {
      super(props);
        this.checkLoginPassword = this.checkLoginPassword.bind(this);
        this.showregister = this.showregister.bind(this);
        this.showlogin = this.showlogin.bind(this);
        this.showbutton = this.showbutton.bind(this);
        this.state = {
            LoginPasswordMessage: "",
            display: "",
        };

    }

    showlogin() {
      if (this.state.display == "" | this.state.display == "login") {
        this.setState({display: "register"});
      }
      else {
        this.setState({display: ""});
      }
    }

    showbutton() {
        this.setState({display: ""});
    }

    showregister() {
      if (this.state.display == "" | this.state.display == "register") {
        this.setState({display: "login"});
      }
      else {
        this.setState({display: ""});
      }
    }

    checkLoginPassword(event) {
      if (event.target.value.length< 6) {
        this.setState({LoginPasswordMessage: "Password too short" });
      }
      else {
        this.setState({LoginPasswordMessage: "" });

      }
    }


    render() {
      if (this.state.display == "") {
        return (
          <div>
            <ReactCSSTransitionGroup
              transitionName="fade"
              transitionAppear={true}
              transitionAppearTimeout={200}
              transitionEnter={false}
              transitionLeave={false}>
            <div className=" card mt-2">
            <div className={this.state.butttonsDisplay}>
              <div className="row w-100">
                <div onClick={this.showregister}  className="col-md-6 login-block">
                  <img src="/img/option-1.jpg" alt="" />
                  <h3  onClick={this.showregister}>Login to the databank</h3>
                </div>
                  <div  onClick={this.showlogin} className="col-md-6  register-block">
                    <img src="/img/option-2.png" alt="" />
                      <h3   onClick={this.showlogin}> Create an acount.</h3>
                  </div>
                </div>
              </div>
            </div>
          </ReactCSSTransitionGroup>
          </div >)
      } else if (this.state.display == "login") {
        return (
          <ReactCSSTransitionGroup
            transitionName="slideLeft"
            transitionAppear={true}
            transitionAppearTimeout={200}
            transitionEnter={false}
            transitionLeave={false}>

          <div className=" card mt-2 p-4">
            <form method="POST" action="/login" className="row">
              <div  className="col-6 offset-3 ">
                <h2> {this.state.display} </h2>
                <div className="input-group mb-3">
                  <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" required />
                </div>
                  {this.state.LoginPasswordMessage}
                <div className="input-group mb-3">
                  <input type="password" name="password" onChange={this.checkLoginPassword} id="inputPassword"  className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
                </div>
                <div className="float-right">

                  <button type="submit" className="btn btn-primary mr-1" disabled={this.state.LoginPasswordMessage}  >Login</button>
                  <button type="button" className="btn btn-danger mr-1" onClick={this.showbutton} >exit</button>
                </div>
              </div>
            </form>
            </div>
          </ReactCSSTransitionGroup >
         );
      }
      else {
        return (
          <ReactCSSTransitionGroup
            transitionName="slide"
            transitionAppear={true}
            transitionAppearTimeout={400}
            transitionEnter={false}
            transitionLeave={false}>
            <div className="row">
              <div className="col-6 offset-3">
                <div className=" card mt-2 p-4">
                  <div className={this.state.registerDisplay}>
                      <form method="POST" action="/GetRegister">
                        <div className="form-group">
                          <label className="">Username</label>
                          <input className="form-control" name="user[username]" />
                        </div>
                        <div className="form-group">
                          <label className="">Email</label>
                          <input className="form-control" name="user[email]" />
                        </div>
                        <div className="form-group">
                          <label className="">Password</label>
                          <input className="form-control" name="user[plainPassword][first]" />
                        </div>
                        <div className="form-group">
                          <label className="">Repeat password </label>
                          <input className="form-control" name="user[plainPassword][second]" />
                        </div>
                        <button type="submit" className="btn btn-primary mr-1" >Register</button>
                        <button type="button" className="btn btn-danger mr-1" onClick={this.showbutton} >exit</button>
                      </form>
                    </div>
                  </div>
              </div>
            </div>
            </ReactCSSTransitionGroup >
        );
      }

    }
}


ReactDOM.render(<AppLogin />, document.getElementById('LoginRegister'));
