import React from 'react';
import { Link } from 'react-router-dom';
import { signOutUser } from '../actions/index';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import { ListItemIcon, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MenuButton from 'material-ui-icons/Menu';
import AccountBox from 'material-ui-icons/AccountBox';
import Settings from 'material-ui-icons/Settings';
import Power from 'material-ui-icons/PowerSettingsNew';

class AccountMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <IconButton
          aria-label="More"
          aria-owns={anchorEl ? 'long-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MenuButton />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose} >
            <ListItemIcon>
              <AccountBox />
            </ListItemIcon>
            <ListItemText>
              <Link to="/profile">Profile</Link>
            </ListItemText >
          </MenuItem>
          <MenuItem onClick={this.handleClose}>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText>
              <Link to="/profile/settings">Settings</Link>
            </ListItemText >
          </MenuItem>
          <MenuItem onClick={this.props.signOutUser}>
            <ListItemIcon>
              <Power />
            </ListItemIcon>
            <ListItemText>
              Sign out
            </ListItemText >
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default connect(null, { signOutUser })(AccountMenu);
