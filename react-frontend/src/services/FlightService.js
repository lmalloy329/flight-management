import axios from "axios";

const FLIGHT_API_BASE_URL = "http://localhost:8080/api/test/flights";

class FlightService {
  //get all flights
  getFlights() {
    return axios.get(FLIGHT_API_BASE_URL);
  }
  //create new flight
  createFlight(flight) {
    return axios.post(FLIGHT_API_BASE_URL, flight);
  }
  // get one flight by flightId
  getFlightById(flightId) {
    return axios.get(FLIGHT_API_BASE_URL + "/" + flightId);
  }
  //update flight by flight id
  updateFlight(flight, flightId) {
    return axios.put(FLIGHT_API_BASE_URL + "/" + flightId, flight);
  }
  //get single flight by the Siport code of its origin
  getFlightsByAirportCode(origin) {
    return axios.get(FLIGHT_API_BASE_URL + "/code/" + origin);
  }
  //deletes flight
  deleteFlight(flightId) {
    return axios.delete(FLIGHT_API_BASE_URL + "/" + flightId);
  }
}

export default new FlightService();
