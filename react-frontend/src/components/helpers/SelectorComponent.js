import React, { Component } from "react";
import SelecterListComponent from "../helpers/SelecterListComonent";

class SelectorComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedValue: "Nothing selected" };
  }
  handleSelectChange = (selectedValue) => {
    this.setState({ selectedValue: selectedValue });
    this.props.onSelectChange(selectedValue, this.props.location);
    localStorage.setItem(this.props.location, selectedValue);
  };
  render() {
    return (
      <div className={this.props.size}>
        <SelecterListComponent
          arrayOfData={this.props.arrayOfData}
          onSelectChange={this.handleSelectChange}
        />
      </div>
    );
  }
}

export default SelectorComponent;
