import React, { Component } from "react";
import { Link } from "react-router-dom";
import CustomerService from "../../services/CustomerService";

class UpdateCustomerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id || 0,
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      address: "",
      phoneNumber: "",
      city: "",
      state: "",
      country: "",
      employee: false,
      password: "",
    };

    this.changeTextHandler = this.changeTextHandler.bind(this);
    this.updateCustomer = this.updateCustomer.bind(this);
  }
  componentDidMount() {
    CustomerService.getCustomerById(this.state.id).then((res) => {
      let customer = res.data;
      this.setState({
        firstName: customer.firstName || "",
        middleName: customer.middleName || "",
        lastName: customer.lastName || "",
        email: customer.email || "",
        address: customer.address || "",
        phoneNumber: customer.phoneNumber || "",
        city: customer.city || "",
        state: customer.state || "",
        country: customer.country || "",
        employee: customer.employee,
        password: customer.password || "",
      });
    });
  }
  changeTextHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  updateCustomer = (e) => {
    e.preventDefault();
    let customer = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      middleName: this.state.middleName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      employee: this.state.employee,
      password: this.state.password,
    };
    CustomerService.updateCustomer(customer, this.state.id).then((res) => {
      console.log(JSON.parse(sessionStorage.getItem("user")).id, this.state.id);
      if (
        JSON.parse(sessionStorage.getItem("user")).id ===
        parseInt(this.state.id)
      ) {
        this.props.history.push(`/view-customer/${this.state.id}`);
      }
      this.props.history.push("/customers");
    });
  };

  render() {
    return (
      <div className="container">
        <div className="card mb-4  bg-subtle shadow-lg">
          <h3 className="text-center mt-3">Update Info!</h3>
          <div className="card-body mb-5">
            <form className="needs-validation mb-4" noValidate>
              <div className="row">
                <div className="col-4 offset-md-1">
                  <br></br>
                  <h5>Please Provide Your Name!</h5>
                  <p>As it is written on your government ID.</p>
                </div>
                <div className="col offset-md-1">
                  <div className="form-floating mb-3">
                    <input
                      id="firstnameInput"
                      placeholder=""
                      name="firstName"
                      className="form-control form-control-small"
                      value={this.state.firstName}
                      onChange={this.changeTextHandler}
                      required
                    ></input>
                    <label for="firstnameInput" className="form-label">
                      First Name
                    </label>
                    {/**pops up if input validation isnt met*/}
                    <div className="invalid-feedback">
                      First Name is required.
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder=""
                      id="middleNameInput"
                      name="middleName"
                      className="form-control form-control-sm"
                      value={this.state.middleName}
                      onChange={this.changeTextHandler}
                      required
                    ></input>
                    <label for="middleNameInput" className="form-label">
                      Middle Name
                    </label>
                    <div className="invalid-feedback">
                      Middle Name is required.
                    </div>
                  </div>
                  <div className=" form-floating mb-3">
                    <input
                      placeholder=""
                      name="lastName"
                      className="form-control form-control-sm"
                      value={this.state.lastName}
                      onChange={this.changeTextHandler}
                      required
                    ></input>{" "}
                    <label for="lastNameInput" className="form-label">
                      Last Name
                    </label>
                    <div className="invalid-feedback">
                      Last Name is required.
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3">
                <h5 className="text-center ">
                  Pleade update your Contact information!
                </h5>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      id="emailInput"
                      placeholder="Email"
                      name="email"
                      className="form-control fomr-control-lg"
                      value={this.state.email}
                      onChange={this.changeTextHandler}
                      required
                    ></input>
                    <label for="emailInput" className="form-label">
                      Email
                    </label>
                    <div className="invalid-feedback">Email is required.</div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="Phone Number"
                      name="phoneNumber"
                      className="form-control form-control-sm"
                      value={this.state.phoneNumber}
                      onChange={this.changeTextHandler}
                      required
                    ></input>{" "}
                    <label for="phoneNumberInput" className="form-label">
                      Phone Number
                    </label>
                    <div className="invalid-feedback">
                      Phone Number is required.
                    </div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                      className="form-control form-control-sm"
                      value={this.state.password}
                      onChange={this.changeTextHandler}
                      required
                    ></input>
                    <label for="passwordInput" className="form-label">
                      Password
                    </label>
                    <div className="invalid-feedback">
                      Password is required.
                    </div>
                  </div>
                </div>{" "}
                <div className="col-md-6">
                  <div className="form-floating mb-3">
                    <input
                      placeholder="Address"
                      name="address"
                      className="form-control form-control-sm"
                      value={this.state.address}
                      onChange={this.changeTextHandler}
                      required
                    ></input>
                    <label>Address</label>
                    <div className="invalid-feedback">Address is required.</div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="City"
                      name="city"
                      className="form-control form-control-sm"
                      value={this.state.city}
                      onChange={this.changeTextHandler}
                      required
                    ></input>{" "}
                    <label>City</label>
                    <div className="invalid-feedback">City is required.</div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="State"
                      name="state"
                      className="form-control form-control-sm"
                      value={this.state.state}
                      onChange={this.changeTextHandler}
                      required
                    ></input>{" "}
                    <label>State</label>
                    <div className="invalid-feedback">State is required.</div>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      placeholder="Country"
                      name="country"
                      className="form-control form-control-sm"
                      value={this.state.country}
                      onChange={this.changeTextHandler}
                      required
                    ></input>
                    <label>Country</label>
                    <div className="invalid-feedback">Country is required.</div>
                  </div>
                </div>
              </div>

              <div className="row m-1">
                {/**if you chose Submit you update your prifulean d redirect to customer list */}
                <button
                  type="submit"
                  className="btn btn-personal col-2 offset-md-1"
                  onClick={this.updateCustomer}
                >
                  Submit
                </button>
                <Link
                  className="btn btn-personal col-2 offset-md-1"
                  style={{ marginLeft: "10px" }}
                  to=""
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UpdateCustomerComponent;
