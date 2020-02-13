// For now we want to keep this Component in the higher order component (hoc) folder because it therer to wrap other components

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedhandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerToggledHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  }

  render () {
    return (
      <Aux>
        <Toolbar drawerToggleClicked={ this.sideDrawerToggledHandler } />
        <SideDrawer
          open={ this.state.showSideDrawer }
          closed={ this.sideDrawerClosedhandler }
        />
        <main className={ classes.Content }>
          { this.props.children }
        </main>
      </Aux>
    );
  }
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// };

export default Layout;
