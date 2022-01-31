import React, { Component } from "react";

class SelecterListComponent extends Component {
  //   constructor(props) {
  //     super(props);
  //   }
  //On the change event for the select box pass the selected value back to the parent
  handleChange = (event) => {
    let selectedValue = event.target.value;
    this.props.onSelectChange(selectedValue);
  };
  render() {
    let arrayOfData = this.props.arrayOfData;

    let options = arrayOfData.map((data) => {
      if (data.airportName) {
        return (
          <option key={data.airportCode} value={data.airportCode}>
            {data.airportName} ({data.airportCode})
          </option>
        );
      } else if (data.aircraftCode) {
        return (
          <option key={data.id} value={data.aircraftCode}>
            {data.aircraftCode}
          </option>
        );
      } else {
        return (
          <option key={data} value={data}>
            {data}
          </option>
        );
      }
    });
    return (
      <select
        name="customSearch"
        className="form-select"
        onChange={this.handleChange}
      >
        <option key="beginner">Select Item</option> {options}
      </select>
    );
  }
}

export default SelecterListComponent;
