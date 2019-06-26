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
  List,
  ListSubheader,
  ListItemText,
  ListItem,
  ListItemSecondaryAction,
  Checkbox
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
      checked: []
    };
  }

  createProject = event => {
    event.preventDefault();
    const project = {
      title: this.state.title,
      designer: this.state.designer,
      recipient: this.state.recipient,
      yarns: this.state.checked,
      notes: this.state.notes
    }
    this.props.addProject(project);

    this.setState({
      title: '',
      designer: '',
      recipient: '',
      yarns: [],
      notes: '',
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

  handleToggle = yarn => () => {
    const { checked } = this.state;
    const currentIndex = checked.indexOf(yarn);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(yarn);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    });
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
              <List>
                <ListSubheader component="div">Your Stash</ListSubheader>
                {this.props.stash.map((yarn, index) => (
                  <ListItem key={index} button>
                    <ListItemText  primary={yarn.name} />
                    <ListItemSecondaryAction>
                      <Checkbox
                        onChange={this.handleToggle(yarn)}
                        checked={this.state.checked.indexOf(yarn) !== -1}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
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
