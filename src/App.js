import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
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
      value: '',
      stash: []
    };
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
              'read-c78a1f769793d16b6a08a65b17d3dfb2:f9LCM+WVCvLC8cbrqzQilkS0ush/10PrHdraFZjx',
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
    event.preventDefault();
  }

  addYarn(event, yarn) {
    this.setState(prevState => ({
      stash: [...prevState.stash, yarn]
    }));
    //let currentStash = this.state.stash
    //let newStash = [...currentStash, yarn]
    //this.setState({ stash: newStash })
    console.log(yarn.name);
  }

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
