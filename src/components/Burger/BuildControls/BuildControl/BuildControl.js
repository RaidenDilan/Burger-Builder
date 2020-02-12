import React from 'react';
import PropTypes from 'prop-types';

import classes from './BuildControl.css';

const buildControl = (props) => (
  // label => ingredientLabel
  <div className={ classes.BuildControl }>
    <div className={ classes.Label }>{ props.label }</div>
    <button
      className={ classes.Less }
      onClick={ props.removed }
      disabled= { props.disabled }
    >
      Less
    </button>
    <button
      className={ classes.More }
      onClick={ props.added }
    >
      More
    </button>
  </div>
);

buildControl.propTypes = {
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default buildControl;
