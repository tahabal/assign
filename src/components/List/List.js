import React, { Component } from "react";

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = { filterType: this.props.match.params.property };
  }

  componentDidMount() {
    console.log(this.state.filterType);
  }

  render() {
    return <div />;
  }
}
