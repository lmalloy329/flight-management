import React, { Component } from "react";
import { Link } from "react-router-dom";
import FlightService from "../../services/FlightService";

class UpdateFlightComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id || 0,
      airline: "",
      origin: "",
      destination: "",
      aircraft: "",
    };
    this.changeTextHandler = this.changeTextHandler.bind(this);
    this.updateFlight = this.updateFlight.bind(this);
  }
  //gets flight by flight id then sets state to that information
  componentDidMount() {
    FlightService.getFlightById(this.state.id).then((res) => {
      let flight = res.data;
      this.setState({
        airline: flight.airline || "",
        origin: flight.origin || "",
        destination: flight.destination || "",
        aircraft: flight.aircraft || "",
      });
    });
  }
  //deneric texgt input changer
  changeTextHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  //submits updated information too backend then pushes list of all flights
  updateFlight(event) {
    event.preventDefault();

    let flight = {
      airline: this.state.airline,
      origin: this.state.origin,
      destination: this.state.destination,
      aircraft: this.state.aircraft,
    };
    FlightService.updateFlight(flight, this.state.id).then(() => {
      this.props.history.push("/flights");
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            <h3 className="text-center">New Flight</h3>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Airline:</label>
                  <input
                    placeholder="Airline"
                    name="airline"
                    className="form-control"
                    value={this.state.airline}
                    onChange={this.changeTextHandler}
                  ></input>
                  <label>Origin:</label>
                  <input
                    placeholder="Origin"
                    name="origin"
                    className="form-control"
                    value={this.state.origin}
                    onChange={this.changeTextHandler}
                  ></input>
                  <label>Destination:</label>
                  <input
                    placeholder="Destination"
                    name="destination"
                    className="form-control"
                    value={this.state.destination}
                    onChange={this.changeTextHandler}
                  ></input>
                  <label>Aircraft:</label>
                  <input
                    placeholder="Aircraft"
                    name="aircraft"
                    className="form-control"
                    value={this.state.aircraft}
                    onChange={this.changeTextHandler}
                  ></input>
                </div>
                {/**should add confirmation notifcation */}
                <button className="btn btn-success" onClick={this.updateFlight}>
                  Submit
                </button>

                <Link
                  className="btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  to="/flights"
                >
                  Cancel
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateFlightComponent;
