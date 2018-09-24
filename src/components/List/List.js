import React, { Component } from "react";
import uuid from "uuid";

import ListItem from "./ListItem";
import "./List.css";

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filterType: this.props.match.params.property,
      data: this.props.data,
      filteredData: [],
      list: [],
      sort: "Descending",
      newItemType: "",
      newItemTitle: ""
    };

    this.handleSorting = this.handleSorting.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.addNewItem = this.addNewItem.bind(this);
  }

  handleFiltering() {
    let property = this.props.match.params.property;
    let value = this.props.match.params.value;
    let data = this.state.data;
    let list = [];
    switch (property) {
      case "type":
        list = data.filter(val => {
          return val.type === value;
        });

        break;

      case "rating":
        list = data.filter(val => {
          return val.rating === parseInt(value, 10);
        });

        break;
      default:
        list = data;
        break;
    }
    this.makeList(list);
  }

  componentDidMount() {
    this.handleFiltering();
  }

  componentDidUpdate(prevProps) {
    let {
      location: { pathname }
    } = this.props;

    if (prevProps.location.pathname !== pathname) {
      this.setState(
        { filterType: this.props.match.params.property },
        this.handleFiltering()
      );
    }
  }

  makeList(list) {
    let sorted;
    switch (this.state.sort) {
      case "Ascending":
        sorted = list.sort((a, b) => {
          return a.rating - b.rating;
        });
        break;

      case "Descending":
        sorted = list.sort((a, b) => {
          return b.rating - a.rating;
        });
        break;

      default:
        break;
    }
    let arr = sorted.map(val => (
      <ListItem
        title={val.title}
        rating={val.rating}
        key={uuid()}
        id={val.id}
        handleRemove={this.handleRemove}
        ratingChange={this.handleRatingChange}
      />
    ));
    this.setState({ list: arr, filteredData: list });
  }

  handleSorting() {
    let sort;
    if (this.state.sort === "Ascending") {
      sort = "Descending";
    } else {
      sort = "Ascending";
    }

    this.setState({ sort }, () => this.makeList(this.state.filteredData));
  }

  handleRemove(id) {
    let currentData = this.state.data.filter(val => {
      return val.id !== id;
    });
    this.setState({ data: currentData }, () => {
      this.handleFiltering();
      this.props.onEdit(currentData);
    });
  }

  handleRatingChange(id, rating) {
    let currentData = this.state.data.filter(val => {
      if (val.id === id) {
        return (val.rating = rating);
      }
      return val.id !== id;
    });

    this.setState({ data: currentData }, () => {
      this.handleFiltering();
      this.props.onEdit(currentData);
    });
  }

  handleInput(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  addNewItem() {
    let newItem = {
      id: uuid(),
      type: this.state.newItemType,
      title: this.state.newItemTitle,
      rating: 3
    };
    let newData = this.state.data.slice();
    newData.push(newItem);
    this.setState({ data: newData }, () => {
      this.handleFiltering();
      console.log(newData);
      this.props.onEdit(newData);
    });
  }

  render() {
    let shouldSortBeRendered = this.state.filterType !== "rating";

    return (
      <div className="list-wrapper">
        {shouldSortBeRendered && (
          <div className="sort">
            Sort:
            <div className="sort-order" onClick={this.handleSorting}>
              {this.state.sort}
            </div>
          </div>
        )}

        <div className="list">{!this.state.loading && this.state.list}</div>
        <div className="panel">
          <span>Add new item:</span>
          <input
            type="text"
            value={this.state.newItemTitle}
            name="newItemTitle"
            placeholder="Title"
            onChange={this.handleInput}
          />
          <input
            type="text"
            placeholder="Type"
            value={this.state.newItemType}
            name="newItemType"
            onChange={this.handleInput}
          />
          <div className="panel-button" onClick={this.addNewItem}>
            Create!
          </div>
        </div>
      </div>
    );
  }
}
