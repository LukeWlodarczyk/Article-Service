import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Link } from 'react-router-dom';
import { signOutUser } from '../actions/index';
import { connect } from 'react-redux';



const AccountMenu = ({ signOutUser }) => (
  <div>
    <IconMenu
      iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
      anchorOrigin={{horizontal: 'left', vertical: 'top'}}
      targetOrigin={{horizontal: 'left', vertical: 'top'}}
    >
      <MenuItem
        primaryText="Profile"
        containerElement={<Link to="/profile" />}
      />
      <MenuItem
        primaryText="Settings"
        containerElement={<Link to="/profile/settings" />}
      />
      <MenuItem
        primaryText="Sign out"
        onClick={signOutUser}
      />
    </IconMenu>
  </div>
);

export default connect(null, { signOutUser })(AccountMenu);
