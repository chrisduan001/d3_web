/**
 * Created with template on 1/28/18.
 */
import { Observable } from "rxjs/Observable";
import { LANDING_SUBMIT_FORM } from "../../shared/types";

const enterChatRoomEpic = (action$, store) => {
    return action$.ofType(LANDING_SUBMIT_FORM)
        .switchMap(() => {
            return Observable.of({type: "TEST"});
        });
};

export default enterChatRoomEpic;