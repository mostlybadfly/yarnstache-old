import React, {Component} from 'react';
import {
  Grid,
  Paper,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  ListSubheader,
} from '@material-ui/core';

export default class Stash extends Component {
  render() {
    return (
      <div>
        <h2 style={{textAlign: 'center'}}>My Stash</h2>
        <Grid container spacing={18}>
          {this.props.stash.map((yarn, index) => (
              <Grid item xs={4} style={{padding: 10}}>
                <Card style={{maxWidth: 345}}>
                  <CardMedia
                    style={{height: 0, padding: '56.25%'}}
                    image={yarn.first_photo.medium_url}
                    title="Contemplative Reptile"
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
