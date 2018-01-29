/**
 * Created with template on 1/28/18.
 */
import { Observable } from "rxjs/Observable";
import { LANDING_SUBMIT_FORM, ON_ERROR } from "../../shared/types";
import * as socket  from "../socketHandler";
import _ from "lodash";

const enterChatRoomEpic = (action$, store) => {
    return action$.ofType(LANDING_SUBMIT_FORM)
        .switchMap(action => {
            // if (action.payload === undefined) {
            //     socket.disConnectSocket();
            // } else {
            //
            // }

            const {roomNumber, userName} = action.payload;

            if (_.isEmpty(userName) || _.isEmpty(roomNumber)) {
                return Observable.of({type: ON_ERROR, payload: "User name or room number can not be empty"});
            }

            socket.connectSocket(roomNumber, userName);
            return Observable.empty();
        });
};

export default enterChatRoomEpic;