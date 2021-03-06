import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import MaterialAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import Link from 'components/Link';

const styles = {
  menu: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    flex: 1
  }
};

class AppBar extends Component {
  static propTypes = {
    isConnected: PropTypes.bool.isRequired,
    onMenuClick: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    goToProfile: PropTypes.func.isRequired,
    disconnect: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.any).isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string
  };

  static defaultProps = {
    photoURL: undefined,
    uid: undefined
  };

  state = {
    menuIsOpen: false,
    anchorEl: null
  };

  handleMenuOpen = (event) => {
    this.setState({
      menuIsOpen: true,
      anchorEl: event.currentTarget
    });
  }

  handleMenuClose = () => {
    this.setState({
      menuIsOpen: false,
      anchorEl: null
    });
  }

  handleProfileClick = () => {
    const {
      goToProfile,
      uid
    } = this.props;

    this.handleMenuClose();
    goToProfile(uid);
  }

  handleDisconnectClick = () => {
    this.handleMenuClose();
    this.props.disconnect();
  }

  render() {
    const {
      isConnected,
      onMenuClick,
      login,
      photoURL,
      classes
    } = this.props;

    return (
      <MaterialAppBar position="fixed">
        <Toolbar>
          <IconButton
            onClick={onMenuClick}
            className={classes.menu}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="title" color="inherit">
            <Link href="/" to="/">
              Magic Maze Manager
            </Link>
          </Typography>
          {isConnected ? (
            <Fragment>
              <IconButton
                aria-owns={this.state.menuIsOpen ? 'menu-appbar' : null}
                aria-haspopup="true"
                onClick={this.handleMenuOpen}
                color="inherit"
              >
                {photoURL ? (
                  <Avatar src={photoURL} />
                ) : (
                  <AccountCircleIcon />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={this.state.anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={this.state.menuIsOpen}
                onClose={this.handleMenuClose}
              >
                <MenuItem onClick={this.handleProfileClick}>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Profile" />
                </MenuItem>
                <MenuItem onClick={this.handleDisconnectClick}>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText inset primary="Disconnect" />
                </MenuItem>
              </Menu>
            </Fragment>
          ) : (
            <Button color="inherit" onClick={login}>Login</Button>
          )}
        </Toolbar>
      </MaterialAppBar>
    );
  }
}

export default withStyles(styles)(AppBar);
