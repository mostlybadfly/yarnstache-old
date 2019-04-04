import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
} from '@material-ui/core';

export default class Stash extends Component {
  render() {
    return (
      <div style={{padding: '2%'}}>
       <Link style={{textDecoration: 'none'}} to="/new-yarn">
       Add Yarn 
      </Link>
       <h2 style={{textAlign: 'center'}}>My Stash</h2>
        <Grid container spacing={40}>
            {this.props.stash.map((yarn, index) => (
              <Grid item xs={4}>
                <Card>
                  <CardMedia
                    style={{height: 0, padding: '56.25%'}}
                    image={yarn.first_photo.medium_url}
                  />
                  <CardContent>{yarn.name}</CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </div>
    );
  }
}
