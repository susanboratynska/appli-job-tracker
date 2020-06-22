import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Day extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dateValue: props.dateValue,
      value: props.value,
      getData: props.getData,
      events: [],
      showEvent: props.showEvent === undefined ? false : props.showEvent,
      calendar: props.calendar
    } 
  }
  
  componentDidMount() {
    //Here we will grab the data from the database using Axios
    //this.state.value = 1;

    /* Code to be used when moving to shared project
      //if we showing the events in the Calendar Month View
      if (this.state.showEvent) {}
        //Get all the Job Application and Networking
        Promise.all([
          axios.get('http://localhost:3000/appli-job-app-tracker/jobapps'),
          axios.get('http://localhost:3000/appli-job-app-tracker/networking')
        ]).then(([result1, result2]) => {
          var events = [];
          events.push(result1.data);
          events.push(result2.data);
          this.setState(
              {events: events}
            )
        })
      }
      //Must have some way to get on a specific day using the dateValue
      else {

      }
    */

    //Test Dummy code
    if (this.state.value === 12) {
      var events = [];
      events.push({
        name: "Apply to Prepr",
        type: "Apply"
      });
      events.push({
        name: "Interview with Shopify",
        type: "Interview"
      });

      this.setState({
        events: this.state.events.concat(events)
      });
    }

  }

  //Function that checks if the eventName and the eventType passes the filter condition
  //Return: bool
    //true: if the condition is meet
    //false: otherwise
  //Param:
    //eventName: The name of the event
    //eventType: The type of the event (Apply, Interview, Network)
  checkEventPassFilter(eventName, eventType) {
    if (!eventName.includes(this.state.calendar.state.filterText)) {
      return false;
    }
    if (this.state.calendar.state.filterEventType === "") {
      return true;
    }
    else if (!(eventType === this.state.calendar.state.filterEventType)) {
      return false;
    }
    return true;
  }

  //Function that will notify that the calendar must show the events of a paticular day
  showDay() {
    this.setState({showEvent: true});
    this.state.calendar.setState(
      {
        day: this.state.value,
        dayComponent: this,
        mode: "day"
      });
  }
  
  render() {  
    const events = [];
    //Showing the day on the calendar
    if (this.state.showEvent) {
      for (let index = 0; index < this.state.events.length; index++) {
        if (this.checkEventPassFilter(this.state.events[index].name, this.state.events[index].type)) {
          events.push(
            <div key={"events-" + index} className={this.state.events[index].type.toLowerCase()} >
              {this.state.events[index].type}
            </div>
            );
        }
      }
      return (
        <div>
          {events}
        </div>
      );
    }
    //Showing the event in the month view
    else {
      for (let index = 0; index < this.state.events.length; index++) {
        if (this.checkEventPassFilter(this.state.events[index].name, this.state.events[index].type)) {
          events.push(
            <div key={"events-" + index} className={this.state.events[index].type.toLowerCase()} >
              {this.state.events[index].type}
            </div>
            );
        }
      }
      return (
          <div>
            <button className="dayHeader" onClick={() => this.showDay()}>
                { this.state.value }
            </button>
            {events}
          </div>
      );
    }
  }
}

