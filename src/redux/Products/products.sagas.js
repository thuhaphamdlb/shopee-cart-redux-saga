import { auth } from './../../firebase';
import { takeLatest, put, all, call } from 'redux-saga/effects';
import { setProducts, fetchProducts } from './products.actions';
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './products.helpers';
import productsTypes from './products.types';

export function* addProduct({ payload: { productCategory, productName, productThumbnail, productPrice } }) {
    try {
        const timestamp = new Date();
        yield handleAddProduct({
            productCategory,
            productName,
            productPrice,
            productAdminUserUID: auth.currentUser.uid,
            createdDate: timestamp
        }, productThumbnail);
        yield put(
            fetchProducts()
        );
    } catch (err) {
        console.log(err);
    }

}

export function* onAddProduct() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT, addProduct);
}

export function* fetchAllProducts() {
    try {
        const products = yield handleFetchProducts();
        yield put(
            setProducts(products)
        );

    } catch (err) {
        console.log(err);
    }
}

export function* onFetchProducts() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS, fetchAllProducts);
}

export function* deleteProduct({ payload }) {
    try {
        yield handleDeleteProduct(payload);
        yield put(
            fetchProducts()
        );
    } catch (err) {
        console.log(err);
    }
}

export function* onDeleteProduct() {
    yield takeLatest(productsTypes.DELETE_PRODUCT, deleteProduct);
}

export default function* productsSagas() {
    yield all([
        call(onAddProduct),
        call(onFetchProducts),
        call(onDeleteProduct),
    ])
}