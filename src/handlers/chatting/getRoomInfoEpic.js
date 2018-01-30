/**
 * Created with template on 1/29/18.
 */
import { Observable } from "rxjs/Observable";
import {CHATTING_GET_ROOM_INFO, ON_ERROR, SOCKET_GET_ROOM_INFO} from "../../shared/types";
import * as socket from "../socketHandler";

const getRoomInfoEpic = (action$, store) => {
    return action$.ofType(CHATTING_GET_ROOM_INFO)
        .switchMap(() => {

            if (!socket.isSocketValid()) {
                return Observable.of({type: ON_ERROR, payload: "Invalid, please re-enter room number and try again"})
            }

            socket.emitSocketMessage(SOCKET_GET_ROOM_INFO);
            return Observable.empty();
        });
};

export default getRoomInfoEpic;