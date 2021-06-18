import { combineReducers } from 'redux';
import counterReducer from './modules/counter/reducer';
import productsReducer from './modules/products/reducer';

export default combineReducers({
    products: productsReducer,
    counter: counterReducer
});
