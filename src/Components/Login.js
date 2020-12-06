import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';
import Admin from './Admin'
import { Redirect } from 'react-router-dom';
export default class Login extends Component {
    state = {
        isLoggedIn: false,
        userID: "",
        name: "",
        email: "",
        picture: ""
    };


    responseFacebook = response => {
        console.log(response);
        const token = localStorage.setItem("token", response.accessToken)
        this.setState({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.clientSecret,
            picture: response.picture.data.url,
            birthday: response.birthday,
            token: localStorage.getItem("token")
        });
    };

    componentClicked = () => console.log("clicked");
    render() {
        let fbContent;


        if (this.state.isLoggedIn) {
            // fbContent = (
            //     <div
            //         style={{
            //             width: "400px",
            //             margin: "auto",
            //             background: "#grey",
            //             padding: "20px"
            //         }}
            //     >
            //         <img src={this.state.picture} alt={this.state.name} />
            //         <h2>Welcome {this.state.name} {this.state.token}</h2>
            //   Email: {this.state.email}
            //     </div>
            // );
            return <Redirect to="/admin" />
        }
        else {
            fbContent = (
                <FacebookLogin
                    appId="1071661903276762"
                    autoLoad={false}
                    fields="name,email,picture,birthday"
                    onClick={this.componentClicked}
                    callback={this.responseFacebook}
                // scope="public_profile,user_friends,user_actions.Test"
                //  callback={this.responseFacebook}
                />
            );
        }

        return <div>{fbContent}</div>;
    }
}
