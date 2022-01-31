import React, { Component } from "react";
import { Link } from "react-router-dom";
import FlightService from "../../services/FlightService";
import SelectorComponent from "../helpers/SelectorComponent";
import AirportService from "../../services/AirportService";
import AircraftService from "../../services/AircraftService";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";

class CreateFlightComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airline: "",
      aircraft: "",
      airports: [],
      aircrafts: [],
      originAirport: "",
      destinationAirport: "",
      departureDate: new Date(),
    };
    this.changeTextHandler = this.changeTextHandler.bind(this);
    this.saveFlight = this.saveFlight.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }
  compare(a, b) {
    if (a.airportLocation < b.airportLocation) {
      return -1;
    }
    if (a.airportLocation > b.airportLocation) {
      return 1;
    }
    return 0;
  }
  handleCalenderChange(e) {
    localStorage.setItem(e.target.id, e.value);

    this.setState({
      [e.target.id]: e.value,
    });
  }
  //generic shange text for all inputs handler
  componentDidMount() {
    AirportService.getAirports().then((res) => {
      this.setState({
        airports: res.data.sort(this.compare),
      });
    });
    AircraftService.getAircrafts().then((res) => {
      this.setState({ aircrafts: res.data });
    });
  }
  changeTextHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  saveFlight(event) {
    event.preventDefault();
    console.log(this.state);
    let flight = {
      airline: this.state.airline,
      originAirport: this.state.originAirport,
      destinationAirport: this.state.destinationAirport,
      aircraftCode: this.state.aircraft,
      departureDate: this.state.departureDate,
    };
    console.log(flight);
    FlightService.createFlight(flight).then(() => {
      this.props.history.push("/flights");
    });
  }

  handleSelectChange(selectedValue, location) {
    this.setState({
      [location]: selectedValue,
    });
  }
  render() {
    let { airports, aircrafts } = this.state;
    console.log(aircrafts);
    return (
      <div className="container">
        <div className="card card m-5 p-5 bg-subtle shadow-lg">
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
                <div className="row">
                  <div className="col-6">
                    <label>Origin:</label>{" "}
                  </div>{" "}
                  <div className="col-6">
                    <label>Destination:</label>{" "}
                  </div>{" "}
                </div>
                <div className="row">
                  <SelectorComponent
                    size={"col-6 mt-2 mb-2"}
                    arrayOfData={airports}
                    location={"originAirport"}
                    onSelectChange={this.handleSelectChange}
                  />

                  <SelectorComponent
                    size={"col-6 mt-2 mb-2"}
                    arrayOfData={airports}
                    location={"destinationAirport"}
                    onSelectChange={this.handleSelectChange}
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <label>Aircraft:</label>{" "}
                  </div>{" "}
                </div>
                <div className="row">
                  <SelectorComponent
                    size={"col-6 mt-2 mb-2"}
                    arrayOfData={aircrafts}
                    location={"aircraft"}
                    onSelectChange={this.handleSelectChange}
                  />{" "}
                  <div className="col m-2">
                    <label>Departure Date:</label>{" "}
                  </div>{" "}
                  <CalendarComponent
                    className="col m-2"
                    id="departureDate"
                    min={new Date()}
                    start="Year"
                    onChange={this.handleCalenderChange}
                  />
                </div>
              </div>
              <button className="btn btn-success" onClick={this.saveFlight}>
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
    );
  }
}

export default CreateFlightComponent;
