import React, { Component } from "react";
import { Link } from "react-router-dom";
import uuid from "uuid";

import "./Sidebar.css";

import data from "../../data.json";

export default class Sidebar extends Component {
  constructor() {
    super();

    this.state = {
      types: {},
      ratings: {},
      loading: true
    };

    this.typeMenu = React.createRef();
    this.ratingMenu = React.createRef();
  }

  handleClick(e, option) {
    e.target.parentNode.classList.toggle("active");
  }

  componentDidMount() {
    //get types from data
    let types = [...new Set(data.map(item => item.type))];

    //get rating counts
    let ratings = data.map(item => item.rating);
    ratings = ratings.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    this.setState({ types, ratings, loading: false });
  }

  renderTypeList() {
    return this.state.types.map((val, index) => {
      return (
        <Link className="sidebar__sublink" to={"/type/" + val} key={index}>
          {val}
        </Link>
      );
    });
  }

  renderRatingList() {
    let content = [];
    Object.entries(this.state.ratings).forEach(item => {
      let key = item[0];
      let value = item[1];

      content.push(
        <Link key={uuid()} className="sidebar__sublink" to={"/rating/" + key}>
          {key} Stars ( {value} )
        </Link>
      );
    });
    return content;
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__item">
          <div
            className="sidebar__title"
            onClick={e => this.handleClick(e, "type")}
          >
            By Types
          </div>
          <div className="sidebar__submenu">
            {!this.state.loading && this.renderTypeList()}
          </div>
        </div>
        <div className="sidebar__item">
          <div
            className="sidebar__title"
            onClick={e => this.handleClick(e, "rating")}
          >
            By Ratings
          </div>
          <div className="sidebar__submenu">
            {!this.state.loading && this.renderRatingList()}
          </div>
        </div>
        <div className="sidebar__item showAll">
          <Link className="sidebar__title" to="/">
            All
          </Link>
        </div>
      </div>
    );
  }
}
