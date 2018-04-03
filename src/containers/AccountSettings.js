import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import { connect } from 'react-redux';
import { secureSensitiveAction } from '../actions/index';
import EmailSettings from './EmailSettings';
import PasswordSettings from './PasswordSettings';
import DeleteAccount from './DeleteAccount'

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

class AccountSettings extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className={classes.root}>
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
            <PasswordSettings secureSensitiveAction={this.props.secureSensitiveAction} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <EmailSettings secureSensitiveAction={this.props.secureSensitiveAction} />
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

AccountSettings.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const compose = (...fns) => fns.reduce( (f, g) => (...args) => f(g(...args)))

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(null, { secureSensitiveAction })
)(AccountSettings);
