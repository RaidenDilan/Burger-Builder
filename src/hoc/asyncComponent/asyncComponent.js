import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    displayName: 'withErrorHandler' // to fix ESlint syntax error
    state = {
      Component: null
    }

    componentDidMount() {
      importComponent()
      .then(cmp => {
        this.setState({ component: cmp.default });
      });
    }

    render() {
      const C = this.state.component;
      return C ? <C { ...this.props } /> : null;
    }
  };
};

// asyncComponent.displayName = 'asyncComponent';

export default asyncComponent;
