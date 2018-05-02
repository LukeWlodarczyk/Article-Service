import React from 'react';
import { Link } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
};

class Navigation extends React.Component {

  render() {
    const { classes, authenticated } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              <Link className="" to="/">Articles</Link>
            </Typography>
            {authenticated.uid !== 'guest' ? (
              <AccountMenu userId={authenticated.uid} />
            ) : (
              <React.Fragment>
                  <Link className="" to="/signup">Sign up</Link>
                  <Link className="" to="/signin">Sign in</Link>
              </React.Fragment>
            )
          }
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Navigation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigation);
