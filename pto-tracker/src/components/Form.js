import React, { Component } from "react";
import { connect } from "react-redux";
import uuidv1 from "uuid";
import { addPtoEntry } from "../store/actions";

const mapDispatchToProps = dispatch => {
  return {
    addPtoEntry: entry => dispatch(addPtoEntry(entry))
  };
};

const mapStateToProps = state => {
  return { entries: state.entries };
};

class ConnectedForm extends Component {
  constructor() {
    super();

    this.state = {
      startDate: "",
      endDate: "",
      description: "",
      hoursRequested: 0.00,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  daysBetween(firstDate, secondDate){
    let date1 = new Date(firstDate).getTime();
    let date2 = new Date(secondDate).getTime();
    let timeDiff = Math.abs(date2 - date1);
    const dayInMS = 1000*3600*24;
    return Math.ceil(timeDiff/dayInMS);
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    if(this.state.endDate && this.state.startDate){
      let hoursRequested = this.daysBetween(this.state.startDate, this.state.endDate);
      this.setState({hoursRequested: hoursRequested})
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { startDate, endDate, description, hoursRequested } = this.state;
    const credit = 0;
    const used = hoursRequested;
    const id = uuidv1();
    let lastEntry = {
      earnedBalance: 0,
      projectedBalance: 0
    }
    if(this.props.entries.length > 0){
      lastEntry = this.props.entries[this.props.entries.length -1];
    }
    let earnedBalance = lastEntry.earnedBalance - used;
    let projectedBalance = lastEntry.projectedBalance - used;
    this.props.addPtoEntry({ id, startDate, endDate, description, used, credit, earnedBalance, projectedBalance });
    this.setState(
      { 
        startDate: "",
        endDate: "",
        description: "",
        hoursRequested: 0.00
      });
  }

  render() {
    const { startDate, endDate, description, hoursRequested } = this.state;

    return (
       <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-3 ">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="dateTime"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="dateTime"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={description}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="col-md-3 ">
            <button type="submit" className="submit-pto-entry btn btn-success btn-lg form-control">
              Request {hoursRequested} Hours
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default Form;