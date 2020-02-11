import React from 'react';

import classes from './SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const sideDrawer = (props) => { // We are return something => {}
  return (
    <div className={ classes.SideDrawer }>
      <div className={ classes.Logo }>
        <Logo/>
      </div>
      <nav>
        <NavigationItems/>
      </nav>
    </div>
  );
};

export default sideDrawer;