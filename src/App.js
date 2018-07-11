import React, {Component} from 'react';
import Results from './Results.js';
import Stash from './Stash.js';
import './App.css';

import {Grid} from '@material-ui/core';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      query: '',
      results: [],
      stash: []
    };
  }

  handleChange = (event) => {
    this.setState({query: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(
      process.env.REACT_APP_RAV_URL + this.state.query,
      {
        credentials: 'include',
        headers: new Headers({
          Authorization:
            'Basic ' +
            btoa(process.env.REACT_APP_RAV_LOGIN),
        }),
      },
    )
      .then(response => response.json())
      .then(
        json => {
          console.log(json);
          this.setState({
            isLoaded: true,
            results: json.yarns
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
  }

  addYarn = (event, yarn) => {
    this.setState(prevState => ({
      stash: [...prevState.stash, yarn]
    }));
    }

  render() {
    const {error, isLoaded, results, stash} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.query}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <Grid container spacing={24}>
          <Results results={this.state.results} addYarn={this.addYarn}/>
          <Stash stash={this.state.stash} />
          </Grid>
      </div>
      );
    }
  }
}

export default App;
