/**
 * Created with template on 1/29/18.
 */
import * as actionType from "../../shared/types";

const INITIAL_STATE = {
    loading: true,
    errorMessage: "",
    guestName: "",
    callActivated: false,
    videoActivated: false,
    messageInput: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.CHATTING_ROOM_INFO:
            return {...state, loading: false, guestName: action.payload};
        case actionType.CHATTING_GUEST_JOIN:
            return {...state, guestName: action.payload};
        case actionType.CHATTING_GUEST_LEAVE:
            return {...state, guestName: ""};
        case actionType.CHATTING_INPUT_MESSAGE:
            return {...state, messageInput: action.payload};
        case actionType.ON_ERROR:
            return {...state, loading: false, errorMessage: action.payload};
        default:
            return state;
    }
}