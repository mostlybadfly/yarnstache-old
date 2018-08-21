import React, {Component} from 'react';
import MyStash from './MyStash.js';
import Search from './Search.js';
import './App.css';

import {
  Paper,
  Typography,
  AppBar,
  Toolbar,
  Button,
} from '@material-ui/core';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      query: '',
      results: [],
      stash: [],
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

  addYarn = (event, yarn) => {
    this.setState(prevState => ({
      stash: [...prevState.stash, yarn],
    }));
  };

  render() {
    return (
      <Paper style={{height: '100%', flexGrow: 1}}>
        <Router>
          <div>
            <AppBar style={{backgroundColor: 'lavender'}} position="static">
              <Toolbar>
                <Typography
                  variant="title"
                  color="inherit"
                  style={{flexGrow: 1}}>
                  <Link style={{textDecoration: 'none'}} to="/">
                    YarnStache
                  </Link>
                </Typography>
                <Button component={Link} to="/search">
                  Search
                </Button>
                <Button component={Link} to="/stash">
                  My Stash
                </Button>
              </Toolbar>
            </AppBar>

            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <h2 style={{textAlign: 'center'}}>Welcome to Yarnstache</h2>
                )}
              />
              <Route
                path="/search"
                render={() => (
                  <Search
                    {...this.state}
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    addYarn={this.addYarn}
                  />
                )}
              />
              <Route
                path="/stash"
                render={() => <MyStash stash={this.state.stash} />}
              />
            </Switch>
          </div>
        </Router>
      </Paper>
    );
  }
}

export default App;
