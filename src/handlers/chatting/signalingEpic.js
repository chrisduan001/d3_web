/**
 * Created with template on 1/30/18.
 */
import {Observable} from "rxjs/Observable";
import {CHATTING_GUEST_JOIN, CHATTING_ROOM_INFO} from "../../shared/types";
import * as webRtc from "../webRtcHandler";
import _ from "lodash";

const signalingEpic = (action$, store) => {
    return action$.ofType(CHATTING_GUEST_JOIN)
        .switchMap(action => {
            webRtc.createOffer();

            return Observable.empty();
        });
};

export default signalingEpic;