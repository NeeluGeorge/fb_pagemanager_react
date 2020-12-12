import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

export default class Page extends Component {
    constructor(props) {
        super(props);
        this.state = { about: '', website: '', page_token: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });

    }

    handleSubmit(event) {
        event.preventDefault();
        const id = new URLSearchParams(this.props.location.search).get('id')

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        }

        fetch("https://graph.facebook.com/" + id + '?fields=access_token&access_token=' + this.props.location.state.token
        )
            .then(response => response.json())
            .then(data => {
                this.setState({ page_token: data['access_token'] })
            })

            .then(async data => {
                await Promise.all(
                    [fetch('https://graph.facebook.com/' + id + '?about=' + this.state.about + '&website=' + this.state.website + '&access_token=' + this.state.page_token, requestOptions)
                        .then(response => {
                            response.json()
                            if (response.status === 200) { alert('Successfully updated') } else { alert('Sorry!!!Please try later') }
                        })
                    ]);

            })



    }

    render() {
        if (this.props.location.state ? true : null) {
            return (
                <form onSubmit={this.handleSubmit} id='frm'>
                    <label>
                        About:
            <input type="text" name="about" value={this.state.about} onChange={this.handleChange} />
                    </label>
                    <br></br><br></br>
                    <label>
                        Website:
            <input type="text" name="website" value={this.state.website} onChange={this.handleChange} />
                    </label>
                    <br></br><br></br>
                    <input type="submit" value="Submit" />
                </form>
            );
        }
        else {
            return <Redirect to='/' />
        }
    }
}