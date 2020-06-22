import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

import axios from 'axios';
import queryString from 'query-string';


export default class DetailsNetworkingEvents extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: [],
            urlQueries: queryString.parse(this.props.location.search),
            show: false,  //whether or not the modal is showing
            redirectToMyList: false //whether or not to redirect to the my event list page
        }

        document.title = "Appli - Networking Event Details";

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }

    componentDidMount() {
        //TODO: check for missing id

        axios.get('/appli-job-app-tracker/networking/' + this.props.match.params.id)
            .then(response => {
                this.setState({ event: response.data })
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }



    drawPageContent() {
        //return the spinner if the db content isn't loaded yet
        if (this.state.event.length === 0) {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <Link to="/networking-events"><button className="btn btn-outline-dark mr-1" >Go Back</button></Link>
                        </div>
                        <div className="col-sm">
                            <div className="spinner-border d-flex justify-content-center" role="status" >
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        //else, if db content has been loaded

        //convert the date string to the text representation ie. 10 -> October
        let eventDate = new Date(this.state.event.event_date);
        //add a day because it subtracts a day for some reason
        eventDate.setDate(eventDate.getDate() + 1);
        console.log(eventDate);
        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        eventDate = eventDate.toLocaleString('en-CA', options);

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm">
                            <Link to="/networking-events"><button className="btn btn-outline-dark mr-1" >Go Back</button></Link>
                            <Link to={"/networking-events/update/" + this.state.event._id}><button className="btn btn-outline-secondary mr-1">Update Event</button></Link>
                            <button className="btn btn-outline-danger" onClick={this.handleShow} >Delete</button>
                        </div>
                        <div className="col-sm">
                            <h3>{this.state.event.event_title}</h3>
                            <div>{eventDate}</div>
                            <div>{this.state.event.event_location}</div>
                            <div>{this.state.event.event_host}</div>
                            <div>{this.state.event.event_description}</div>
                            <div>Is this a public event? {this.state.event.event_is_public}</div>
                            <div>Your rating: {this.state.event.event_rating}</div>
                            <div><a href={this.state.event.event_link} target="_blank">Link to event</a></div>
                            <div>Notes: {this.state.event.event_notes}</div>
                        </div>
                    </div>
                </div>
                {/*<!-- Modal --> https://bit.dev/react-bootstrap/react-bootstrap/modal*/}
                <Modal show={this.state.show} onHide={this.handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered >
                    <Modal.Header closeButton>
                        <Modal.Title></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this event from the database?</Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-outline-dark" onClick={this.handleClose}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={() => this.handleDelete(this.state.event._id)}>
                            Delete
                        </button>
                    </Modal.Footer>
                </Modal>
            </div>

        )

    }

    //MODAL METHODS
    handleClose() {
        console.log("hiding modal...");
        this.setState({ show: false });
    }

    handleShow() {
        console.log("showing modal...");
        this.setState({ show: true });
    }

    /**
     * Deletes an entry at the given id
     * @param {string} id the id of the entry being deleted
     */
    handleDelete(id) {
        console.log("deleting entry with id = " + id);
        axios.get("/appli-job-app-tracker/networking/delete/" + id)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
                    console.log("Event successfully deleted.");
                    //event deleted, redirect to list page
                    this.setState({ redirectToMyList: true });
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    /**
     * Checks if there are any CRUD actions in the URL and prints an alert panel to show it (ie. url?action=added will print a panel showing something has been added)
     */
    checkForAlerts() {
        if (this.state.urlQueries.action === "added") {
            return (
                <div class="alert alert-success " role="alert">
                    Networking event successfully added.
                </div>
            )
        }
        if (this.state.urlQueries.action === "updated") {
            return (
                <div class="alert alert-info " role="alert">
                    Networking event successfully updated.
                </div>
            )
        }
    }






    render() {
        //check state variable to see if it needs to redirect to my events page
        if (this.state.redirectToMyList == true) {
            return <Redirect to="/networking-events/my-events?action=deleted" />
        }
        return (
            <div className="contentcontainer" style={{ marginTop: 10 }}>
                <h1>Networking Events</h1>
                <h2>Networking Event Details</h2>
                {this.checkForAlerts()}


                {this.drawPageContent()}
            </div>
        );
    }
}