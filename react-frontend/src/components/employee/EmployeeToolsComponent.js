import React, { Component } from "react";
import { Link } from "react-router-dom";

class EmployeeToolsComponent extends Component {
  // constructor(props){
  //     super(props)
  // }

  checkEmployee() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user.roles[0].name !== "ROLE_EMPLOYEE") {
      this.props.history.push("/accessDenied");
    }
  }
  render() {
    this.checkEmployee();
    return (
      <div className="contaier">
        <div className="card m-5 p-3 bg-subtle shadow-lg">
          <h3 className="text-center">Employee Tools!</h3>
          <div className="row p-3">
            <div className="col-3 offset-md-3">
              <Link className="btn btn-personal btn-lg" to="/add-flight">
                Add Flight
              </Link>
            </div>
            <div className="col-3">
              <Link className="btn btn-personal btn-lg" to="/add-airport">
                Add Airport
              </Link>
            </div>
          </div>
          <div className="row p-3">
            <div className="col-3 offset-md-3">
              <Link
                className="btn btn-personal btn-lg reservation"
                to="/view-reservations"
              >
                View Flight Reservations
              </Link>
            </div>
            <div className="col-3">
              <Link className="btn btn-personal btn-lg" to="/flightsByAirport">
                View Flight by Airport
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EmployeeToolsComponent;
