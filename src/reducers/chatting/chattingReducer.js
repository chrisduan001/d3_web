/**
 * Created with template on 1/29/18.
 */
import * as actionType from "../../shared/types";

const INITIAL_STATE = {
    loading: true,
    errorMessage: "",
    guestName: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CHATTING_ROOM_INFO:
            return {...state, loading: false, guestName: action.payload};
        case actionType.CHATTING_GUEST_JOIN:
            return {...state, guestName: action.payload};
        case actionType.ON_ERROR:
            return {...state, loading: false, errorMessage: action.payload};
        default:
            return state;
    }
}