import { combineEpics } from "redux-observable";
import enterChatRoomEpic from "./landing/enterChatRoomEpic";
import getRoomInfoEpic from "./chatting/getRoomInfoEpic";

const epics = [
    enterChatRoomEpic,
    getRoomInfoEpic
];

const rootEpic = combineEpics(...epics);

export default rootEpic;