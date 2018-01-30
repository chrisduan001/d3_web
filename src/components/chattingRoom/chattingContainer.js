/**
 * Created with template on 1/29/18.
 */
import { connect } from "react-redux";
import chattingPage from "./chattingPage";
import * as actionType from "../../shared/types";

const mapStateToProps = ({chatting}) => {
    const {loading, errorMessage, guestName, callActivated, videoActivated, messageInput} = chatting;
    return {loading, errorMessage, guestName, callActivated, videoActivated, messageInput};
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRoomInfo: () => {
            dispatch({type: actionType.CHATTING_GET_ROOM_INFO});
        },
        onGotRoomInfo: (users) => {
            dispatch({type: actionType.CHATTING_ROOM_INFO, payload: users})
        },
        onGuestJoinRoom: (guestName) => {
            dispatch({type: actionType.CHATTING_GUEST_JOIN, payload: guestName});
        },
        onGuestLeaveRoom: () => {
            dispatch({type: actionType.CHATTING_GUEST_LEAVE});
        },
        onTypeMessage: (message) => {
            dispatch({type: actionType.CHATTING_INPUT_MESSAGE, payload: message});
        },
        startVoiceCall: () => {
            dispatch({type: actionType.CHATTING_START_VOICE_CALL});
        },
        startVideoCall: () => {
            dispatch({type: actionType.CHATTING_START_VIDEO_CALL});
        },
        sendMessage: (userName, message) => {
            dispatch({type: actionType.CHATTING_SEND_MESSAGE, payload: {userName, message}})
        }
    }
};

const chattingContainer = connect(mapStateToProps, mapDispatchToProps)(chattingPage);
export default chattingContainer;