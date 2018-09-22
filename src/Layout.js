import React, { Component } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Panel from "./components/AddEditPanel/Panel";

export default class Layout extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        {this.props.children}
        <Panel />
      </div>
    );
  }
}
