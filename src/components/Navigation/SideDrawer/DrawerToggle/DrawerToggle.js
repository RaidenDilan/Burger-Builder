import React from 'react';
import PropTypes from 'prop-types';

import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
  <div
    role='button'
    className={ classes.DrawerToggle }
    onClick={ props.clicked }
    tabIndex={ 0 }
  >
    <div></div>
    <div></div>
    <div></div>
  </div>
);

drawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default drawerToggle;
