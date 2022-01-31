import React, { Component } from "react";
import AirportService from "../../services/AirportService";
import SelectorComponent from "../helpers/SelectorComponent";
import { Link } from "react-router-dom";
import FlightService from "../../services/FlightService";

class FlightsByAirport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      airports: [],
      origin: "",
      flights: [],
      currentPage: 1,
      flightsPerPage: 20,
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  //gets all airports and makes sure local storage is clear
  componentDidMount() {
    AirportService.getAirports().then((res) => {
      this.setState({
        airports: res.data.sort(this.compare),
      });
    });
  }
  //handles change to drop down menu
  handleSelectChange(selectedValue, location) {
    this.setState({
      [location]: selectedValue,
    });
    console.log(this.state);
    FlightService.getFlightsByAirportCode(selectedValue).then((res) => {
      this.setState({
        flights: res.data,
      });
    });
  }
  //allows us to alphabatize Airport list
  compare(a, b) {
    if (a.airportLocation < b.airportLocation) {
      return -1;
    }
    if (a.airportLocation > b.airportLocation) {
      return 1;
    }
    return 0;
  }
  iterate(i) {
    console.log(i);
    for (; i < i + 10; i++) {
      <div>hi</div>;
    }
  }
  handleClick(event) {
    console.log(this.state);
    this.setState({
      currentPage: Number(event.target.id),
    });
  }

  render() {
    let { airports, flights, origin, currentPage, flightsPerPage } = this.state;
    const indexOfLastFlight = currentPage * flightsPerPage;
    const indexOfFirstFlight = indexOfLastFlight - flightsPerPage;
    const currentFlights = flights.slice(indexOfFirstFlight, indexOfLastFlight);
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(flights.length / flightsPerPage); i++) {
      pageNumbers.push(i);
    }
    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <button
          className="btn btn-personal"
          key={number}
          id={number}
          onClick={this.handleClick}
        >
          {number}
        </button>
      );
    });
    return (
      <div className="container">
        <div className="card m-5 p-3 bg-subtle shadow-lg">
          <SelectorComponent
            arrayOfData={airports}
            location={"origin"}
            size={"col-6 offset-md-3"}
            onSelectChange={this.handleSelectChange}
          />{" "}
          {this.state.flights.length > 0 ? (
            <div>
              <h3 className="text-center">{origin}</h3>
              <div className="row">
                <button
                  className="btn btn-personal col-3 offset-md-1"
                  onClick={(i) => {
                    i -= 10;
                  }}
                >
                  previous
                </button>
                <button
                  className="btn btn-personal col-3 offset-md-3"
                  onClick={(i) => {
                    i -= 10;
                  }}
                >
                  next
                </button>
              </div>
            </div>
          ) : null}
        </div>
        <div id="page-numbers">{renderPageNumbers}</div>
        <table className="table  table-striped flight-list mb-5">
          <thead>
            <tr>
              <th>Airline</th>
              <th>Departure Time</th>
              <th>Arrival Time</th>
              <th>Destination</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="flight-list">
            {currentFlights.map((flight) => (
              <tr key={flight.id}>
                <td>{flight.airline}</td>
                <td>
                  <small>
                    {new Date(flight.departureDate).toLocaleString()}
                  </small>
                </td>
                <td>
                  <small>{new Date(flight.arrivalDate).toLocaleString()}</small>
                </td>
                <td>{flight.destinationAirport[0].airportName}</td>
                <td>
                  <Link
                    className="btn btn-light col m-3"
                    to={`/view-flight/${flight.id}`}
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default FlightsByAirport;
