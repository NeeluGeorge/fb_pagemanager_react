import React, { Component } from 'react'

// // export default class Admin extends Component {
// //     render() {
// //         return (
// //             <div>
// //                 componentDidMount() {
// //                     // Simple DELETE request with fetch
// //                     fetch('https://google.com', { method: 'GET' })
// //                     // .then(() => this.setState({ status: 'Delete successful' }));
// //                 }
// //             </div>
// //         )
// //     }
// // }
// // constructor(props) {
// //     super(props);

// //     this.state = {
// //         // postId: null,
// //         posts: []
// //     };
// // }

// //     componentDidMount() {
// //         // Simple POST request with a JSON body using fetch
// //         const requestOptions = {
// //             method: 'GET',
// //             headers: { 'Content-Type': 'application/json' },
// //             // body: JSON.stringify({ title: 'React POST Request Example' })
// //         };
// //         // fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
// //         //     .then(response => response.json())
// //         //     .then(data => this.setState({ postId: data.id }))
// //         fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
// //             .then(response => response.json())
// //         // .then((value) => { console.log(value) })
// //         // .then(this.setState({ posts: response }))
// //         // .then(console.log(this.state.posts))
// //         // this.setState({ posts: })

// //     }

// //     render() {
// //         const { users } = this.state;
// //         return (
// //             // <div className="card text-center m-3">
// //             //     <h5 className="card-header">Simple POST Request</h5>
// //             //     <div className="card-body">
// //             //         Returned Id: {postId}
// //             //     </div>
// //             // </div>
// //             <div>
// //                 {users}
// //                 {/* {users.map((user, index) => (
// //                     <div key={index}>
// //                         <h3>{user.id}</h3>
// //                         <p>{user.title}</p>
// //                         <p>{user.body}</p>
// //                     </div>
// //                 ))} */}

// //                 {users.map(user => {
// //                     const { userId, id, title, body } = user;

// //                     return (
// //                         <div key={userId}>
// //                             <h3>{id}</h3>
// //                             <p>{title}</p>
// //                             <p>{body}</p>
// //                         </div>
// //                     );
// //                 })}

// //             </div>
// //         );
// //     }
// // }



// // // function App() {
// // //     return (
// // //         <div className="App">
// // //             <div className="page-deets">
// // //                 <h2>Iterate over Array and display data</h2>
// // //             </div>

// // //             {/_ Iterate over imported array in userData _/}
// // //             <div className="users">
// // //                 {users.map((user, index) => (
// // //                     <div key={index}>
// // //                         <h3>{user.id}</h3>
// // //                         <p>{user.title}</p>
// // //                         <p>{user.body}</p>
// // //                     </div>
// // //                 ))}
// // //             </div>
// // //             <ScotchInfobar />
// // //         </div>
// // //     );
// // // }

// export default class Admin extends Component {

//     fetchPosts() {
//         // The API where we're fetching data from
//         fetch('https://jsonplaceholder.typicode.com/posts')
//             // We get a response and receive the data in JSON format...
//             .then(response => response.json())
//             // ...then we update the state of our application
//             .then(
//                 data =>
//                     this.setState({
//                         posts: data,
//                         isLoading: false,
//                     })
//             )
//             // If we catch errors instead of a response, let's update the app
//             .catch(error => this.setState({ error, isLoading: false }));
//     }

//     componentDidMount() {
//         this.fetchPosts();
//     }
//     render() {
//         return (
//             <div ref={this.componentDidMount}>
//             </div>
//         )
//     }
// }


const API = 'https://hn.algolia.com/api/v1/search?query=';
const DEFAULT_QUERY = 'redux';

export default class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
        };
    }

    componentDidMount() {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            // body: JSON.stringify({ title: 'React POST Request Example' })
        };
        fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({ users: data }));
    }

    render() {
        const { users } = this.state;

        return (
            <ul>
                {users.map(user =>
                    <li key={user.UserId}>
                        <h3>{user.id}</h3>
                        <p>{user.title}</p>
                        <p>{user.body}</p>
                    </li>
                )
                }
            </ul>
        );
    }
}

