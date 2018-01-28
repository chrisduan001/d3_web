/**
 * Created with template on 1/26/18.
 */
import * as actionType from "../../shared/types";

const INITIAL_STATE = {
    roomNumber: "",
    userName: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.LANDING_SUBMIT_FORM:
            return state;
        case actionType.LANDING_CHANGE_ROOM_NUMBER:
            return {...state, roomNumber: action.payload};
        case actionType.LANDING_CHANGE_USER_NAME:
            return {...state, userName: action.payload};
        case "TEST":
            console.log("calleddd");
            return state;
        default:
            return state;
    }
}