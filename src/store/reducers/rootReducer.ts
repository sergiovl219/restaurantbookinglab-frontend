import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import userInfoReducer from '../slices/userInfoSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    userinfo: userInfoReducer,
});

export default rootReducer;
