import React, {Component} from 'react';
import {
  Paper,
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from '@material-ui/core';

export default class Stash extends Component {
  render() {
    return (
      <Grid item xs={4}>
        <Paper>
          <GridList cellHeight={180}>
            <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
              <ListSubheader component="div">Your Stash</ListSubheader>
            </GridListTile>
            {this.props.stash.map((yarn, index) => (
              <GridListTile key={yarn.first_photo.small_url}>
                <img src={yarn.first_photo.small_url} />
                <GridListTileBar
                  title={yarn.name}
                  subtitle={<span>{yarn.yarn_company_name}</span>}
                />
              </GridListTile>
            ))}
          </GridList>
        </Paper>
      </Grid>
    );
  }
}
