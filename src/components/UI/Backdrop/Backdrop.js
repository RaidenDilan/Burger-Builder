import React from 'react';
import PropTypes from 'prop-types';

import classes from './Backdrop.css';

const backdrop = (props) => (
  props.show ? <div role='button' className={ classes.Backdrop } onClick={ props.clicked } tabIndex={ 0 }></div> : null
);

backdrop.propTypes = {
  show: PropTypes.bool,
  clicked: PropTypes.func
};

export default backdrop;
