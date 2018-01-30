/**
 * Created with template on 1/30/18.
 */
import { Observable } from "rxjs/Observable";
import {} from "../../shared/types";
import {sendMesage} from "../webRtcHandler";
import {CHATTING_SEND_MESSAGE} from "../../shared/types";

const sendMessageEpic = (action$, store) => {
    return action$.ofType(CHATTING_SEND_MESSAGE)
        .mergeMap(action => {
            const {userName, message} = action.payload;
            sendMesage(userName, message);
            return Observable.empty();
        });
};

export default sendMessageEpic;