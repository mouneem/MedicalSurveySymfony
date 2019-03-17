import React from 'react';
import ReactDOM from 'react-dom';

console.log('Hello Login Page');


class AppLogin extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
        <div className="w-100">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa fa-at"></i>
              </span>
            </div>
            <input type="email" id="inputEmail"  name="email" className="form-control" placeholder="Email" aria-label="Email" aria-describedby="basic-addon1" required />
          </div>
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">
                  <i className="fa fa-unlock"></i>
                </span>
              </div>
              <input type="password" name="password" id="inputPassword"  className="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" required />
            </div>
        </div>
    )
  }
}
ReactDOM.render(<AppLogin />, document.getElementById('login_div'));
