import { createStore, applyMiddleware } from "redux";
import createSagaMiddle from "redux-saga";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddle();

export const middlewares = [thunk, sagaMiddleware];

export const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
