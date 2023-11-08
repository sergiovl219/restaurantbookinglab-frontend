import { combineReducers } from 'redux';
import authReducer from '../slices/authSlice';
// Import other reducers as needed

const rootReducer = combineReducers({
    auth: authReducer,
});

export default rootReducer;
