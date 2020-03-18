// import React from 'react';
import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

// import { BurgerBuilder } from './BurgerBuilder';
// import BuildControls from '../../components/Burger/BuildControls/BuildControls';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    // undefined - is for when the state is jut getting started.
    // {} - no specific action
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });

  it('should store token upon login', () => {
    // undefined - is for when the state is jut getting started.
    // {} - no specific action
    expect(reducer({
      token: null,
      userId: null,
      error: null,
      loading: false,
      authRedirectPath: '/'
    }, {
      type: actionTypes.AUTH_SUCCESS,
      idToken: 'some-token',
      userId: 'some-user-id',
    })).toEqual({
      token: 'some-token',
      userId: 'some-user-id',
      error: null,
      loading: false,
      authRedirectPath: '/'
    });
  });
});
