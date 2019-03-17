import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


const ModalReact = props => (
  <div>
  <ReactCSSTransitionGroup
  transitionName="fade"
  transitionEnterTimeout={200}
  transitionLeaveTimeout={200}
  transitionAppear={true}
  transitionAppearTimeout={400}
  key="modal"
  >
    <div className="reactModal ">
      <div className="col-12">
        <div className="container">
          <div className="reactModal-child w-100 section bg-white card text-center">
            <div className="row">
            <div className="col-md-1 col-sm-0"></div>
              <div className="col-md-5 card col-sm-12">
                <h3>Hihihi</h3>
              </div>
              <div className="col-md-5 col-sm-12">
                x
              </div>
              <div className="col-md-1 col-sm-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </ReactCSSTransitionGroup>
  </div>
);




export {ModalReact as ModalReact}
