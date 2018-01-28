import { combineReducers } from 'redux';
import landingReducer from "./landing/landingReducer";

export default combineReducers({
    landing: landingReducer
});
