import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import posts from './reducers/posts';
import rootSaga from './sagas';

const reducers = combineReducers({
  posts
});

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

const store = createStore(reducers, enhancer);

sagaMiddleware.run(rootSaga);

export const provideRedux = C => props => (
  <Provider store={store}>
    <C {...props} />
  </Provider>
);

export default store;
