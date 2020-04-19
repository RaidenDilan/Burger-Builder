import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

// We're not using Pure Component because it would run more checks than we want to and right now we wanna keep it that way.
const modal = props => {
  // shouldComponentUpdate(nextProps) {
  //   return nextProps.show !== props.show ||
  //     nextProps.children !== props.children;
  // }
  return (
    <Aux>
      <Backdrop show={ props.show } clicked={ props.modalClosed } />
      <div
        className={ classes.Modal }
        style={ {
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        } }>
        { props.children }
      </div>
    </Aux>
  );
};

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
  ); // 2nd arguement where you can add your own comparison function
// optimize performance by wrapping it in React.memo().
// only update this when the props of the component change
