import {combineReducers} from 'redux'
import authReducer from './authReducer'

const allReducers = combineReducers({authReducer})

export default allReducers