import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomerService from "../../services/CustomerService";

import ReservationService from "../../services/ReservationService";

class ViewCustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id || 0,
      customer: {},
      reservations: {},
      flights: {},
    };
  }
  //first find the correct customer and gets their data, then gets the reservatinos for said customer
  componentDidMount() {
    CustomerService.getCustomerById(this.state.id).then((res) => {
      this.setState({
        customer: res.data,
      });
    });
    ReservationService.getReservationForCustomer(this.state.id).then((res) => {
      this.setState({
        reservations: res.data,
      });
    });
  }
  //will allow you to cancel res once i fix back end issues
  cancelRes(e) {
    ReservationService.deleteRes(e.target.value);
  }

  render() {
    let { customer, reservations } = this.state;
    console.log(reservations);
    return (
      <div className="container">
        <div className="card bg-subtle shadow-lg m-5">
          <div className="row mt-3">
            <div className="col m-3">
              <img
                src="/icon.png"
                className="icon"
                alt="company logo, plane over world"
              />
            </div>
            <div className="col m-5">
              <h4 className="mt-5 ms-5">{`Hey ${customer.firstName}!`}</h4>
              <small className="ms-5">{`ID: ${customer.id}`}</small>
            </div>{" "}
            <Link className="btn" to={`/update-customer/${this.state.id}`}>
              {" "}
              Update
            </Link>
          </div>
          <div className="card-body mx-3 my-2">
            <div className="row mb-2">
              <div className="col-2">Name:</div>
              <div className="col-4">{`${customer.firstName} ${customer.middleName} ${customer.lastName}`}</div>
              <div className="col-2">Email:</div>
              <div className="col-4">{customer.email}</div>
            </div>
            <div className="row">
              <p className="col-4">Phone Number:</p>
              <div className="col-3">{customer.phoneNumber}</div>
            </div>
            <label>Customer Adress:</label>
            <div>{`${customer.address} ${customer.city} , ${customer.state} , ${customer.country}`}</div>
            <br></br>
            <div className="row">
              <label className="col-4 offset-md-4">Reservations:</label>
            </div>
            {
              /** if reservations are present it displauys a table with customers reservations*/ reservations.length >
              0 ? (
                <div className="row">
                  <table className="table table-striped mb-5">
                    <thead>
                      <tr>
                        <th>Airline</th>
                        <th>Origin</th>
                        <th>Destination</th>
                        <th>Departure Date</th>
                        <th>Cancel</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((res) => (
                        <tr key={res.reservationId}>
                          <td>{res.flight.airline}</td>
                          <td>{res.flight.originAirport[0].airportCode}</td>
                          <td>
                            {res.flight.destinationAirport[0].airportCode}
                          </td>
                          <td>
                            {new Date(res.flight.departureDate).toDateString()}
                          </td>
                          <td>
                            <button
                              onClick={this.cancelRes}
                              value={res.reservationId}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>false</div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCustomerComponent;
