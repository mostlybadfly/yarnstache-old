// Hey Daniel! Super excited to pair with you this evening.
// Unfortunately I can't get any search results, so I can't see much on the browser, but here are a few initial thoughts!

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

// let's try to import from the /core/index.js files if possible! just to make these imports shorter
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      value: '', // i'd love to rename this, simply because I don't know what the value should be and value sends to be predefined by many JS objects :)
      stash: []
    };

    // nice! I didn't know you could bind functions in the constructor like this.
    // We coud bind the functions at the definition level to avoid these few lines if you wanted
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.addYarn = this.addYarn.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    fetch(
      'https://api.ravelry.com/yarns/search.json?query=' + this.state.value,
      {
        credentials: 'include',
        headers: new Headers({
          Authorization:
            'Basic ' +
            btoa(
              'user:password',
            ),
        }),
      },
    )
      .then(response => response.json())
      .then(
        json => {
          console.log(json);
          this.setState({
            isLoaded: true,
            items: json.yarns
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error,
          });
        },
      );
    // I think we should move this to the top of the function, incase the fetch fails and the submit tries to redirect us
    event.preventDefault();
  }

  addYarn(event, yarn) {
    // I like this!
    this.setState(prevState => ({
      stash: [...prevState.stash, yarn]
    }));
    //let currentStash = this.state.stash
    //let newStash = [...currentStash, yarn]
    //this.setState({ stash: newStash })
    console.log(yarn.name);
  }

  // this render is fairly long, we can create some smaller components to make it more readable.
  render() {
    const {error, isLoaded, items, stash} = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </form>
          <Grid container spacing={24}>
            <Grid item xs={8}>
              <Paper>
                <Table>
                  <TableBody>{items.map((yarn, index) =>
                    <TableRow key={index}>
                      <TableCell>{yarn.name}</TableCell>
                      <TableCell>{yarn.first_photo ? <img src={yarn.first_photo.square_url} /> : ' NO IMAGE'}</TableCell>
                      <TableCell><input type="button" value="Add to Stash" onClick={(event) => { this.addYarn(event, yarn)}}/></TableCell>
                    </TableRow>
                 )}</TableBody>
                </Table>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Paper>
                <GridList cellHeight={180}>
                  <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">Your Stash</ListSubheader>
                  </GridListTile>
                  {stash.map((yarn, index) => (
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
          </Grid>
      </div>
      );
    }
  }
}

export default App;
