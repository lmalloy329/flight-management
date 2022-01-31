import axios from "axios";

const RESERVATION_API_BASE_URL = "http://localhost:8080/api/test/reservations";

class ReservationService {
  //gets all reservations
  getReservations() {
    return axios.get(RESERVATION_API_BASE_URL);
  }
  //gets list of reservations for a specific custiomer
  getReservationForCustomer(custId) {
    return axios.get(RESERVATION_API_BASE_URL + "/cust/" + custId);
  }
  //get reservations for a specific flight
  getReservationForFlight(flightId) {
    return axios.get(RESERVATION_API_BASE_URL + "/flight/" + flightId);
  }
  // create new reservation using flightId and Customer id and sending seat class as the body
  createReservations(flightId, custId, seatClass) {
    return axios.post(
      RESERVATION_API_BASE_URL + "/flight/" + flightId + "/customer/" + custId,
      seatClass
    );
  }
  //issues with back end but goal is to delete reservation using the reservationId
  deleteRes(resId) {
    axios.delete(RESERVATION_API_BASE_URL + "/" + resId);
  }
}

export default new ReservationService();
