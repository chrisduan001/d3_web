/**
 * Created with template on 1/26/18.
 */
import { connect } from 'react-redux';
import landingForm from "./landingPage";
import * as actionType from "../../shared/types";

const mapStateToProps = ({landing}) => {
    const {roomNumber, userName} = landing;
    return {roomNumber, userName};
};

const mapDispatchToProps = (dispatch) => {
    return {
        onChangeRoomNumber: (roomNumber) => {
            dispatch({type: actionType.LANDING_CHANGE_ROOM_NUMBER, payload: roomNumber});
        },
        onChangeUserName: (userName) => {
            dispatch({type: actionType.LANDING_CHANGE_USER_NAME, payload: userName});
        },
        onSubmit: (roomNumber, userName) => {
            dispatch({type: actionType.LANDING_SUBMIT_FORM, payload: {roomNumber, userName}});
        }
    }
};

const landingContainer = connect(mapStateToProps, mapDispatchToProps)(landingForm);

export default landingContainer;