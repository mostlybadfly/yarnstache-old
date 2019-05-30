import React, {Component} from 'react';
import MyStash from './MyStash.js';
import Search from './Search.js';
import Projects from './Projects.js';
import NewProject from './NewProject.js';
import NewYarn from './NewYarn.js';
import './App.css';

import {Box, Button, Grommet, Heading} from 'grommet';

import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
    const AppBar = props => (
      <Box
        tag="header"
        direction="row"
        align="center"
        justify="between"
        background="light-2"
        pad={{vertical: 'small', horizontal: 'medium'}}
        elevation="medium"
        {...props}
      />
    );

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

  addYarn = yarn => {
    this.setState(prevState => ({
      stash: [...prevState.stash, yarn],
    }));
  };

  addProject = project => {
    this.setState(prevState => ({
      projects: [...prevState.projects, project],
    }));
  };

  render() {
    return (
      <Grommet>
        <Router>
          <div>
            <AppBar>
              <Heading level='3' margin='none'>
                <Link style={{textDecoration: 'none'}} to="/">
                  YarnStache
                </Link>
              </Heading>
              <Button href="/stash">
                <Link style={{textDecoration: 'none'}} to="/stash">
                  My Stash
                </Link>
              </Button>
              <Button>
                <Link style ={{textDecoration: 'none'}} to="/projects">
                  Projects
                </Link>
              </Button>
            </AppBar>

            <Switch>
              <Route
                exact
                path="/"
                render={() => (
                  <h2 style={{textAlign: 'center'}}>Welcome to Yarnstache</h2>
                )}
              />
              <Route path="/search" render={() => <Search />} />
              <Route
                path="/stash"
                render={() => <MyStash stash={this.state.stash} />}
              />
              <Route
                path="/projects"
                render={() => <Projects projects={this.state.projects} />}
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
                  <NewYarn stash={this.state.stash} addYarn={this.addYarn} />
                )}
              />
            </Switch>
          </div>
        </Router>
      </Grommet>
    );
  }
}

export default App;
