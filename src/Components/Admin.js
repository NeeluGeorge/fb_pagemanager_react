import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Breadcrumb, Button, Table } from 'react-bootstrap';

import '../App.css'
import { Redirect } from 'react-router-dom';


const API = 'https://fbmanagertest.herokuapp.com/api/usertoken/'

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: null,
            id: null,
            email: null,
            pages: [],
            token: ''
        };
    }

    logout = () => {
        localStorage.removeItem('accesstoken');
        this.setState = {};
        this.props.history.replace({ pathname: '/logout' })

    }
    page = (e) => {

        this.props.history.push({
            pathname: '/page', search: new URLSearchParams({ id: e.target.id }).toString()
            , state: this.state
        })

    }

    componentDidMount() {
        if (this.props.location.state ? true : null) {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + this.props.location.state.accesstoken
                },
            };

            fetch(API, requestOptions).then(response => response.json()).then(data => {
                this.setState({ token: data['token'] })
            })
                .then(async data => {
                    await Promise.all(
                        [fetch('https://graph.facebook.com/me?fields=name,email,id&access_token=' + this.state.token)
                            .then(response => response.json())
                            .then(data => this.setState({ name: data.name, id: data.id, email: data.email }))
                        ]);

                })
                .then(async data => {
                    await Promise.all(
                        [fetch('https://graph.facebook.com/me/accounts?fields=name,about,category,website,access_token&access_token=' + this.state.token)
                            .then(response => response.json())
                            .then(data => {
                                this.setState({ pages: data.data })
                                console.log(data.data)
                            }
                            )

                        ]);

                })
        } else { return <Redirect to='/' /> }
    }


    render() {
        const user = this.props.location.state;
        const pages = this.state.pages;
        if (user) {
            return (
                <div>
                    <Breadcrumb >
                        <Breadcrumb.Item><p> Welcome {user.name}</p></Breadcrumb.Item>
                        <Breadcrumb.Item><p>{user.userID}</p></Breadcrumb.Item>
                        <Breadcrumb.Item> <Button onClick={(e) => this.logout(e)}>Logout</Button></Breadcrumb.Item>
                    </Breadcrumb>
                    <Container fluid>
                        <Row>
                            <Col xs lg="2" className='sidebar'>
                                <Table striped hover size="lg">
                                    <tbody>
                                        <tr>Dashboard</tr>

                                        <tr>Websites</tr>

                                        <tr>Listings</tr>

                                        <tr>Visitors</tr>
                                    </tbody>
                                </Table>
                            </Col>
                            <Col xs lg="1"></Col>
                            <Col xs lg="6" className='sidebar'>
                                <Table striped hover size="lg">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>About</th>
                                            <th>Website</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {pages.map(page =>
                                            <tr>
                                                <td>{page.name}</td>
                                                <td>{page.category}</td>
                                                <td> {page.about}</td>
                                                <td>{page.website}</td>
                                                <td><Button onClick={(e) => this.page(e)} id={page.id} >Update</Button></td>
                                            </tr>
                                        )
                                        }
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>

                    </Container>

                </div >

            );
        }
        else {
            return <Redirect to='/' />
        }
    }

}






