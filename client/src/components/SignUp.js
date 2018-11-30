import React, { Component } from 'react';
import axios from 'axios';

const url = "http://localhost:3300";

const initialUser = {
    username: "",
    password: "",
};


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { ...initialUser },
            message: '',
        };
    };

    inputHandler = (event) => {
        const { name, value } = event.target;
        this.setState({ user: { ...this.state.user, [name]: value } });
    };

    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${url}/api/register`, this.state.user)
            .then((res) => {
                if (res.status === 201) {
                    this.setState({
                        message: 'Sign up successful',
                        user: { ...initialUser }
                    })
                } else {
                    throw new Error();
                }
            })
            .catch((err) => {
                this.setState({
                    message: 'Sign up failed',
                    user: { ...initialUser },
                });
            });
    };


    render() {
        return (
            <div>
                <h2>Sign Up</h2>
                <form onSubmit={this.submitHandler}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={this.state.user.username}
                        onChange={this.inputHandler}
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        type="text"
                        id="password"
                        name="password"
                        value={this.state.user.password}
                        onChange={this.inputHandler}
                    />
                    <button type='submit'>Submit</button>
                </form>
                {this.state.message
                    ? (<h4>{this.state.message}</h4>)
                    : undefined}
            </div>
        )
    }
}





export default SignUp;