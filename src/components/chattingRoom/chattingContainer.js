/**
 * Created with template on 1/29/18.
 */
import { connect } from "react-redux";
import chattingPage from "./chattingPage";
import * as actionType from "../../shared/types";

const mapStateToProps = ({chatting}) => {
    const {loading, errorMessage, guestName} = chatting;
    return {loading, errorMessage, guestName};
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRoomInfo: () => {
            dispatch({type: actionType.CHATTING_GET_ROOM_INFO});
        },
        onGetRoomInfo: (users) => {
            dispatch({type: actionType.CHATTING_ROOM_INFO, payload: users})
        },
        onGuestJoinRoom: (guestName) => {
            dispatch({type: actionType.CHATTING_GUEST_JOIN, payload: guestName});
        }
    }
};

const chattingContainer = connect(mapStateToProps, mapDispatchToProps)(chattingPage);
export default chattingContainer;