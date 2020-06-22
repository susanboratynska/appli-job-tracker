import React, { Component } from 'react';
import {BrowserRouter as Router, Link, Route, useParams} from 'react-router-dom';
import axios from 'axios';
import helpers from "../../functions/susan-helperfunctions";

import PaginationComponent from "./pagination.component";
import AddJobAppComponent from "./add-jobapp.component";



const JobApp = props => (
    <tr>
        { displayStatus(props.jobapp.jobapp_status) }
        <td>{props.jobapp.jobapp_title}</td>
        { displayURL( props.jobapp.jobapp_companywebsite, props.jobapp.jobapp_companyname ) }
        <td>{ helpers.formatDateString(props.jobapp.jobapp_applydate) }</td>
        <td>
            <Link to={"/jobapp/show/" + props.jobapp._id } className='tooltip-toggle' data-tooltip='See Details'><img src="/images/icons/list.svg" alt="See Job Application" className="table__icons"/></Link>
            <Link to={"/jobapp/update/" + props.jobapp._id } className='tooltip-toggle' data-tooltip='Edit'><img src="/images/icons/edit-button.svg" alt="Edit Job Application" className="table__icons"/></Link>
            <Link to={"/jobapp/delete/" + props.jobapp._id } className='tooltip-toggle' data-tooltip='Delete'><img src="/images/icons/quit.svg" alt="Delete Job Application" className="table__icons"/></Link>
        </td>
    </tr>
)

// ---------- Functions ---------- //


// Function to display boolean status:
function displayStatus (stringStatus) {
    if (stringStatus === true) {
        return <td>Closed</td>
    }
    else {
        return <td>Open</td>
    }
}

// Function to display link if exists:
function displayURL (website, company) {
    if (website) {
        return <td><a href={website} target="_blank">{company}</a></td>
    } else {
        return <td>{company}</td>
    }
}



export default class ListJobAppComponent extends Component {

    // Take a constructor and pass in props from the component:
    constructor(props) {
        // Taking the parent constructor and passing in props:
        super(props);
        // Set initial state object to contain a property of jobapp:
        // And that property is initially containing an empty array:
        this.state = {jobapp: [], count: 1, page: parseInt(this.props.match.params.pageIndex), previousPage: [1]};
        this.jobAppList = this.jobAppList.bind(this);
        this.changePage = this.changePage.bind(this);
        this.onBackButtonEvent = this.onBackButtonEvent.bind(this);

    }

    changePage(page) {

        window.onpopstate = this.onBackButtonEvent;
        axios.get(`http://localhost:4000/appli-job-app-tracker/jobapps/page/${page}`)
            .then(response => {
                this.setState({jobapp: response.data});
                this.setState({page: page});

            })
            .catch(function(error) {
                console.log(error);
            })

    }

    // Need ot initialize the jobapp state property here with the jobapp
    // need to find a way to initially send request to teh backend, to get the response
    // back a list of jobapp items to set the state property accordingly
    componentDidMount(){

        axios.get(`http://localhost:4000/appli-job-app-tracker/jobapps/page/${this.state.page}`)
            .then(response => {
                this.setState({jobapp: response.data});

            })
            .catch(function(error) {
                console.log(error);
            })

    }
        //quick solution to backwards-forwards browser button history fix
        onBackButtonEvent(e) {
        e.preventDefault();
        this.changePage(parseInt(this.props.match.params.pageIndex));
    }

    // Create jobAppList method:
    jobAppList() {
        // Iterate over elements
        // map callback function gets all items
        return this.state.jobapp.map((currentJobApp, i) => {

                return <JobApp jobapp={currentJobApp} key={i} />;


        })
    }




    render() {

        return (

            <div className="contentcontainer">

                <h1>Job Applications</h1>
                <div className="page__nav">
                    <a href="/jobapp/add" className="btn btn-outline-primary">Add New Job</a>
                    <form>
                        <label for="jobapplist_search" hidden>Search</label>
                        <input className="search__bar" id="jobapplist_search" type="text" placeholder="Search" ></input>
                    </form>

                </div>
                <PaginationComponent page={this.state.page} pageChange={this.changePage} />
                <table className="table table-striped list__table" style={{marginTop: 20}} >
                    <thead>
                        <tr id="jobapp__tablehead">
                            <th>Status</th>
                            <th>Job Title</th>
                            <th>Company</th>
                            <th>Application Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.jobAppList() }
                    </tbody>
                </table>
            </div>
        )
    }
}