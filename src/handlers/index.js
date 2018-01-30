import { combineEpics } from "redux-observable";
import enterChatRoomEpic from "./landing/enterChatRoomEpic";
import validateKeyEpic from "./chatting/validateKeyEpic";

const epics = [
    enterChatRoomEpic,
    validateKeyEpic
];

const rootEpic = combineEpics(...epics);

export default rootEpic;