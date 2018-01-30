import { combineEpics } from "redux-observable";
import enterChatRoomEpic from "./landing/enterChatRoomEpic";
import getRoomInfoEpic from "./chatting/getRoomInfoEpic";
import signalingEpic from "./chatting/signalingEpic";
import sendMessageEpic from "./chatting/sendMessageEpic";

const epics = [
    enterChatRoomEpic,
    getRoomInfoEpic,
    signalingEpic,
    sendMessageEpic
];

const rootEpic = combineEpics(...epics);

export default rootEpic;