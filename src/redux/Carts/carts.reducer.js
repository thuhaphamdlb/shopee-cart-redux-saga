import products from '../Products/products.sagas'

import { ADD_TO_CART } from './carts.types'
const initialState = {
    products: [],
  };
  const ShoppinReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          products: state.products.map(product =>
            product.id === action.id ? {...product, selected: true} : product,
          ),
        };
      default:
        return state;
    }
  };
  export {ShoppinReducer};