import React from 'react';
import classes from './Backdrop.css';

const backdrop = (props) => (
  props.show ? <div role='button' className={ classes.Backdrop } onClick={ props.clicked } tabIndex={ 0 }></div> : null
);

export default backdrop;
