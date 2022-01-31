import React, { Component } from "react";
import FlightService from "../../services/FlightService";
//add if employee views see all the reservations
import ReservationService from "../../services/ReservationService";

class ViewFlightComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id || -1,
      flight: {},
    };
    this.goBack = this.goBack.bind(this);
  }
  //gets flight by flight id and stores info
  componentDidMount() {
    FlightService.getFlightById(this.state.id).then((res) => {
      this.setState({
        flight: res.data,
      });
    });
  }
  //navigates to previous page to continue booking process
  goBack() {
    this.props.history.goBack();
  }
  render() {
    let flight = this.state.flight;
    let origin = "Not Available";
    let departureDate = "Not Available";
    let destination = "Not Available";
    let arrivalDate = "Not Available";
    //if flight exist then display info
    if (flight.airline) {
      origin = flight.originAirport[0].airportName;
      departureDate = flight.departureDate;
      destination = flight.destinationAirport[0].airportName;
      arrivalDate = flight.arrivalDate;
    }
    return (
      <div className="container ">
        <div className="card bg-subtle shadow-lg m-5">
          <h3 className="text-center m-2">Flight Details</h3>
          <div className="card-body">
            <div className="row m-3">
              <label className="col-3 offset-md-2">Airline:</label>
              <div className="col-4">{flight.airline}</div>
            </div>
            <div className="row m-3">
              <label className="col-3  offset-md-2">Origin:</label>
              <div className="col-4">{origin}</div>
            </div>
            <div className="row m-3">
              <label className="col-3  offset-md-2">Departure Time:</label>
              <div className="col-4">
                {new Date(departureDate).toLocaleString()}
              </div>
            </div>
            <div className="row m-3">
              <label className="col-3  offset-md-2">Destination:</label>
              <div className="col-4">{destination}</div>
            </div>
            <div className="row m-3">
              <label className="col-3  offset-md-2">Arrival Time:</label>
              <div className="col-4">
                {new Date(arrivalDate).toLocaleString()}
              </div>
            </div>
            <div className="row">
              <button
                className="btn btn-personal col-3 offset-md-4"
                onClick={this.goBack}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewFlightComponent;
