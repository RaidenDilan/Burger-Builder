// For now we want to keep this Component in the higher order component (hoc) folder because it therer to wrap other components
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedhandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggledHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar
        isAuth={ props.isAuthenticated }
        drawerToggleClicked={ sideDrawerToggledHandler } />
      <SideDrawer
        isAuth={ props.isAuthenticated }
        open={ sideDrawerIsVisible }
        closed={ sideDrawerClosedhandler }
      />
      <main className={ classes.Content }>
        { props.children }
      </main>
    </Aux>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  };
};

export default connect(mapStateToProps)(layout);
