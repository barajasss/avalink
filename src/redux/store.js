import { createStore, applyMiddleware } from 'redux'

import reduxLogger from 'redux-logger'
import thunk from 'redux-thunk'

import rootReducer from './root.reducer'

const store = createStore(rootReducer, applyMiddleware(thunk, reduxLogger))

export default store
