import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Grid,
} from '@material-ui/core';

export default class Results extends Component {
  render() {
    return (
      <Grid item xs={8}>
        <Paper>
          <Table>
            <TableBody>
              {this.props.results.map((yarn, index) => (
                <TableRow key={index}>
                  <TableCell>{yarn.name}</TableCell>
                  <TableCell>
                    {yarn.first_photo ? (
                      <img src={yarn.first_photo.square_url} />
                    ) : (
                      ' NO IMAGE'
                    )}
                  </TableCell>
                  <TableCell>
                    <input
                      type="button"
                      value="Add to Stash"
                      onClick={event => {
                        this.props.addYarn(event, yarn);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    );
  }
}
