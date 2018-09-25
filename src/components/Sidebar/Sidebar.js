import React, { Component } from "react";
import { Link } from "react-router-dom";
import uuid from "uuid";

import "./Sidebar.css";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  renderTypeList() {
    //create children array from incoming list in props.
    return this.props.typeList.map((val, index) => {
      return (
        <Link className="sidebar__sublink" to={"/type/" + val} key={index}>
          {val}
        </Link>
      );
    });
  }

  renderRatingList() {
    //create children array from incoming list in props.

    let content = [];
    Object.entries(this.props.ratingList).forEach(item => {
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
    let types = this.renderTypeList();
    let ratings = this.renderRatingList();
    return (
      <div className="sidebar">
        <div className="sidebar__item">
          <div
            className="sidebar__title"
            onClick={e => this.props.setActive(e, "type")}
          >
            By Types
          </div>
          <div className="sidebar__submenu">{types}</div>
        </div>
        <div className="sidebar__item">
          <div
            className="sidebar__title"
            onClick={e => this.props.setActive(e, "rating")}
          >
            By Ratings
          </div>
          <div className="sidebar__submenu">{ratings}</div>
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
