import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
  return (
    <div className={ classes.CheckoutSummary }>
      <h1>We hope it tastes delicious!</h1>
      <div style={ { width: '100%', magin: 'auto' } }>
        <Burger ingredients={ props.ingredients } />
        <Button
          btnType='Danger'
          >CANCEL</Button>
        <Button
          btnType='Success'
          >CONTINUE</Button>
      </div>
    </div>
  );
};

export default checkoutSummary;
