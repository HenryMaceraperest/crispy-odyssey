import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { productsReducer } from './product/product.reducer';
import { validityReducer } from './validity/validity.reducer';
import { bookingReducer } from './booking/booking.reducer';
import { historyReducer } from './history/history.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    products: productsReducer,
    validity: validityReducer,
    bookingData: bookingReducer,
    history: historyReducer
});