/**
 * Created with template on 1/30/18.
 */
import {Observable} from "rxjs/Observable";
import {CHATTING_GUEST_JOIN, CHATTING_ROOM_INFO} from "../../shared/types";
import * as webRtc from "../webRtcHandler";
import _ from "lodash";

const signalingEpic = (action$, store) => {
    return action$.filter(action => _.includes([CHATTING_ROOM_INFO, CHATTING_GUEST_JOIN], action.type))
        .switchMap(action => {
            if (action.type === CHATTING_ROOM_INFO && action.payload) {
                webRtc.startSignaling(false);
            } else if (action.type === CHATTING_GUEST_JOIN){
                webRtc.startSignaling(true);
            }

            return Observable.empty();
        });
};

export default signalingEpic;