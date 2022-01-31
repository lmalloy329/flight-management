import React, { Component } from "react";

class HomeComponent extends Component {
  //checks if user is signed in, if they are signed in it pushes them to the Flight search page.
  checkSignIn() {
    if (sessionStorage.getItem("user")) {
      this.props.history.push("/search");
    }
  }
  //Basic somponent that welcomes you and provides options to sign in or register.
  render() {
    this.checkSignIn();
    return (
      <div className="container">
        <div className="card m-5 p-4 bg-subtle  rounded shadow-lg">
          <h2 className="display-4 text-center">Welcome!</h2>
          <div className="card-body text-center">
            Sign in or Sign up to let us help you fly away to your next dream
            destination.
            <div className="row mt-2">
              <a href="/sign-in" className="btn btn-sm btn-personal m-1 col">
                Sign In
              </a>
              <a href="/register" className="btn btn-sm btn-personal m-1 col">
                Register
              </a>{" "}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeComponent;
