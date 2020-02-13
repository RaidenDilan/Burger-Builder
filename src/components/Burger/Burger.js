import React from 'react';
import PropTypes from 'prop-types';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient
          key={ igKey + i }
          type={ igKey }
        />;
      });
    })
    .reduce((arr, el) => {
      /* We are returning
       * arr => previous value
       * el => current value
       */
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) transformedIngredients = <p>Please start adding ingredients!</p>;
  // console.log('transformedIngredients', transformedIngredients);

  return (
    <div className={ classes.Burger }>
      <BurgerIngredient type='bread-top' />
      { transformedIngredients }
      <BurgerIngredient type='bread-bottom' />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.object.isRequired
};

export default burger;
