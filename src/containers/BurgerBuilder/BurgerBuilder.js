import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderAction from '../../store/actions/index';

class BurgerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {...}
  // }
  state = {
    purchasing: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    console.log('[BurgerBuilder.js] componentDidMount => ', this.props);
  //   // axios
  //   //   .get('https://react-my-burger-93215.firebaseio.com/ingredients.json')
  //   //   .then(res => {
  //   //     this.setState({ ingredients: res.data });
  //   //   })
  //   //   .catch(err => {
  //   //     console.log('[BurgerBuilder.js] componentDidMount err => ', err);
  //   //     this.setState({ error: true });
  //   //   });
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    // this.setState({ purchasable: sum > 0 }); // APPROACH: => Manage the purchasable state prop with Redux
    return sum > 0; // APPROACH: => Manage the purchasable state prop with React
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchasedCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchasedContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients= { this.props.ings } />
          <BuildControls
            ingredientAdded={ this.props.onIngredientAdded }
            ingredientRemoved={ this.props.onIngredientRemoved }
            disabled={ disabledInfo }
            purchasable={ this.updatePurchaseState(this.props.ings) }
            ordered={ this.purchaseHandler }
            price={ this.props.price }
        />
        </Aux>
      );
      orderSummary = <OrderSummary
        ingredients={ this.props.ings }
        price={ this.props.price }
        purchaseCanceled={ this.purchasedCancelHandler }
        purchasedContinued={ this.purchasedContinueHandler }
      />;
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Aux>
        <Modal
          show={ this.state.purchasing }
          modalClosed={ this.purchasedCancelHandler }>
          { orderSummary }
        </Modal>
        { burger }
      </Aux>
    );
  }
};

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