//My custom made calendar
class MyCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        filterText: "",
        filterEventType: "",
        day: 1,
        dayComponent: null,
        month: 1,
        year: 2020,
        mode: "month"
    }

    //Functions that are binded when the user types or select the filter inputs
    this.onChangeFilterText = this.onChangeFilterText.bind(this);
    this.onChangeFilterEventType = this.onChangeFilterEventType.bind(this);
  }

  componentDidMount() {
    //Get the current date
    var date = new Date();
    this.setState({
      month: date.getMonth(),
      year: date.getFullYear()
    });
  }

  /*
  Function that returns the number of days in a month
  Returns a number: 28, 29, 30, or 31
  Param:
    month: The actual month in a calendar (1-12)
    year: The actual year in a calendar (2020)
  */
  daysInMonth(month, year) { 
    return new Date(year, month, 0).getDate(); 
  } 

  prev() {
    if (this.state.mode === "day") {
      var date = new Date(this.state.year, this.state.month, this.state.day - 1); 
      this.setState({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      });
    }
    else if (this.state.mode === "month") {
      //if the month is Jan then must go back a year and have month to Dec
      if (this.state.month === 0) {
        this.setState({
          month: 11,
          year: this.state.year - 1
        });
      } 
      else {
        //The reason for this.state.month is not decrease by one for the daysInMonth function is that the parameter is accepting not a zero index value which our month value
        this.setState({
          month: this.state.month - 1
        });
      }  
    }
    else if (this.state.mode === "monthSelect") {
      this.setState({
        year: this.state.year - 1
      });
    }
    else if (this.state.mode === "yearSelect") {
      this.setState({
        year: Math.floor(this.state.year / 10) * 10 - 10
      });
    }

  }
  
  next() {
    if (this.state.mode === "day") {
      var date = new Date(this.state.year, this.state.month, this.state.day + 1); 
      this.setState({
        day: date.getDate(),
        month: date.getMonth(),
        year: date.getFullYear()
      });
    }
    else if (this.state.mode === "month") {
      //if the month is Jan then must go back a year and have month to Dec
      if (this.state.month === 11) {
        this.setState({
          month: 0,
          year: this.state.year + 1
        });
      } 
      else {
        this.setState({
          month: this.state.month + 1
        });
      }  
    }
    else if (this.state.mode === "monthSelect") {
      this.setState({
        year: this.state.year + 1
      });
    }
    else if (this.state.mode === "yearSelect") {
      this.setState({
        year: Math.floor(this.state.year / 10) * 10 + 10
      });
    }
  }

  //Function that changes the body of the calendar
  //Only gets called from the nav button on the calendar
  changeBody() {
    switch(this.state.mode) {
      case "day":
        this.setState({mode: "month"});
        break;
      case "month": 
        this.setState({mode: "monthSelect"});
        break;
      case "monthSelect": 
        this.setState({mode: "yearSelect"});
        break;
      default:
        break;
    }
  }


  /*
  Function that changes the month of the calendar
  Returns nothing (void)
  Param:
    index: The index value of the month selected (0-11)
  */
  selectMonth(index) {
    this.setState({
      month: index,
      mode: "month"
    });
  }

  /*
  Function that changes the year of the calendar
  Returns nothing (void)
  Param:
    index: The index value of the year selected
  */
  selectYear(index) {
    this.setState({
      year: index,
      mode: "monthSelect"
    });
  }


  onChangeFilterText(e) {
    this.setState({
      filterText: e.target.value
    });
  }

  onChangeFilterEventType(e) {
    this.setState({
      filterEventType: e.target.value
    });
  }

  renderCalendarFilter() {
    return (
      <div className="calendarFilter">
        <div>
            <label>Filter Text: </label >
            <input  
              type="text"
              className="form-control col-sm-6"
              value={this.state.filterText}
              onChange={this.onChangeFilterText}
            />
        </div>
        <div>
          <label>
            Event Type:
            <select value={this.state.value} onChange={this.onChangeFilterEventType}>
              <option value="">None</option>
              <option value="Apply">Apply</option>
              <option value="Interview">Interview</option>
              <option value="Network">Network</option>
            </select>
          </label>
        </div>
      </div>
    );
  }

  renderCalendarNav() {
    var date = new Date(this.state.year, this.state.month, 1);
    //Get the month name
    var monthName = date.toLocaleString('default', { month: 'long' });
    var navHeader;
    if (this.state.mode === "day") {
      navHeader = <button onClick={() => this.changeBody()}>{monthName} {this.state.day} {this.state.year}</button>;
    }
    if (this.state.mode === "month") {
      navHeader = <button onClick={() => this.changeBody()}>{monthName} {this.state.year}</button>;
    } 
    else if (this.state.mode === "monthSelect") {
      navHeader = <button onClick={() => this.changeBody()}>{this.state.year}</button>;
    }
    else if (this.state.mode === "yearSelect") {
      navHeader = 
        <div>
          {Math.floor(this.state.year / 10) * 10} - {Math.floor(this.state.year / 10) * 10 + 9}
        </div>;
    }

    return (
      <div className="calendarNav">
        <button onClick={() => this.prev()}>Prev</button>
        {navHeader}
        <button onClick={() => this.next()}>Next</button>
      </div>
    );


  }

  renderCalendarBody() {
    if (this.state.mode === "day") {
      return this.renderDay();
    } 
    else if (this.state.mode === "month") {
      return this.renderMonth();
    }
    else if (this.state.mode === "monthSelect") {
      return this.renderMonthSelect();
    }
    else if (this.state.mode === "yearSelect") {
      return this.renderYearSelect();
    }
  }

  renderDay() {
    return (
      <div key={this.state.day} className="event">
          <Day 
            dateValue={new Date(this.state.year, this.state.month, this.state.day)}
            value={this.state.day}
            getData={false}
            showEvent={true}
            calendar={this}
            />
      </div>
    );
  }

  renderMonth() {
    //Have to find what day the first day of the month is
    
    //Plan to use css grid to decide how the day will show up

    //Get the current date
    var firstDay = new Date(this.state.year, this.state.month, 1);
    const days = [];
    
    //We only need to set the first day for the css class and the css grid will auto display it in a calendar
    var gridClassNames;
    var firstDayClassName = "week-" + firstDay.getDay();
    gridClassNames = [
      firstDayClassName,
      "day"
    ];
    gridClassNames = gridClassNames.join(' ');
    //getData is used to know for grabbing the data from the database events
    days.push(
        <div key={1} className={gridClassNames}>
          <Day value={1} dateValue={firstDay} getData={false} calendar={this} />
        </div>
      );
    
    var currentDate = firstDay;
    var numDays = this.daysInMonth(this.state.month + 1, this.state.year);
    for (let index = 2; index < numDays + 1; index++) {
      //We have to create a new Date object due to when it is saving in the component it is using reference instead of value
      currentDate = new Date(firstDay.getFullYear(), firstDay.getMonth(), index);
      days.push(
        <div key={index} className="day">
          <Day value={index} dateValue={currentDate} getData={false} calendar={this} />
        </div>
      );
    }
    return (
        <div className="month">
          <div className="monthHeader">SUN</div>
          <div className="monthHeader">MON</div>
          <div className="monthHeader">TUE</div>
          <div className="monthHeader">WED</div>
          <div className="monthHeader">THU</div>
          <div className="monthHeader">FRI</div>
          <div className="monthHeader">SAT</div>
          {days}
        </div>
      );
  }

  renderMonthSelect() {
    const monthSelctions = [];
    var date;
    var monthName;
    for (let index = 0; index < 12; index++) {
      date = new Date(2020, index, 1);
      monthName = date.toLocaleString('default', { month: 'short' });
      monthSelctions.push(
        <button key={monthName} value={index} onClick={() => this.selectMonth(index)}>
          {monthName}
        </button>
      );
    }

    return (
      <div className="monthSelect">
        {monthSelctions}
      </div>
    );
  }

  renderYearSelect() {
    const yearSelctions = [];
    var decadeYear = Math.floor(this.state.year / 10) * 10;
    for (let index = 0; index < 10; index++) {
      yearSelctions.push(
        <button key={decadeYear + index} value={decadeYear + index} onClick={() => this.selectYear(decadeYear + index)}>
          {decadeYear + index}
        </button>
      );
    }

    return (
      <div className="yearSelect">
        {yearSelctions}
      </div>
    );
  }

  //Plan to render a nav and a body for the calendar
  render() {
    return (
      <div className="calendar">
        My Calendar
        {this.renderCalendarFilter()}
        {this.renderCalendarNav()}
        {this.renderCalendarBody()}
      </div>
    );
  }
}



ReactDOM.render(
    <MyCalendar />,
    document.getElementById('root')
);

