import React, {Component} from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
  ListSubheader,
} from '@material-ui/core';

export default class NewProject extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      designer: '',
      recipient: '',
      yarns: [],
      notes: [],

      open: false,
    };
  }

  createProject = event => {
    event.preventDefault();
    const project = {
      title: this.state.title,
      designer: this.state.designer,
      recipient: this.state.recipient,
      yarns: this.state.yarns,
      notes: this.state.notes
    }
    this.props.addProject(project);
    
    this.setState({
      title: '',
      designer: '',
      recipient: '',
      yarns: [],
      notes: ''
    })
  };

  addTitle = event => {
    this.setState({title: event.target.value});
  };

  addDesigner = event => {
    this.setState({designer: event.target.value});
  };

  addRecipient = event => {
    this.setState({recipient: event.target.value});
  };

  addYarn = event => {
    this.setState({yarns: event.target.value});
  };

  addNotes = event => {
    this.setState({notes: event.target.value});
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    return (
      <div style={{padding: 10}}>
        <form onSubmit={this.createProject}>
          <FormControl>
            <InputLabel>Title:</InputLabel>
            <Input value={this.state.title} onChange={this.addTitle} />
          </FormControl>
          <FormControl>
            <InputLabel>Designer:</InputLabel>
            <Input value={this.state.designer} onChange={this.addDesigner} />
          </FormControl>
          <FormControl>
            <InputLabel>Made For:</InputLabel>
            <Input value={this.state.recipient} onChange={this.addRecipient} />
          </FormControl>
          <br />
          <Button onClick={this.handleClickOpen}>Click to select yarns</Button>
          <Dialog open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Select your yarns</DialogTitle>
            <DialogContent>
              <GridList cellHeight={90}>
                <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
                  <ListSubheader component="div">Your Stash</ListSubheader>
                </GridListTile>
                {this.props.stash.map((yarn, index) => (
                  <GridListTile key={yarn.first_photo.small_url}>
                    <img src={yarn.first_photo.small_url} alt={yarn.name} />
                    <GridListTileBar
                      title={yarn.name}
                      subtitle={<span>{yarn.yarn_company_name}</span>}
                    />
                  </GridListTile>
                ))}
              </GridList>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose}>Close</Button>
            </DialogActions>
          </Dialog>
          <br />
          <FormControl>
            <InputLabel>Notes</InputLabel>
            <Input
              value={this.state.notes}
              onChange={this.addNotes}
            />
          </FormControl>
          <Button type="submit">Create Project</Button>
        </form>
      </div>
    );
  }
}
