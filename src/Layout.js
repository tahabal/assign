import React, { Component } from "react";
import Sidebar from "./components/Sidebar/Sidebar";

export default class Layout extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        {this.props.children}
      </div>
    );
  }
}
