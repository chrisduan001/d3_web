/**
 * Created with template on 1/29/18.
 */
import { connect } from "react-redux";
import chattingPage from "./chattingPage";
import * as actionType from "../../shared/types";

const mapStateToProps = ({chatting}) => {
    const {loading, errorMessage} = chatting;
    return {loading, errorMessage};
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadRoomInfo: () => {
            dispatch({type: actionType.CHATTING_GET_ROOM_INFO});
        }
    }
};

const chattingContainer = connect(mapStateToProps, mapDispatchToProps)(chattingPage);
export default chattingContainer;