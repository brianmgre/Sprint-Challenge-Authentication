import React, { Component } from 'react';
import SignUp from './components/SignUp.js';
import SignIn from './components/SignIn.js';
import Jokes from './components/Jokes.js';
import { Switch, Route, NavLink } from 'react-router-dom';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/signup'>Sign Up</NavLink>
          <NavLink to='/signin'> Sign In</NavLink>
        </nav>
        <h1>Wanna Hear Some Jokes? Sign In|Up</h1>
        <section>
          <Switch>
            <Route path='/signup' component={SignUp} />
            <Route path='/signin' component={SignIn} />
            <Route path='/jokes' component={Jokes} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
