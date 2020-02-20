import React from 'react';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
  <div
    role='button'
    className={ classes.DrawerToggle }
    onClick={ props.clicked }
    tabIndex={ 0 }>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default drawerToggle;
