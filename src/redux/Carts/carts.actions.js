
import {ADD_TO_CART } from './carts.types';

export const addToCart = (productName) => {
    return {
      type: ADD_TO_CART,
      productName
    };
  };