import React, { Component } from "react";
import "./App.css";
import ListCustomerComponent from "./components/customer/ListCustomerComponent";
import { Route, Switch } from "react-router-dom";
import CreateCustomerComponent from "./components/customer/CreateCustomerComponent";
import UpdateCustomerComponent from "./components/customer/UpdateCustomerComponent";
import ViewCustomerComponent from "./components/customer/ViewCustomerComponent";
import ListFlightComponent from "./components/flight/ListFlightComponent";
import CreateFlightComponent from "./components/flight/CreateFlightComponent";
import UpdateFlightComponent from "./components/flight/UpdateFlightComponent";
import CreateAirportComponent from "./components/airport/CreateAirportComponent";
import NavbarComponent from "./components/NavbarComponent";
import SignInComponent from "./components/customer/SignInComponent";
import FooterComponent from "./components/FooterComponent";
import FlightSearchComponent from "./components/flight/FlightSearchComponent";
import HomeComponent from "./components/HomeComponent";
import ViewFlightComponent from "./components/flight/ViewFlightComponent";
import EmployeeToolsComponent from "./components/employee/EmployeeToolsComponent";
import AccessDeniedComponent from "./components/helpers/AccessDeniedComponent";
import ReservationListComponent from "./components/flight/ReservationListComponent";
import FlightsByAirport from "./components/flight/FlightsByAirport";
import NotFound from "./components/helpers/NotFound";

class App extends Component {
  render() {
    localStorage.clear();
    return (
      <div>
        <NavbarComponent />
        <div className="container">
          <Switch>
            {/**routes for everyone */}
            <Route exact path="/" component={HomeComponent} />
            <Route path={"/sign-in"} component={SignInComponent} />
            <Route path="/register" component={CreateCustomerComponent} />
            <Route path={"/search"} component={FlightSearchComponent} />
            <Route path="/flights" component={ListFlightComponent} />
            <Route path="/view-flight/:id" component={ViewFlightComponent} />
            <Route path={"/accessDenied"} component={AccessDeniedComponent} />

            <Route
              path="/update-customer/:id"
              component={UpdateCustomerComponent}
            />
            <Route
              path="/view-customer/:id"
              component={ViewCustomerComponent}
            />
            {JSON.parse(sessionStorage.getItem("user")).roles[0].name ===
            "ROLE_EMPLOYEE" ? (
              <div>
                <Route path="/add-flight" component={CreateFlightComponent} />
                <Route
                  path={"/update-flight/:id"}
                  component={UpdateFlightComponent}
                />

                <Route
                  path={"/add-airport"}
                  component={CreateAirportComponent}
                />

                <Route
                  path={"/employee-tools"}
                  component={EmployeeToolsComponent}
                />
                <Route path="/customers" component={ListCustomerComponent} />

                <Route
                  path={"/flightsByAirport"}
                  component={FlightsByAirport}
                />
                <Route
                  path={"/view-reservations"}
                  component={ReservationListComponent}
                />
              </div>
            ) : null}
            <Route component={NotFound} />
          </Switch>
        </div>
        <FooterComponent />
      </div>
    );
  }
}

export default App;
