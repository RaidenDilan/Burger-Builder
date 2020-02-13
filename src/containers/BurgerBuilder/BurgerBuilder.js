import React, { Component } from 'react';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


// Typpical global constants are written in ALL CAPS
const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }

  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false
  };

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    this.setState({ purchasable: sum > 0 });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  addIngredientHandler = (type) => {
    const oldCOunt = this.state.ingredients[type];
    const updatedCount = oldCOunt + 1;
    const updatedIngredients = {
      // State should be updated in an unmutable way
      // Then use the spread opertar to distribute the properties of the old ingredients state into the new object we are creatng bellow.
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients); // Call updatePurchaseState() to update our property purchasable: true
  };

  removeIngredientHandler = (type) => {
    const oldCOunt = this.state.ingredients[type];

    if (oldCOunt <= 0) return; // return nothing if oldCOunt is equal to or less than 0.
    const updatedCount = oldCOunt - 1;
    const updatedIngredients = {
      // State should be updated in an unmutable way
      // Then use the spread opertar to distribute the properties of the old ingredients state into the new object we are creatng bellow.
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
    this.updatePurchaseState(updatedIngredients); // Call updatePurchaseState() to update our property purchasable: true
  };

  purchasedCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasedContinueHandler = () => {
    // alert('You continued');
    this.setState({ loading: true });

    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'R. Dilan',
        address: {
          street: 'Test Street',
          zipCode: 'SW1X 7TA',
          country: 'United Kingdom'
        },
        email: 'test@test.com',
      },
      deliveryMthod: 'fastest'
    };

    axios
      .post('/orders', order)
      .then(response => {
        // console.log(response);
        this.setState({ loading: false, purchasing: false });
      })
      .catch(err => {
        this.setState({ loading: false, purchasing: false });
        // console.log(err);
      });
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
      // { salad: true, meat: false, ... }
    }

    let orderSummary = <OrderSummary
      ingredients={ this.state.ingredients }
      purchaseCanceled={ this.purchasedCancelHandler }
      purchasedContinued={ this.purchasedContinueHandler }
      price={ this.state.totalPrice.toFixed(2) }
    />;

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Aux>
        <Modal
          show={ this.state.purchasing }
          modalClosed={ this.purchasedCancelHandler }
        >
          { orderSummary }
        </Modal>
        <Burger ingredients={ this.state.ingredients } />
        <BuildControls
          ingredientAdded={ this.addIngredientHandler }
          ingredientRemoved={ this.removeIngredientHandler }
          disabled={ disabledInfo }
          purchasable={ this.state.purchasable }
          ordered={ this.purchaseHandler }
          price={ this.state.totalPrice }
        />
      </Aux>
    );
  }
};

export default withErrorHandler(BurgerBuilder, axios);
