import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Grid, Card, CardContent} from '@material-ui/core';

export default class Projects extends Component {
  render() {
    return (
      <div>
        <Link style={{textDecoration: 'none'}} to="/new-project">
          New Project
        </Link>
        <h2 style={{textAlign: 'center'}}>Projects</h2>
      </div>
    );
  }
}
