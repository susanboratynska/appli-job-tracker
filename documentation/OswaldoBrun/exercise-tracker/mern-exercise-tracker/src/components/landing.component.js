import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Landing extends Component{
    render (){
        return(
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s6">
              <Link
                to="/user"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-primary"
              >
                Register
              </Link>
            </div>
            <div className="col s6">
              <Link
                to="/login"
                style={{
                  width: "140px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px"
                }}
                className="btn btn-primary"
              >
                Log In
              </Link>
            </div>
          </div>
        </div>


        );
    }
}