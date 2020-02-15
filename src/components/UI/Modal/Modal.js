import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop';

// We're not using Pure Component because it would run more checks than we want to and right now we wanna keep it that way.
class Modal extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
  }

  componentDidUpdate() {
    console.log('[Modal.js] componentDidUpdate');
  }

  render() {
    return (
      <Aux>
        <Backdrop show={ this.props.show } clicked={ this.props.modalClosed } />
        <div
          className={ classes.Modal }
          style={ {
            transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
            opacity: this.props.show ? '1' : '0'
          } }
        >
          { this.props.children }
        </div>
      </Aux>
    );
  }
};

Modal.propTypes = {
  show: PropTypes.bool,
  modalClosed: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

export default Modal;
