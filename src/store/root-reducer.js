import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { productsReducer } from './product/product.reducer';
import { validityReducer } from './validity/validity.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    validity: validityReducer
});