import React, { Component } from "react";
import AirportService from "../../services/AirportService";

class CreateAirportComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airportName: "",
      airportCode: "",
      airportLocation: "",
    };
    this.changeTextHandler = this.changeTextHandler.bind(this);
  }
  //univeral change text handler for changes in any of the inputs in the form. Used this to reate DRY code instead of repeetive change handlers
  changeTextHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  saveAirport = (e) => {
    e.preventDefault();
    var forms = document.querySelectorAll(".needs-validation");
    Array.prototype.slice.call(forms).forEach(function (form) {
      if (!form.checkValidity()) {
        e.preventDefault();
        e.stopPropagation();
      }
      form.classList.add("was-validated");
    }, false);
    let airport = {
      airportCode: this.state.airportCode,
      airportName: this.state.airportName,
      airportLocation: this.state.airportLocation,
    };
    if (
      airport.airportCode.length === 3 &&
      airport.airportName !== "" &&
      airport.airportLocation !== ""
    ) {
      AirportService.createAirport(airport).then(() => {
        this.props.history.push("/");
      });
    }
  };
  render() {
    return (
      <div className="contianer">
        <div className="row">
          <div className="card m-5 p-3 bg-subtle shadow-lg">
            <h3 className="text-center">New Airport</h3>
            <div className="card-body">
              <form className="needs-validation" noValidate>
                <div className="form-floating mb-3">
                  <input
                    id="airportNameInput"
                    placeholder=""
                    name="airportName"
                    className="form-control form-control-small"
                    value={this.state.airportName}
                    onChange={this.changeTextHandler}
                    required
                  ></input>
                  <label for="firstnameInput" className="form-label">
                    Airport Name
                  </label>
                  {/**pops up if input validation isnt met*/}
                  <div className="invalid-feedback">
                    Airport Name is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    id="airportCodeInput"
                    placeholder=""
                    name="airportCode"
                    className="form-control form-control-small"
                    value={this.state.airportCode}
                    onChange={this.changeTextHandler}
                    required
                  ></input>
                  <label for="firstnameInput" className="form-label">
                    Airport Code
                  </label>
                  {/**pops up if input validation isnt met*/}
                  <div className="invalid-feedback">
                    Airport Code is required.
                  </div>
                </div>
                <div className="form-floating mb-3">
                  <input
                    id="airportLocationInput"
                    placeholder=""
                    name="airportLocation"
                    className="form-control form-control-small"
                    value={this.state.airportLocation}
                    onChange={this.changeTextHandler}
                    required
                  ></input>
                  <label for="firstnameInput" className="form-label">
                    Airport Location
                  </label>
                  {/**pops up if input validation isnt met*/}
                  <div className="invalid-feedback">
                    Airport Location is required.
                  </div>
                </div>

                <button className="btn btn-success" onClick={this.saveAirport}>
                  Save Aiport{" "}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAirportComponent;
