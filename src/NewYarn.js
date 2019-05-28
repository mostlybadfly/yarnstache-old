import React, {Component} from 'react';

import {
  FormControl,
  InputLabel,
  Input,
  Button,
} from '@material-ui/core';

export default class NewYarn extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      maker: '',
      weight: '',
      colorway: [],
      notes: [],
    };
  }

  createYarn = event => {
    event.preventDefault();
    const project = {
      name: this.state.name,
      maker: this.state.maker,
      weight: this.state.weight,
      colorway: this.state.colorway,
      notes: this.state.notes
    }
    this.props.addYarn(project);

    this.setState({
      name: '',
      maker: '',
      weight: '',
      colorway: '',
      notes: '',
    })
  };

  addName = event => {
    this.setState({name: event.target.value});
  };

  addMaker = event => {
    this.setState({maker: event.target.value});
  };

  addWeight = event => {
    this.setState({weight: event.target.value});
  };

  addColorway = event => {
    this.setState({colorway: event.target.value});
  };

  addNotes = event => {
    this.setState({notes: event.target.value});
  };

  render() {
    return (
      <div style={{padding: 10}}>
        <form onSubmit={this.createYarn}>
          <FormControl>
            <InputLabel>Name:</InputLabel>
            <Input value={this.state.title} onChange={this.addName} />
          </FormControl>
          <FormControl>
            <InputLabel>Maker:</InputLabel>
            <Input value={this.state.designer} onChange={this.addMaker} />
          </FormControl>
          <FormControl>
            <InputLabel>Weight:</InputLabel>
            <Input value={this.state.weight} onChange={this.addWeight} />
          </FormControl>
          <FormControl>
            <InputLabel>Colorway:</InputLabel>
            <Input value={this.state.colorway} onChange={this.addColorway} />
          </FormControl>
          <FormControl>
            <InputLabel>Notes</InputLabel>
            <Input
              value={this.state.notes}
              onChange={this.addNotes}
            />
          </FormControl>
          <Button type="submit">Add Yarn</Button>
        </form>
      </div>
    );
  }
}
