import React from 'react';
import PropTypes from 'prop-types';
import MaterialDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EventIcon from '@material-ui/icons/Event';

const Drawer = ({
  isOpened,
  isConnected,
  onDrawerClick,
  goTo
}) => {
  const ConnectedList = () => (
    <List
      tabIndex={0}
      role="button"
      onClick={onDrawerClick}
      onKeyDown={onDrawerClick}
    >
      <ListItem
        role="navigation"
        href="/"
        onClick={goTo('/')}
      >
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </List>
  );

  const NotConnectedList = () => <ConnectedList />;

  return (
    <MaterialDrawer open={isOpened} onClose={onDrawerClick}>
      {isConnected ? <ConnectedList /> : <NotConnectedList />}
    </MaterialDrawer>
  );
};

Drawer.propTypes = {
  isOpened: PropTypes.bool.isRequired,
  isConnected: PropTypes.bool.isRequired,
  onDrawerClick: PropTypes.func.isRequired,
  goTo: PropTypes.func.isRequired
};

export default Drawer;
