import React, { Component } from "react";
import CustomerService from "../../services/CustomerService";
import FlightService from "../../services/FlightService";
import ReservationService from "../../services/ReservationService";

class ReservationListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flightNum: "",
      reservations: [],
      flight: [],
      customers: {},
      firstBooked: 0,
      businessBooked: 0,
      economyBooked: 0,
    };
    this.getReservations = this.getReservations.bind(this);
  }
  componentDidMount() {
    CustomerService.getCustomers().then((res) => {
      this.setState({ customers: res.data });
    });

    if (this.state.flightNum !== "") {
      this.getReservations();
    }
  }
  getReservations() {
    FlightService.getFlightById(this.state.flightNum).then((res) =>
      this.setState({ flight: res.data })
    );
    let customers = this.state.customers;

    ReservationService.getReservationForFlight(this.state.flightNum).then(
      (res) => {
        res.data.map((reservation) => {
          console.log(reservation);
          if (reservation.seatClass === "First") {
            let temp = this.state.firstBooked;
            temp++;
            this.setState({
              firstBooked: temp,
            });
          } else if (reservation.seatClass === "Business") {
            let temp = this.state.businessBooked;
            temp++;

            this.setState({
              businessBooked: temp,
            });
          } else if (reservation.seatClass === "Economy") {
            let temp = this.state.economyBooked;
            temp++;

            this.setState({
              economyBooked: temp,
            });
          }
          customers.forEach((customer) => {
            customer.reservations.forEach((customerRes) => {
              if (customerRes.reservationId === reservation.reservationId) {
                reservation["cust"] = customer;
              }
            });
          });
          return reservation;
        });

        this.setState({
          reservations: res.data,
        });
      }
    );
  }
  //univeral change text handler for changes in any of the inputs in the form. Used this to reate DRY code instead of repeetive change handlers
  changeTextHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    let { reservations, flight, firstBooked, businessBooked, economyBooked } =
      this.state;
    // let classes = ["First", "Business", "Economy"];
    let total = 0;
    if (flight.aircraft) {
      total =
        businessBooked * flight.aircraft.businessPrice +
        firstBooked * flight.aircraft.firstPrice +
        economyBooked * flight.aircraft.economyPrice;
    }
    return (
      <div className="container">
        <div className="card m-5 p-3 bg-subtle shadow-lg">
          <h3 className=" text-center m-3 p-1">Flight Reservations</h3>
          {this.state.reservations.length === 0 ? (
            <div className="row">
              <div className="form-floating col-6 offset-md-2">
                <input
                  id="fligthNum"
                  placeholder=""
                  name="flightNum"
                  className="form-control form-control-sm"
                  value={this.state.flightNum}
                  onChange={this.changeTextHandler}
                  required
                ></input>
                <label htmlFor="firstnameInput" className="form-label">
                  Flight Number
                </label>{" "}
              </div>
              <button
                className="btn btn-personal btn-sm col-2"
                onClick={this.getReservations}
              >
                Search
              </button>
            </div>
          ) : (
            <div>
              <div className="row">
                <div className="text-center">{`Flight: ${flight.id}`}</div>
              </div>
              <div className="row">
                <div className="text-center">{`${flight.originAirport[0].airportCode} to ${flight.destinationAirport[0].airportCode} `}</div>
              </div>
              <div className="row">
                <div className="text-center">
                  {" "}
                  {new Date(flight.departureDate).toDateString()}
                </div>
              </div>
            </div>
          )}
          <table className="table">
            <thead>
              <tr>
                <th>Class</th>
                <th>Booked</th>
                <th>Total</th>
                <th>Profit</th>
              </tr>
            </thead>
            {flight.aircraft ? (
              <tbody>
                <tr>
                  <th>First</th>
                  <th>{firstBooked}</th>
                  <th>{flight.aircraft.firstClass}</th>
                  <th>{firstBooked * flight.aircraft.firstPrice}</th>
                </tr>
                <tr>
                  <th>Business</th>
                  <th>{businessBooked}</th>
                  <th>{flight.aircraft.businessClass}</th>
                  <th>{businessBooked * flight.aircraft.businessPrice}</th>
                </tr>
                <tr>
                  <th>Economy</th>
                  <th>{economyBooked}</th>
                  <th>{flight.aircraft.economyClass}</th>
                  <th>{economyBooked * flight.aircraft.economyPrice}</th>
                </tr>

                <tr>
                  <th>Total</th>
                  <th>{economyBooked + firstBooked + businessBooked}</th>
                  <th>
                    {flight.aircraft.economyClass +
                      flight.aircraft.businessClass +
                      flight.aircraft.firstClass}
                  </th>
                  <th>{total}</th>
                </tr>
              </tbody>
            ) : null}
          </table>
          {
            /** if reservations are present it displauys a table with customers reservations*/ reservations.length >
            0 ? (
              <div className="row">
                <table className="table table-striped mb-5">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>Name</th>
                      <th>Seat Class</th>
                      <th>Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => {
                      console.log(res);
                      return (
                        <tr key={res.reservationId}>
                          <td>{res.reservationId}</td>
                          <td>{`${res.cust.firstName} ${
                            res.cust.lastName || null
                          }`}</td>
                          <td>{res.seatClass}</td>
                          <td>{}</td>
                          <td>
                            <button
                              className="btn  btn-personal"
                              onClick={this.cancelRes}
                              value={res.flight.id}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : null
          }
        </div>
      </div>
    );
  }
}

export default ReservationListComponent;
