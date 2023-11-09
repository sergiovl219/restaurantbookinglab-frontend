import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
import userInfoReducer from '../slices/userInfoSlice';
import restaurantReducer from '../slices/restaurantSlice';
import ticketReducer from '../slices/ticketSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    userInfo: userInfoReducer,
    restaurant: restaurantReducer,
    ticket: ticketReducer,
});

export default rootReducer;
