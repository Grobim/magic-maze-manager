import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from '@material-ui/core/TextField';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => ({
  layout: {
    padding: theme.spacing.unit
  },
  avatarLayout: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative'
  },
  avatarIcon: {
    width: 80,
    height: 80
  },
  avatarEdit: {
    position: 'absolute',
    top: 25,
    right: 50
  },
  hiddenFileUploader: {
    display: 'none'
  },
  textField: {
    height: 44
  }
});

class Profile extends Component {
  static propTypes = {
    editName: PropTypes.func.isRequired,
    editAvatar: PropTypes.func.isRequired,
    uid: PropTypes.string.isRequired,
    user: PropTypes.objectOf(PropTypes.any),
    isCurrentUser: PropTypes.bool.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired
  };

  static defaultProps = {
    user: {}
  };

  constructor(props) {
    super(props);

    if (props.user.public) {
      this.state = {
        ...this.state,
        name: props.user.public.displayName
      };
    }
  }

  state = {
    name: '',
    editName: false
  };

  componentWillReceiveProps(newProps) {
    const currentName = this.props.user && (this.props.user.public || {}).displayName;
    const newName = newProps.user && (newProps.user.public || {}).displayName;

    if (currentName !== newName) {
      this.setState({
        name: newName
      });
    }
  }

  handleEditName = () => {
    if (this.state.editName) {
      this.handleNameSubmit();
    } else {
      this.setState(prevState => ({
        editName: !prevState.editName
      }));
    }
  };

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    });
  };

  handleNameSubmit = (event) => {
    const {
      uid,
      user,
      editName
    } = this.props;
    const {
      name
    } = this.state;

    if (user.public.displayName !== name) {
      editName(uid, name);
    }

    this.setState({
      editName: false
    });

    if (event) {
      event.preventDefault();
    }
  };

  handleEditAvatar = () => {
    this.fileUploader.click();
  };

  handleUploadFile = (event) => {
    event.preventDefault();

    const { uid, editAvatar } = this.props;

    // Something throws an exception, don't care why, fuck it
    try {
      const reader = new window.FileReader();
      const file = event.target.files[0];
      reader.onloadend = () => {
        editAvatar(uid, file);
      };

      reader.readAsDataURL(file);
    } catch (e) {
      // Ok, let's log it anyway
      console.error(e);
    }
  };

  render() {
    const {
      user,
      isCurrentUser,
      classes
    } = this.props;

    const {
      editName,
      name
    } = this.state;

    return (
      <Grid container className={classes.layout} spacing={0}>
        <Grid item xs={12} sm={6}>
          <Paper>
            <Grid container>
              <Grid item xs={12} className={classes.avatarLayout}>
                {user && (user.public || {}).photoURL ? (
                  <Avatar src={user.public.photoURL} className={classes.avatarIcon} />
                ) : (
                  <AccountCircleIcon color="primary" className={classes.avatarIcon} />
                )}
                {isCurrentUser && (
                  <Fragment>
                    <IconButton
                      aria-label="Edit"
                      onClick={this.handleEditAvatar}
                      className={classes.avatarEdit}
                    >
                      <CloudUploadIcon />
                    </IconButton>
                    <input
                      type="file"
                      accept="image/*"
                      ref={(ref) => { this.fileUploader = ref; }}
                      onChange={this.handleUploadFile}
                      className={classes.hiddenFileUploader}
                    />
                  </Fragment>
                )}
              </Grid>
              <Grid item xs={12}>
                <List>
                  <ListItem>
                    <Icon>
                      <AccountCircleIcon />
                    </Icon>
                    <ListItemText
                      primary={
                        <form onSubmit={this.handleNameSubmit} name="name">
                          <TextField
                            id="name"
                            label="Name"
                            value={name}
                            onChange={this.handleNameChange}
                            disabled={!editName}
                            fullWidth
                            InputLabelProps={{
                              shrink: true,
                            }}
                            error={editName && !name}
                          />
                        </form>
                      }
                    />
                    {isCurrentUser && (
                      <ListItemSecondaryAction>
                        <IconButton
                          aria-label="Edit"
                          onClick={this.handleEditName}
                          color={editName ? 'secondary' : 'default'}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    )}
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Profile);
