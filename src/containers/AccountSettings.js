import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { updateEmail, updatePassword, deleteAccount, replaceUrl } from '../actions/index';
import EmailSettings from './EmailSettings';
import PasswordSettings from './PasswordSettings';
import DeleteModal from './DeleteModal';
import { compose } from '../helpers/compose';

const TabContainer = ({ children, dir }) => (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );


TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
});

class AccountSettings extends Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  componentWillMount() {
    if(this.props.userId !== this.props.match.params.id) {
      this.props.replaceUrl('/');
    }
  }

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
        <DeleteModal
          parameter='deleteAccount'
          dialogContentText='This operation is permanent. Type in your password if you really want to delete your account.'
          buttonText='Delete Account'
          delete={this.props.deleteAccount}
        />
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            <Tab label="Password" />
            <Tab label="Email" />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <PasswordSettings updatePassword={this.props.updatePassword} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <EmailSettings updateEmail={this.props.updateEmail} />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.auth.authenticated.uid,
  }
}

AccountSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps, { updateEmail, updatePassword, deleteAccount, replaceUrl })
)(AccountSettings);
