import React, { Component } from "react";

class AccessDeniedComponent extends Component {
  render() {
    return (
      <div className="container">
        <div className="card m-5 p-5 bg-subtle shadow-lg">
          <div className="card-body">
            <h3 className="text-center m-3">Acces Denied</h3>
            <p className=" text-center m-3 p-3">
              I am sorry but you do not have access tot his page. Please try
              signing in again.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default AccessDeniedComponent;
