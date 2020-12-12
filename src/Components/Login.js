import React, { Component } from 'react';
import FacebookLogin from 'react-facebook-login';
import 'bootstrap/dist/css/bootstrap.min.css';

const API = 'https://fbmanagertest.herokuapp.com/api/usertoken/'
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            userID: "",
            name: "",
            email: "",
            picture: "",
            token: '',
            accesstoken: null

        }
    };
    componentClicked = () => console.log("clicked");

    page = (e) => {
        this.props.history.push({
            pathname: '/admin',
            state: this.state
        })

    }


    responseFacebook = response => {
        this.setState({
            userID: response.userID,
            name: response.name,
            email: response.clientSecret,
            picture: response.picture.data.url,
            birthday: response.birthday,
            token: response.accessToken
        });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": this.state.userID, "fb_token": this.state.token })
        };
        fetch(API, requestOptions)
            .then(response => response.json())
            .then(data => {
                this.setState({ 'accesstoken': data['token'] })
            }).then(this.setState({ isLoggedIn: true })).then((e) => this.page(e))
    };

    render() {
        let fbContent;
        fbContent = (
            <FacebookLogin
                appId="1107469806350895"
                autoLoad={false}
                fields="name,email,picture,birthday"
                onClick={this.componentClicked}
                callback={this.responseFacebook}

            />
        );


        return <div className='login'>{fbContent}</ div>;
    }
}
