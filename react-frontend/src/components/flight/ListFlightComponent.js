import React, { Component } from "react";
import FlightService from "../../services/FlightService";
import { Link } from "react-router-dom";
import AirportService from "../../services/AirportService";
import ItineraryComponent from "./ItineraryComponent";
import ReservationService from "../../services/ReservationService";

class ListFlightComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flights: [],
      origin: "",
      destination: "",
      departureDate: "",
      tripType: "Roundtrip",
      itinerary: [],
      reservations: [],
    };
    this.handleSelectButton = this.handleSelectButton.bind(this);
    this.flightLog = this.flightLog.bind(this);
  }
  //needed to mount info multiple times so i created function flightLog so component did mount calss that originally to check if data mounts

  componentDidMount() {
    this.flightLog();
  }
  //used to updated state after slections re made
  flightLog() {
    //sets type of trip and departure date
    this.setState({
      tripType: localStorage.getItem("selection") || "Roundtrip",
      departureDate: localStorage.getItem("departureDate"),
    });
    //gets airport with origin code
    AirportService.getAirportsByCode(localStorage.getItem("origin")).then(
      (res) => {
        this.setState({
          origin: res.data,
        });
      }
    );
    //gets airprot with destination code
    AirportService.getAirportsByCode(localStorage.getItem("destination")).then(
      (res) => {
        this.setState({
          destination: res.data,
        });
      }
    );
    //gets fllights that are leaving from the orging airport, filters them to make sure they ahve correct destination, then checks the departure dates of the flights
    FlightService.getFlightsByAirportCode(localStorage.getItem("origin")).then(
      (res) => {
        let flights = res.data.filter(
          (data) =>
            data.destinationAirport[0].airportCode ===
            localStorage.getItem("destination")
        );
        let dDate = new Date(
          localStorage.getItem("departureDate").slice(0, 28)
        );
        let pDate = new Date(dDate);
        pDate.setDate(pDate.getDate() - 1);
        let lDate = new Date(dDate);
        pDate.setDate(lDate.getDate() + 1);
        let flightsFiltered = flights.filter((flight) => {
          if (
            flight.departureDate.includes(dDate.toISOString().slice(0, 10)) ||
            flight.departureDate.includes(lDate.toISOString().slice(0, 10)) ||
            flight.departureDate.includes(pDate.toISOString().slice(0, 10))
          ) {
            return true;
          } else {
            return false;
          }
        });
        this.setState({
          flights: flightsFiltered,
        });
        //then gets the resercations that exist for the flights
        flightsFiltered.forEach((flight) =>
          ReservationService.getReservationForFlight(flight.id).then((res) => {
            this.setState({
              reservations: [...this.state.reservations, res],
            });
          })
        );
      }
    );
  }
  //deletes flight by id (only available for employees))
  deleteFlight(id) {
    FlightService.deleteFlight(id).then((res) => {
      this.setState({
        flights: this.state.flights.filter((flight) => flight.id !== id),
      });
    });
  }
  handleSelectButton(e) {
    let itin = this.state.itinerary;
    //Adds selected flight to passengers itinerary
    itin.push(
      this.state.flights.filter((flight) => {
        return flight.id === parseInt(e.target.value);
      })[0]
    );
    this.setState({
      itinerary: itin,
    });
    console.log(this.state);
    if (
      this.state.tripType === "Roundtrip" &&
      this.state.itinerary.length <= 1
    ) {
      //switch origin and destintion and change departure date

      localStorage.setItem("departureDate", localStorage.getItem("returnDate"));
      localStorage.removeItem("returnDate");
      console.log(localStorage);
      let temp = localStorage.getItem("origin");
      localStorage.setItem("origin", localStorage.getItem("destination"));
      console.log(localStorage);
      localStorage.setItem("destination", temp);
    }
    if (
      this.state.tripType === "Multicity" &&
      this.state.itinerary.length <= 1
    ) {
      //switch origin and destintion and change departure date
      localStorage.setItem("originalOrigin", localStorage.getItem("origin"));
      localStorage.setItem(
        "originalDestination",
        localStorage.getItem("destination")
      );
      localStorage.setItem("departureDate", localStorage.getItem("returnDate"));
      localStorage.removeItem("returnDate");
      localStorage.setItem("origin", localStorage.getItem("originTwo"));
      console.log(localStorage);
      localStorage.setItem(
        "destination",
        localStorage.getItem("destinationTwo")
      );
    }
    //calss clight log to update state
    this.flightLog();
  }
  render() {
    let flights = this.state.flights;
    //if there
    if (localStorage.length === 0) {
      this.props.history.push("/search");
    }
    return (
      <div>
        {
          /**checks to see at what point all the flights neccessary are added to itinerary component so that it can change to displaying that. */
          this.state.itinerary.length === 0 ||
          (this.state.tripType !== "Oneway" &&
            this.state.itinerary.length < 2) ? (
            <div className="container">
              <h2 className="text-center mt-3">Flight List</h2>
              <div className="row flight-list">
                <div className="text-center">
                  From {this.state.origin.airportLocation} to{" "}
                  {this.state.destination.airportLocation}
                </div>
                <table className="table  table-striped flight-list mb-5">
                  <thead>
                    <tr>
                      <th>Airline</th>
                      <th>Departure Time</th>
                      <th>Arrival Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="flight-list">
                    {flights.map((flight) => (
                      <tr key={flight.id}>
                        <td>{flight.airline}</td>
                        <td>
                          <small>
                            {new Date(flight.departureDate).toLocaleString()}
                          </small>
                        </td>
                        <td>
                          <small>
                            {new Date(flight.arrivalDate).toLocaleString()}
                          </small>
                        </td>
                        <td>
                          <button
                            className="btn btn-light col m-3"
                            value={flight.id}
                            onClick={this.handleSelectButton}
                          >
                            Select
                          </button>
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
            </div>
          ) : (
            <div className="container">
              <div className="card m-5 bg-subtle shadow-lg">
                {" "}
                {this.state.tripType === "Multicity" ? (
                  <div>
                    {console.log(localStorage)}
                    <h4 className="text-center">
                      {localStorage.getItem("originalOrigin")} to{" "}
                      {localStorage.getItem("originalDestination")}
                    </h4>
                    <div className="test-center">Then</div>
                  </div>
                ) : null}
                <h4 className="text-center">
                  {localStorage.getItem("origin")} to{" "}
                  {localStorage.getItem("destination")}
                </h4>
                <div className="text-center">{this.state.tripType}</div>
                <ItineraryComponent
                  itinerary={this.state.itinerary}
                  reservations={this.state.reservations}
                />
              </div>
            </div>
          )
        }{" "}
      </div>
    );
  }
}

export default ListFlightComponent;
