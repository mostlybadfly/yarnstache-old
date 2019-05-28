import React, {Component} from 'react';
import SideStash from './SideStash.js';
import './App.css';

import {Grid, Table, TableBody, TableRow, TableCell} from '@material-ui/core';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      isLoaded: false,
      query: '',
      results: [],
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

  render() {
    return (
      <div>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <form style={{padding: 10}} onSubmit={this.handleSubmit}>
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
          </Grid>
          <Grid item xs={6}>
            <Table>
              <TableBody>
                {this.state.results.map((yarn, index) => (
                  <TableRow style={{height: '100%'}} key={index}>
                    <TableCell>{yarn.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </div>
    );
  }
}
