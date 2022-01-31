import axios from "axios";

const AIRCRAFT_API_BASE_URL = "http://localhost:8080/api/test/aircrafts";

class AircraftService {
  //get all this aircrafts
  getAircrafts() {
    return axios.get(AIRCRAFT_API_BASE_URL);
  }
}

export default new AircraftService();
