import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import MyResponsiveCalendar from './calendar-view.component';
import axios from "axios";


/**
 * The main landing page for Data Visualization
 */
export default class DataVizHomeComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {datum: []};
    }

    componentWillMount() {
        document.title = "Appli - Networking Events";
    }

    componentDidMount(){
        axios.get('http://localhost:4000/appli-job-app-tracker/calendarviz')
            .then(response => {
                this.setState({datum: response.data})
            })
            .catch(function(error) {
                console.log(error);
            })
    }

    render() {
        return (
            <div className="contentcontainer" style={{ marginTop: 10, height: "75vh" }}>
                <h1>Data Visualization: Applications</h1>

                <div className="container" style={{ marginTop: 10, height: "50vh"}}>
                    <MyResponsiveCalendar  datum={this.state.datum} />
                </div>



            </div>
        );
    }
}