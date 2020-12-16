import { combineReducers } from 'redux'

import userReducer from './user/user.reducer'
import linksReducer from './links/links.reducer'

const rootReducer = combineReducers({ user: userReducer, links: linksReducer })

export default rootReducer
