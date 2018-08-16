import React, {Component} from 'react';
import Results from './Results.js';
import Stash from './Stash.js';
import './App.css';

import {Grid} from '@material-ui/core';

export default class Search extends Component {
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.props.query}
              onChange={this.props.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Grid container spacing={24}>
        <Results results={this.props.results} addYarn={this.props.addYarn}/>
        <Stash stash={this.props.stash} />
        </Grid>
    </div>
    );
  }
}
