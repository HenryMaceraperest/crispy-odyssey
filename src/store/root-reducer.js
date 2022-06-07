import { combineReducers } from 'redux';

import { userReducer } from './user/user.reducer';
import { routesReducer } from './route/route.reducer';
import { validityReducer } from './validity/validity.reducer';
import { bookingReducer } from './booking/booking.reducer';
import { historyReducer } from './history/history.reducer';
import { searchResultReducer } from './result/result.reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    routes: routesReducer,
    validity: validityReducer,
    bookingData: bookingReducer,
    history: historyReducer,
    searchResult: searchResultReducer
});