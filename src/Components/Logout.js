import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Logout extends Component {
    render() {
        return (
            <div className="logout">
                You have been successfully logged out!!!Thank You
                <br></br>
                <Link to="/" className="btn btn-info">Click here to login again</Link>

            </div>
        )
    }
}
