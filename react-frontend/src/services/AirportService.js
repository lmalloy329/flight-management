import axios from "axios";

const AIRPORT_API_BASE_URL = "http://localhost:8080/api/test/airports";

class AirportService {
  //get all airports
  getAirports() {
    return axios.get(AIRPORT_API_BASE_URL);
  }
  //get single airport by airport code
  getAirportsByCode(code) {
    return axios.get(AIRPORT_API_BASE_URL + "/" + code);
  }

  // create a new airport
  createAirport(airport) {
    return axios.post(AIRPORT_API_BASE_URL, airport);
  }
}

export default new AirportService();
