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
    //check the current sort type from state and revert it
    if (this.state.sort === "Ascending") {
      sort = "Descending";
    } else {
      sort = "Ascending";
    }

    //push new sort type into state, then remake list

    this.setState({ sort }, () => this.makeList(this.state.filteredData));
  }

  handleRemove(id) {
    //create new entry list without the removed item

    let currentData = this.state.data.filter(val => {
      return val.id !== id;
    });

    this.setState({ data: currentData }, () => {
      this.handleFiltering();
      //send the updated item list to parents state
      this.props.onEdit(currentData);
    });
  }

  handleRatingChange(id, rating) {
    //find and change the rating of item with given id
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
    //create object for new item entry
    let newItem = {
      id: uuid(),
      type: this.state.newItemType,
      title: this.state.newItemTitle,
      rating: 3
    };
    //create a copy of current item list
    let newData = this.state.data.slice();
    //add new item to the copy
    newData.push(newItem);

    //replace the item list with new copy
    this.setState({ data: newData }, () => {
      this.handleFiltering();
      this.props.onEdit(newData);
    });
  }

  render() {
    //check if sort panel should be rendered or not. it should only render when items are listed by rating
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
