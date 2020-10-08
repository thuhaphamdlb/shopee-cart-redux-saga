import productTypes from './products.types';

const initialState = {
    products: []
};

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case productTypes.SET_PRODUCTS:
            return {
                ...state,
                products: action.payload
            }
        default:
            return state;
    }
};

export default productsReducer;