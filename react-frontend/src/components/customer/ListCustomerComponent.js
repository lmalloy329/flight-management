import React, { Component } from "react";
import CustomerService from "../../services/CustomerService";
import { Link } from "react-router-dom";

class ListCustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customers: [],
    };
    this.deleteCustomer = this.deleteCustomer.bind(this);
  }
  componentDidMount() {
    //mounts all customers
    CustomerService.getCustomers().then((res) => {
      this.setState({
        customers: res.data,
      });
    });
  }
  //allows employees to delete customers
  deleteCustomer(id) {
    CustomerService.deleteCustomer(id).then((res) => {
      this.setState({
        customers: this.state.customers.filter(
          (customer) => customer.id !== id
        ),
      });
    });
  }

  render() {
    let user;
    if (sessionStorage.getItem("user")) {
      user = JSON.parse(sessionStorage.getItem("user"));
    }
    //if user is employee they can access this page could be ternary
    if (user && user.roles[0].name === "ROLE_EMPLOYEE") {
      return (
        <div>
          <h2 className="text-center">Customers List</h2>
          <div className="row">
            <Link className="btn btn-primary" to="/add-customer">
              Add Customers
            </Link>{" "}
          </div>
          <div className="row">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Customer First Name</th>
                  <th>Customer Last Name</th>
                  <th>Customer Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {this.state.customers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.firstName}</td>
                    <td>{customer.lastName}</td>
                    <td>{customer.email}</td>
                    <td>
                      <Link
                        className="btn btn-info"
                        props={{ id: customer.id }}
                        to={`/update-customer/${customer.id}`}
                      >
                        Update
                      </Link>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "10px" }}
                        onClick={() => {
                          this.deleteCustomer(customer.id);
                        }}
                      >
                        Delete
                      </button>
                      <Link
                        className="btn btn-info"
                        props={{ id: customer.id }}
                        to={`/view-customer/${customer.id}`}
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
      );
    } else {
      return (
        <div className="container d-flex align-items-center justify-content-center">
          <div>
            <h1 className="text-center">Access Denied.</h1>
            <h3 className="text-center">Please Login to Access this page</h3>
          </div>
        </div>
      );
    }
  }
}

export default ListCustomerComponent;
