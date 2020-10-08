import productsTypes from './products.types';

export const addProduct = productData => ({
    type: productsTypes.ADD_NEW_PRODUCT,
    payload: productData
});

export const fetchProducts = () => ({
    type: productsTypes.FETCH_PRODUCTS
});

export const setProducts = products => ({
    type: productsTypes.SET_PRODUCTS,
    payload: products
});

export const deleteProduct = productID => ({
    type: productsTypes.DELETE_PRODUCT,
    payload: productID
});