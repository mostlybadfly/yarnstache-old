import React, {Component} from 'react';
import Results from './Results.js';
import Stash from './Stash.js';
import Search from './Search.js';
import './App.css';

import {Grid} from '@material-ui/core';

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      query: '',
      results: [],
      stash: [],
    };
  }

  handleChange = event => {
    this.setState({query: event.target.value});
  };

  handleSubmit = event => {
    event.preventDefault();
    fetch(process.env.REACT_APP_RAV_URL + this.state.query, {
      credentials: 'include',
      headers: new Headers({
        Authorization: 'Basic ' + btoa(process.env.REACT_APP_RAV_LOGIN),
      }),
    })
      .then(response => response.json())
      .then(
        json => {
          console.log(json);
          this.setState({
            isLoaded: true,
            results: json.yarns,
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  };

  addYarn = (event, yarn) => {
    this.setState(prevState => ({
      stash: [...prevState.stash, yarn],
    }));
  };

  render() {
    return (
      <div>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/stash">My Stash</Link>
              </li>
            </ul>

            <Route
              path="/stash"
              render={() => <Stash stash={this.state.stash} />}
            />
            <Route
              path="/"
              render={() => (
                <Search
                  {...this.state}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                  addYarn={this.addYarn}
                />
              )}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
