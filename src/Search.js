import React, {Component} from 'react';
import Results from './Results.js';
import SideStash from './SideStash.js';
import './App.css';

import {Grid} from '@material-ui/core';

export default class Search extends Component {
  render() {
    return (
      <div>
       <Grid container spacing={24}>
          <Grid item xs={3}>
            <form style={{padding: 10}} onSubmit={this.props.handleSubmit}>
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
          </Grid>
          <Grid item xs={6}>
            <Results results={this.props.results} addYarn={this.props.addYarn} />
          </Grid>
          <Grid item xs={3}>
            <SideStash stash={this.props.stash} />
          </Grid>
        </Grid>
      </div>
    );
  }
}
