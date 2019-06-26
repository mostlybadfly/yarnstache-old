import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Box, Text} from 'grommet';

export default class Stash extends Component {
  render() {
    return (
      <div style={{padding: '2%'}}>
       <Link style={{textDecoration: 'none'}} to="/new-yarn">
       Add Yarn
      </Link>
       <h2 style={{textAlign: 'center'}}>My Stash</h2>
        <Box>
            {this.props.stash.map((yarn, index) => (
              <Text>
                {yarn.name}
              </Text>
            ))}
        </Box>
      </div>
    );
  }
}
