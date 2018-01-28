import { combineEpics } from "redux-observable";
import enterChatRoomEpic from "./landing/enterChatRoomEpic";

const epics = [
    enterChatRoomEpic
];

const rootEpic = combineEpics(...epics);

export default rootEpic;