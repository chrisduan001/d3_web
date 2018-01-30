/**
 * Created with template on 1/29/18.
 */
import * as actionType from "../../shared/types";

const INITIAL_STATE = {
    loading: true,
    errorMessage: ""
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionType.ON_ERROR:
            return {...state, loading: false, errorMessage: action.payload};
        default:
            return state;
    }
}