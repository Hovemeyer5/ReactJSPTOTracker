import React, { Component } from "react";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import uuidv1 from "uuid";
import { addPtoEntry, sortPtoEntries, calcEntryBalances } from "../store/actions";

const mapDispatchToProps = dispatch => {
  return {
    addPtoEntry: entry => dispatch(addPtoEntry(entry)),
    sortPtoEntries: () => dispatch(sortPtoEntries()),
    calcEntryBalances: () => dispatch(calcEntryBalances())
  };
};

const mapStateToProps = state => {
  return { entries: state.entries };
};

class ConnectedForm extends Component {
  initialState = {
    startDate: moment(),
    endDate: moment(),
    description: "",
    hoursRequested: 8,
    errors: []
  };
  constructor() {
    super();

    this.state = this.initialState;

    this.handleChange = this.handleChange.bind(this);
    this.handleStartDatePickerChange = this.handleStartDatePickerChange.bind(this);
    this.handleEndDatePickerChange = this.handleEndDatePickerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  daysBetween(firstDate, secondDate){
    let date1 = new Date(firstDate).getTime();
    let date2 = new Date(secondDate).getTime();
    let timeDiff = Math.abs(date2 - date1) ;
    const dayInMS = 1000*3600*24;
    timeDiff += dayInMS;
    return Math.ceil(timeDiff/dayInMS) * 8;
  }
  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
    if(this.state.errors.length > 0){
      this.validateEntry();
    }
  }
  setHoursRequested(startDate, endDate){
    if(startDate && endDate){
      let hoursRequested = this.daysBetween(startDate, endDate);
      this.setState({hoursRequested: hoursRequested})
    }
  }
  handleStartDatePickerChange(date){
    this.setState({ startDate: date});
    this.setHoursRequested(date, this.state.endDate);
    if(this.state.errors.length > 0){
      this.validateEntry();
    }
  }
  handleEndDatePickerChange(date){
    this.setState({ endDate: date});
    this.setHoursRequested(this.state.startDate, date);
    if(this.state.errors.length > 0){
      this.validateEntry();
    }
  }
  validateEntry(){
    let valid = true;
    this.setState({errors: []});
    if(!this.state.startDate || !this.state.endDate || !this.state.description.trim()){
      const error = {
        id: uuidv1(),
        message: "Requires Start Date, End Date, and Description"
      };
      this.setState({errors: [...this.state.errors, error]});
      valid = false;
    }

    if(this.state.startDate > this.state.endDate){
      const error = {
        id: uuidv1(),
        message: "Start Date must be less then End Date"
      };
      this.setState({errors: [...this.state.errors, error]});
      valid = false;
    }
    return valid;
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.validateEntry()){
      return;
    }

    const { description, hoursRequested } = this.state;
    let startDate = this.state.startDate.format("MM/DD/YYYY");
    let endDate = this.state.endDate.format("MM/DD/YYYY");
    const credit = 0;
    const used = hoursRequested;
    const id = uuidv1();
    this.props.addPtoEntry({ id, startDate, endDate, description, used, credit });
    this.props.sortPtoEntries();
    this.props.calcEntryBalances();
    this.setState(this.initialState);
  }

  render() {
    const { startDate, endDate, description, hoursRequested } = this.state;

    return (
       <form onSubmit={this.handleSubmit}>
        <div className="row">
          <div className="col-md-3 ">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <DatePicker className="form-control"
                selected={startDate}
                onChange={this.handleStartDatePickerChange}
              />
            </div>
          </div>
          <div className="col-md-3 ">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <DatePicker className="form-control"
                selected={endDate}
                onChange={this.handleEndDatePickerChange}
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
                required
              />
            </div>
          </div>
          <div className="col-md-3 ">
            <button type="submit" className="submit-pto-entry btn btn-success btn-lg form-control">
              Request {hoursRequested} Hours
            </button>
          </div>
        </div>
        <div className={'alert alert-danger' + (this.state.errors.length > 0 ? '' : 'hide')}>
          {this.state.errors.map(error => (
            <p key={error.id} className="red">{error.message}</p>
          ))}
        </div>
      </form>
    );
  }
}

const Form = connect(mapStateToProps, mapDispatchToProps)(ConnectedForm);

export default Form;