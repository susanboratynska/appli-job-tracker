import React, { Component } from 'react';

export default class HomeComponent extends React.Component {
    componentWillMount() {
        document.title = "Appli - Home";
    }

    render() {
        return (
            <div>
                Placeholder content - this will be changed to whatever we want our homepage to be. Here's a picture to keep us all motivated. 
                <img src="https://miro.medium.com/max/1162/1*Zhoud0k2og_RhM34wqFy8w.png" width="500" />
            </div>
        );
    }
}