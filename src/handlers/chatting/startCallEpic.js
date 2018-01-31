/**
 * Created with template on 1/31/18.
 */
import {Observable} from "rxjs/Observable";
import {CHATTING_START_CALL} from "../../shared/types";
import * as webRtc from "../webRtcHandler";

const startCallEpic = (action$, store) => {
    return action$.ofType(CHATTING_START_CALL)
        .switchMap(action => {
            webRtc.startCall(action.payload);

            return Observable.empty();
        });
};

export default startCallEpic;