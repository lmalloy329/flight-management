import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../App.css";

import AuthService from "../services/AuthService";

class NavbarComponent extends Component {
  constructor() {
    super();
    this.state = {
      user: "",
    };
  }
  //logout function that uses AuthService to log out user and then wipes the Session, calls reload to re-render
  logOut(e) {
    e.preventDefault();
    AuthService.logout();
    window.sessionStorage.clear();
    window.location.reload();
  }

  render() {
    let user;
    //if user is in session parses user into object so we can have link to profile at userId
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    console.log(user);
    return (
      <div>
        <header>
          <nav className="navbar navbar-expand-md navbar-dark bg-personal">
            <div className="container">
              <a href="/" className="navbar-brand mb-0 h1">
                Fleeting Flights
              </a>
              <div className="navbar-nav flex-row">
                {
                  /**ternary that checks if user is logged in. if logged in provides profile and logout options if not logged in provides sign in option */
                  sessionStorage.getItem("user") ? (
                    <ul className="navbar-nav flex-row">
                      {user.roles[0].name === "ROLE_EMPLOYEE" ? (
                        <Link className="nav-link me-3" to={`/employee-tools`}>
                          Tools
                        </Link>
                      ) : null}
                      {/** link that uses the user id parsed from session to navigste to profile */}
                      <Link
                        className="nav-link"
                        to={`view-customer/${user.id}`}
                      >
                        {/* <img src="/open-iconic/svg/person.svg" /> */}{" "}
                        Profile
                      </Link>
                      <button
                        className="btn btn-secondary btn-sm col"
                        onClick={this.logOut}
                      >
                        Log Out
                      </button>
                    </ul>
                  ) : (
                    <div className="navbar-nav">
                      <Link to={"/sign-in"} className="nav-link text-right">
                        Sign In
                      </Link>
                    </div>
                  )
                }
              </div>
            </div>
          </nav>
        </header>
      </div>
    );
  }
}

export default NavbarComponent;
