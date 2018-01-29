/**
 * Created with template on 1/26/18.
 */
import * as actionType from "../../shared/types";

const INITIAL_STATE = {
    roomNumber: "",
    userName: "",
    loading: false,
    errorMessage: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.LANDING_SUBMIT_FORM:
            return {...state, errorMessage: "", loading: true};
        case actionType.LANDING_CHANGE_ROOM_NUMBER:
            return {...state, roomNumber: action.payload};
        case actionType.LANDING_CHANGE_USER_NAME:
            return {...state, userName: action.payload};
        case actionType.ON_ERROR:
            return {...state, errorMessage: action.payload, loading: false};
        default:
            return state;
    }
}