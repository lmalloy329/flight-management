import React, { Component } from "react";
import { Link } from "react-router-dom";
import AirportService from "../../services/AirportService";
import SelectorComponent from "../helpers/SelectorComponent";
import { CalendarComponent } from "@syncfusion/ej2-react-calendars";

class FlightSearchComponent extends Component {
  constructor() {
    super();
    this.state = {
      airports: [],
      selectCity: "None",
      isChecked: false,
      checkedValue: "",
      selection: "Roundtrip",
      minDate: new Date(),
      departureDate: new Date(),
      returnDate: null,
    };
    this.checkBoxHandler = this.checkBoxHandler.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleCalenderChange = this.handleCalenderChange.bind(this);
  }
  //gets all airports and makes sure local storage is clear
  componentDidMount() {
    AirportService.getAirports().then((res) => {
      this.setState({
        airports: res.data.sort(this.compare),
      });
    });

    localStorage.clear();
  }
  //checks to make sure user is signed in, must be signed in to make resercations

  checkSignIn() {
    if (sessionStorage.getItem("user") === null) {
      this.props.history.push("/");
    }
  }
  //handles changes to checkbox used for selecting type of trip
  checkBoxHandler(e) {
    localStorage.setItem("selection", e.target.value);
    this.setState({
      isChecked: !this.state.isChecked,
      selection: e.target.value,
    });
  }
  //allows us to alphabatize Airport list
  compare(a, b) {
    if (a.airportLocation < b.airportLocation) {
      return -1;
    }
    if (a.airportLocation > b.airportLocation) {
      return 1;
    }
    return 0;
  }
  //handles change to drop down menu
  handleSelectChange(selectedValue, location) {
    this.setState({
      [location]: selectedValue,
    });
  }
  //handles and stores change to calendar component
  handleCalenderChange(e) {
    localStorage.setItem(e.target.id, e.value);

    this.setState({
      [e.target.id]: e.value,
    });
  }

  render() {
    this.checkSignIn();
    let airports = this.state.airports;
    return (
      <div className="container ">
        <div className="row m-5 pb-5">
          <div className="card bg-subtle shadow-lg mb-5">
            <h2 className="text-center  mt-3">Book Flights</h2>
            <div className="card-body">
              <form>
                <div className="form-group ">
                  <div className="row">
                    <div className="form-check col-md-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Roundtrip"
                        readOnly
                        checked={this.state.selection === "Roundtrip"}
                        onClick={this.checkBoxHandler}
                      />
                      <label className="form-check-label"> Round Trip</label>
                    </div>
                    <div className="form-check col-md-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Oneway"
                        onClick={this.checkBoxHandler}
                        readOnly
                        checked={this.state.selection === "Oneway"}
                      />
                      One-way
                    </div>
                    <div className="form-check col-md-3">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value="Multicity"
                        onClick={this.checkBoxHandler}
                        readOnly
                        checked={this.state.selection === "Multicity"}
                      />
                      Multi-City
                    </div>
                  </div>
                  <div className="row mt-2">
                    <label className="col-3">Origin:</label>
                    <label className="col-3 offset-md-3">Destination:</label>
                  </div>

                  <div className="row">
                    <SelectorComponent
                      className=""
                      arrayOfData={airports}
                      location={"origin"}
                      size={"col-6 mt-2 mb-2"}
                      onSelectChange={this.handleSelectChange}
                    />
                    <SelectorComponent
                      className=""
                      size={"col-6 mt-2 mb-2"}
                      arrayOfData={airports}
                      location={"destination"}
                      onSelectChange={this.handleSelectChange}
                    />
                  </div>
                  {/** ternary to check if multiCity flights is choseb, if it is it asks user to select airports for second leg */}
                  {this.state.selection === "Multicity" ? (
                    <div>
                      <div className="row mt-2">
                        <label className="col-3">Origin:</label>
                        <label className="col-3 offset-md-3">
                          Destination:
                        </label>
                      </div>

                      <div className="row">
                        <SelectorComponent
                          className=""
                          size={"col-6 mt-2 mb-2"}
                          arrayOfData={airports}
                          location={"originTwo"}
                          onSelectChange={this.handleSelectChange}
                        />
                        <SelectorComponent
                          className=""
                          size={"col-6 mt-2 mb-2"}
                          arrayOfData={airports}
                          location={"destinationTwo"}
                          onSelectChange={this.handleSelectChange}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className="row mb-3 mt-2">
                    <div className="col col-md-3">
                      Depart:
                      <div className="row">
                        <CalendarComponent
                          id="departureDate"
                          min={this.state.minDate}
                          start="Year"
                          onChange={this.handleCalenderChange}
                        />
                      </div>
                    </div>
                    {/** ternary to check if it is a oneway, round trip or multicity to figure out claendar components are needed*/}
                    {this.state.selection !== "Oneway" ? (
                      <div className="col col-md-3 offset-md-2">
                        {this.state.selection === "Roundtrip" ? (
                          <div>Return:</div>
                        ) : (
                          <div>Depart:</div>
                        )}
                        <div className="row">
                          <CalendarComponent
                            id="returnDate"
                            min={this.state.departureDate}
                            start="Year"
                            onChange={this.handleCalenderChange}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                {/**book flight button that only appears when certain things are met should probably make it disabled until validations are met like create customer component */}
                <div className="row">
                  {localStorage.getItem("origin") &&
                  localStorage.getItem("destination") &&
                  localStorage.getItem("origin") !==
                    localStorage.getItem("destination") ? (
                    <Link
                      to={"/flights"}
                      className="btn btn-personal col-3 offset-md-8 mt-3 m-sm-5"
                    >
                      Search Flights!
                    </Link>
                  ) : null}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default FlightSearchComponent;
