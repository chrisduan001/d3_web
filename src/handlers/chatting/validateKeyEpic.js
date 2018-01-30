/**
 * Created with template on 1/29/18.
 */
import {} from "rxjs/Observable";
import {CHATTING_VALIDATE_KEY} from "../../shared/types";

const validateKeyEpic = (action$, store) => {
    return action$.ofType(CHATTING_VALIDATE_KEY)
        .switchMap(action => {
            const {key} = action.payload;

            return Observable.empty();
        });
};

export default validateKeyEpic;