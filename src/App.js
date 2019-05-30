import React, {Component} from 'react';
import MyStash from './MyStash.js';
import Search from './Search.js';
import Projects from './Projects.js';
import NewProject from './NewProject.js';
import NewYarn from './NewYarn.js';
import './App.css';

import {Paper, Typography, AppBar, Toolbar, Button} from '@material-ui/core';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stash: [],
      projects: [],
    };
    this.addProject = this.addProject.bind(this);
    this.addYarn = this.addYarn.bind(this);
  }

  addYarn = (yarn) => {
    this.setState(prevState => ({
      stash: [...prevState.stash, yarn],
    }));
  };

  addProject = (project) => {
    this.setState(prevState => ({
      projects: [...prevState.projects, project],
    }));
  };

  render() {
    return (
      <Paper>
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
                <Button component={Link} to="/stash">
                  My Stash
                </Button>
                <Button component={Link} to="/projects">
                  Projects
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
                  />
                )}
              />
              <Route
                path="/stash"
                render={() => <MyStash stash={this.state.stash} />}
              />
              <Route
                path="/projects"
                render={() => (
                  <Projects
                    projects={this.state.projects}
                  />
                )}
              />
              <Route
                path="/new-project"
                render={() => (
                  <NewProject
                    projects={this.state.projects}
                    stash={this.state.stash}
                    addProject={this.addProject}
                  />
                )}
              />
              <Route
                path="/new-yarn"
                render={() => (
                  <NewYarn
                    stash={this.state.stash}
                    addYarn={this.addYarn}
                  />
                )}
              />
             </Switch>
          </div>
        </Router>
      </Paper>
    );
  }
}

export default App;
