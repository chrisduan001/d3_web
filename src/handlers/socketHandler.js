/**
 * Created with template on 1/28/18.
 */
import io from "socket.io-client";
import * as actionType from "../shared/types";
import { _emitter } from "../index";
import * as webRtc from "./webRtcHandler";

let socket;
export const connectSocket = (roomNumber, userName) => {
    const config = window.config;
    socket = io.connect(config.baseUrl, {query: {userName, roomNumber}});

    socket.on("connect", () => {});

    socket.on("join room", data => {
        _emitter.emit(actionType.SOCKET_ENTER_ROOM, data.userName);
    });

    socket.on(actionType.SOCKET_USER_DISCONNECTED, () => {
        _emitter.emit(actionType.SOCKET_USER_DISCONNECTED);
    });

    socket.on("room full", () => {
        _emitter.emit(actionType.SOCKET_ERROR, "Room full, only support 2 people at the moment");
        socket.disconnect();
    });

    socket.on(actionType.SOCKET_SEND_ROOM_INFO, (message) => {
        _emitter.emit(actionType.SOCKET_ROOM_INFO, message);
    });

    socket.on("receive_sdp", (data) => {
        webRtc.receiveSdp(data.message);
    });

    socket.on("receive_ice_candidate", data => {
        webRtc.receiveIceCandidate(data.message);
    });
};

export const emitSocketMessage = (type, message = {}) => {
    socket.emit(type, message);
};

export const isSocketValid = () => {
    console.log(socket);
    return socket !== undefined;
};

//web rtc action
export const sendIceCandidate = (candidate) => {
    socket.emit("ice_candidate", {message: {candidate}});
    console.log("send ice candidate");
};

export const sendSdp = (sdp, options = {}) => {
    socket.emit("send_sdp", {message: {sdp, options}});
};

