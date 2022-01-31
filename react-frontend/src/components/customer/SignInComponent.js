import { Link } from "react-router-dom";
import React, { Component } from "react";
import AuthService from "../../services/AuthService";

class SignInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleLogin = this.handleLogin.bind(this);
  }
  //sends username and paassword to check if they are correct stores user in session if it is
  handleLogin(e) {
    e.preventDefault();
    AuthService.login(this.state.username, this.state.password).then((res) => {
      sessionStorage.setItem("user", JSON.stringify(res));
      window.location.reload();
      this.props.history.push(`/search`);
    });
  }
  //rests state to blank
  resetLogin() {
    this.setState({
      username: "",
      password: "",
    });
  }
  //change text is any input
  changeTextHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //checks to see if user is signed  in, if threy are sends them to search
  checkSignIn() {
    if (sessionStorage.getItem("user") !== null) {
      this.props.history.push("/search");
    }
  }

  render() {
    this.checkSignIn();
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="card col-md-6 offset-md-3 bg-subtle rounded shadow-lg">
            <h3 className="text-center mt-3"> Login</h3>
            <div className="card-body">
              <form>
                <div className="mb-2">
                  <label htmlFor="emailInput" className="form-label">
                    Username(Email):
                  </label>
                  <input
                    placeholder="Username"
                    type="email"
                    name="username"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.changeTextHandler}
                  ></input>
                </div>
                <div className="mb-3">
                  <label htmlFor="passwordInput" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.changeTextHandler}
                  ></input>
                </div>
                <div className="row mt-1">
                  {/**buttons disabled when inputs blank */}
                  <button
                    type="submit"
                    className="btn btn-sm btn-personal m-2 col"
                    onClick={this.handleLogin}
                    disabled={
                      this.state.username.length === 0 ||
                      this.state.password.length === 0
                    }
                  >
                    Login
                  </button>
                  <button
                    className="btn btn-sm btn-personal m-2 col"
                    onClick={this.resetLogin}
                    disabled={
                      this.state.username.length === 0 &&
                      this.state.password.length === 0
                    }
                  >
                    Reset
                  </button>
                  {/**never disabled */}
                  <Link
                    to={"/register"}
                    className="btn btn-sm btn-personal m-2 col"
                  >
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignInComponent;
