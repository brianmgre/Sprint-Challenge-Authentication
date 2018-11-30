import React, { Component } from 'react';
import axios from 'axios';

const url = "http://localhost:3300";

class Jokes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            jokes: [],
        };
    };


    authenticate = () => {
        const token = localStorage.getItem('secret_bit_token');
        const options = {
            headers: {
                authorization: token,
            },
        };
        if (token) {
            axios
                .get(`${url}/api/jokes`, options)
                .then((res) => {
                    console.log(res);
                    if (res.status === 200 && res.data) {
                        this.setState({ loggedIn: true, jokes: res.data });
                    } else {
                        throw new Error();
                    }
                })
                .catch((err) => {
                    this.props.history.push('/signin');
                })
        } else {
            this.props.history.push('.signin');
        }
    };

    componentDidMount(){
        this.authenticate();
    };

    componentDidUpdate(prevProps) {
        const { pathname } = this.props.location;
        console.log(this.props);
        console.log(prevProps);
        if (pathname === '/jokes' && pathname !== prevProps.location.pathname) {
            this.authenticate();
        }
    };

    submitHandler = (event) => {
        event.preventDefault();
        localStorage.removeItem('secret_bit_token')
        this.props.history.push('/signin')
    };

    render() {
        return (
            <div>
                <button onClick={this.submitHandler}>Sign Out</button>
                <h2>Jokes</h2>
                <div className='jokes'> 
                    {this.state.jokes.map(joke =>
                        <div key={joke.id}>
                           <h3> {joke.setup}</h3>
                           <h6> {joke.punchline}</h6>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}





export default Jokes;