import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { productsReducer } from './product/product.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer
});