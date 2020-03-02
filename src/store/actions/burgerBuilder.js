// SYNCHRONOUS ACTION CREATORS
import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};

export const removeIngredient = (name) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};

export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: ingredients
  };
};

export const fetchIngredientsFailed = () => {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED
  };
};

export const initIngredients = () => {
  // return a function where we recieve the dispatch function where we can use in this function body.
  return dispatch => {
    axios
      .get('https://react-my-burger-93215.firebaseio.com/ingredients.json')
      .then(res => {
        dispatch(setIngredients(res.data));
      })
      .catch(err => {
        console.log('[BurgerBuilder.js] componentDidMount err => ', err);
        dispatch(fetchIngredientsFailed());
      });
  };
};
