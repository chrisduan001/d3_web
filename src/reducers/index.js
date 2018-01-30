import { combineReducers } from 'redux';
import landingReducer from "./landing/landingReducer";
import chattingReducer from "./chatting/chattingReducer";

export default combineReducers({
    landing: landingReducer,
    chatting: chattingReducer
});
