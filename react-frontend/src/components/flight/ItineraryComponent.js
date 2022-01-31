import React from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import ReservationService from "../../services/ReservationService";

import SelectorComponent from "../helpers/SelectorComponent";

function ItineraryComponent(props) {
  const [flights] = useState(props.itinerary);
  const [prices, setPrices] = useState({});
  const [seats, setSeats] = useState({});
  const [booked, setBooked] = useState({});
  let seatClass = ["First", "Business", "Economy"];
  let history = useHistory();
  //function to book flights on the click of the submit button. it gathers all info, cutomer, flights and seat class and creates reservation. then clears local storage and sends user to their profile
  function flightBooker() {
    let user = JSON.parse(sessionStorage.getItem("user"));

    flights.forEach((flight) => {
      ReservationService.createReservations(
        flight.id,
        user.id,
        localStorage.getItem(flight.id)
      ).then(() => {});
    });
    localStorage.clear();

    history.push(
      `/view-customer/${JSON.parse(sessionStorage.getItem("user")).id}`
    );
  }

  //handles changes to the seat slection. need to fix how it updaters state. price div wont update
  function handleSelectChange(selectedValue, e) {
    // setPrices({})
    let temp = {};
    let tempSeats = {};
    for (const flight in prices) {
      temp[flight] = prices[flight];
    }
    for (const flight in seats) {
      tempSeats[flight] = seats[flight];
    }
    let flight = flights.filter((flight) => {
      return flight.id === e;
    })[0];
    if (selectedValue === "Business") {
      temp[e] = flight.aircraft.businessPrice;
      tempSeats[e] = flight.aircraft.businessClass - flight.businessTickets;
    } else if (selectedValue === "First") {
      temp[e] = flight.aircraft.firstPrice;
      tempSeats[e] = flight.aircraft.firstClass - flight.firstTickets;
    } else if (selectedValue === "Economy") {
      temp[e] = flight.aircraft.economyPrice;
      tempSeats[e] = flight.aircraft.economyClass - flight.economyTickets;
    }
    setPrices(temp);
    setSeats(tempSeats);
  }

  return (
    <div>
      <h5 className="text-center mt-3 ">Confirm Itinerary</h5>
      <div className="row flight-list"> </div>
      <table className="table table-striped flight-list mb-5">
        <thead>
          <tr>
            <th>Airline</th>
            <th>Departure Time</th>
            <th>Arrival Time</th>
            <th>Details</th>
            <th>Ticket Price:</th>
            <th>Seats Available:</th>
          </tr>
        </thead>
        <tbody className="flight-list">
          {
            /** working on filtering the seats so that when flights/reservations/class > flight/aircraft/class you cannot book that class anymore*/
            flights.map((flight) => {
              let seatClassFlight = seatClass.filter((seatClass) => {
                // console.log(seatClass);
                // console.log(flight);
                if (seatClass === "First") {
                  // console.log
                  // console.log(flight.tickets <= flight.aircraft.firstClass);
                  return true;
                } else {
                  return true;
                }
              });
              //creates a table displaying chosen flights infor mation and lets you choose your class/displays price
              return (
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
                    <div className="row">
                      <SelectorComponent
                        className=""
                        id={flight.id}
                        arrayOfData={seatClassFlight}
                        location={flight.id}
                        onSelectChange={handleSelectChange}
                      />
                    </div>
                  </td>

                  {prices[flight.id] ? (
                    <td className="col">{prices[flight.id]}</td>
                  ) : (
                    <td className="col"></td>
                  )}
                  {seats[flight.id] ? (
                    <td className="col">{seats[flight.id]}</td>
                  ) : (
                    <td className="col"></td>
                  )}
                </tr>
              );
            })
          }
        </tbody>
      </table>

      <div className="row">
        {/** wnat to add pop up confirmation before allowing booking */}
        <button
          className="btn btn-dark col-2 offset-md-9 mb-2"
          onClick={flightBooker}
        >
          Book
        </button>
      </div>
    </div>
  );
}

export default ItineraryComponent;
