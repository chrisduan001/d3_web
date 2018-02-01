import { combineEpics } from "redux-observable";
import enterChatRoomEpic from "./landing/enterChatRoomEpic";
import getRoomInfoEpic from "./chatting/getRoomInfoEpic";
import signalingEpic from "./chatting/signalingEpic";
import sendMessageEpic from "./chatting/sendMessageEpic";
import setUpRtcEpic from "./chatting/setUpRtcEpic";
import {startCallEpic, answerCallEpic} from "./chatting/startCallEpic";

const epics = [
    enterChatRoomEpic,
    getRoomInfoEpic,
    signalingEpic,
    sendMessageEpic,
    setUpRtcEpic,
    startCallEpic,
    answerCallEpic
];

const rootEpic = combineEpics(...epics);

export default rootEpic;