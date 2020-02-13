import React from 'react';
import PropTypes from 'prop-types';

import classes from './Button.css';

const button = (props) => (
  <button
    className={ [classes.Button, classes[props.btnType]].join(' ') }
    onClick={ props.clicked }
  >
    { props.children }
  </button>
);

button.propTypes = {
  btnType: PropTypes.string.isRequired,
  clicked: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default button;
