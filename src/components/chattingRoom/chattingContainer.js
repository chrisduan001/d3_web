/**
 * Created with template on 1/29/18.
 */
import { connect } from "react-redux";
import chattingPage from "./chattingPage";

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

const chattingContainer = connect(mapStateToProps, mapDispatchToProps)(chattingPage);
export default chattingContainer;