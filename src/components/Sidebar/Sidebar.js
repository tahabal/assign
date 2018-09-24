import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";

export default class Sidebar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__item">
          <div
            className="sidebar__title"
            onClick={e => this.props.setActive(e, "type")}
          >
            By Types
          </div>
          <div className="sidebar__submenu">{this.props.typeList}</div>
        </div>
        <div className="sidebar__item">
          <div
            className="sidebar__title"
            onClick={e => this.props.setActive(e, "rating")}
          >
            By Ratings
          </div>
          <div className="sidebar__submenu">{this.props.ratingList}</div>
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
