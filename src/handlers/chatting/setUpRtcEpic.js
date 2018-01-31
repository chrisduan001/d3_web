/**
 * Created with template on 1/31/18.
 */
import {Observable} from "rxjs/Observable";
import * as webRtc from "../webRtcHandler";
import {CHATTING_RTC_SETUP} from "../../shared/types";

const setUpRtcEpic = (action$, store) => {
    return action$.ofType(CHATTING_RTC_SETUP)
        .switchMap(action => {
            webRtc.initRtc();

            return Observable.empty();
        });
};

export default setUpRtcEpic;