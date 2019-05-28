import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class Projects extends Component {
  render() {
    return (
      <div>
        <Link style={{textDecoration: 'none'}} to="/new-project">
          New Project
        </Link>
        <h2 style={{textAlign: 'center'}}>Projects</h2>
        {this.props.projects.map((project, index) => (
          <h3 key={index}>{project.title}</h3>
        ))}
      </div>
    );
  }
}
