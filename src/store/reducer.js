import * as actionsTypes from './actions';

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  totalPrice: 4
};

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionsTypes.ADD_INGREDIENT:
      return {
        ...state, // ALWAYS CREATE A NEW OBJECT IN AN IMMUTABLE WAY.
        ingredients: {
          ...state.ingredients, // IMMUTABLE APPROACH
          [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        }
      };
    case actionsTypes.REMOVE_INGREDIENT:
      return {
        ...state, // ALWAYS CREATE A NEW OBJECT IN AN IMMUTABLE WAY.
        ingredients: {
          ...state.ingredients, // IMMUTABLE APPROACH
          [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        }
      };
    default:
      return state;
  }
};

export default reducer;
