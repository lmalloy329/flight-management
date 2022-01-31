import axios from "axios";

const CUSTOMER_API_BASE_URL = "http://localhost:8080/api/test/customers";

class CustomerService {
  //gets all customers
  async getCustomers() {
    let customers = await axios.get(CUSTOMER_API_BASE_URL);
    return customers;
  }
  //creates a new customer sending cusrtomer json as body
  createCustomer(customer) {
    return axios.post(CUSTOMER_API_BASE_URL, customer);
  }
  //gets single customer by customer Id
  getCustomerById(customerId) {
    return axios.get(CUSTOMER_API_BASE_URL + "/" + customerId);
  }
  //updates customer using customerId to find customer to be updated and then sending json in body with updates
  updateCustomer(customer, customerId) {
    return axios.put(CUSTOMER_API_BASE_URL + "/" + customerId, customer);
  }
  //deletes a customer withj a certain Id, running into issue when user
  deleteCustomer(customerId) {
    return axios.delete(CUSTOMER_API_BASE_URL + "/" + customerId);
  }
}

export default new CustomerService();
