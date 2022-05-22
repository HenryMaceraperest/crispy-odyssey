import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { logger } from 'redux-logger';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);
//const middlewares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean) DOESNT WORK
const composedEnhancers = compose(applyMiddleware(logger));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);