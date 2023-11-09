import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import userInfoReducer from '../slices/userInfoSlice';
import restaurantReducer from '../slices/restaurantSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer,
    restaurant: restaurantReducer,
});

export default rootReducer;
