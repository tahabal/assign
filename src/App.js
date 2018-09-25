import React, { Component } from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";
import List from "./components/List/List";
import "./App.css";

import data from "./data.json";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data,
      types: {},
      ratings: {},
      loading: true
    };

    this.editData = this.editData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e, option) {
    e.target.parentNode.classList.toggle("active");
  }

  editData(newData) {
    console.log(newData);
    this.setState({ data: newData }, () => this.createSidebarArrays());
  }

  componentDidMount() {
    this.setState(
      prevState => ({
        loading: !prevState.loading
      }),
      this.createSidebarArrays()
    );
  }

  createSidebarArrays() {
    //get types from data
    let types = [...new Set(this.state.data.map(item => item.type))];

    //get rating counts
    let ratings = this.state.data.map(item => item.rating);
    ratings = ratings.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    this.setState({ types, ratings });
  }

  render() {
    if (!this.state.loading) {
      let ratingList = this.state.ratings;
      let typeList = this.state.types;
      let list = props => (
        <List data={this.state.data} onEdit={this.editData} {...props} />
      );
      return (
        <div className="wrapper">
          <Sidebar
            ratingList={ratingList}
            typeList={typeList}
            setActive={this.handleClick}
          />
          <Route exact path="/" component={list} />
          <Route path="/:property/:value" component={list} />
        </div>
      );
    } else {
      return "Yükleniyor";
    }
  }
}

export default App;
