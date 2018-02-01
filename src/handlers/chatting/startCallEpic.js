/**
 * Created with template on 1/31/18.
 */
import {Observable} from "rxjs/Observable";
import {CHATTING_ANSWER_CALL, CHATTING_START_CALL} from "../../shared/types";
import * as webRtc from "../webRtcHandler";

const startCallEpic = (action$, store) => {
    return action$.ofType(CHATTING_START_CALL)
        .switchMap(action => {
            webRtc.startCall(action.payload);

            return Observable.empty();
        });
};

const answerCallEpic = (action$, store) => {
    return action$.ofType(CHATTING_ANSWER_CALL)
        .switchMap(action => {
            webRtc.answerCall(action.payload);

            return Observable.empty();
        });
};

export {startCallEpic, answerCallEpic};