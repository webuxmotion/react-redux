import createSagaMiddleware from '@redux-saga/core'
import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'
import { forbiddenWordsMiddleware } from './middleware'
 
import rootReducer from './rootReducer'
import { sagaWatcher } from './sagas'

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['posts']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const saga = createSagaMiddleware();

const store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(
        thunk,
        forbiddenWordsMiddleware,
        saga,
      ),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

const persistor = persistStore(store);

saga.run(sagaWatcher);

export {
    store, persistor
}