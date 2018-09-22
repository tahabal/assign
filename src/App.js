import React, { Component } from "react";
import { Route } from "react-router";
import Layout from "./Layout";
import List from "./components/List/List";
import "./App.css";

import data from "./data.json";

class App extends Component {
  render() {
    return (
      <Layout>
        <Route exact path="/" component={List} />
        <Route path="/:property/:value" component={List} />
      </Layout>
    );
  }
}

export default App;
