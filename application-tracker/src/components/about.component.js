import React, { Component } from 'react';


export default class AboutComponent extends Component {
    render() {
        return (
            <div className="contentcontainer">
                <h1>About Page</h1>
                <div>
                    <p>
                        Lorem ipsum.
                        Here’s an easy way for you to keep track of where you’ve applied, networking events, and contacts you’ve made along the way.
                        Think of it as your central hub, or your little black book to keep track of the connections you’ve made over the years. <br/>
                    </p>
                    <div>
                        <strong>Job Tracker allows you to easily track:</strong>
                        <ul>
                            <li>Job Applications</li>
                            <li>Networking Events</li>
                            <li>Connections</li>
                        </ul>
                    </div>
                    <div className="about__buttons">
                        <div>
                            <button className="btn btn-outline-primary">Create Account</button>
                        </div>
                        <div>
                            <button className="btn btn-outline-primary">Login</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}