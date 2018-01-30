/**
 * Created with template on 1/28/18.
 */
import io from "socket.io-client";
import {SOCKET_ERROR, SOCKET_ENTER_ROOM, SOCKET_ROOM_INFO, SOCKET_SEND_ROOM_INFO} from "../shared/types";
import { _emitter } from "../index";

let socket;
export const connectSocket = (roomNumber, userName) => {
    const config = window.config;
    socket = io.connect(config.baseUrl, {query: {userName, roomNumber}});

    socket.on("connect", () => {});

    socket.on("join room", data => {
        _emitter.emit(SOCKET_ENTER_ROOM, data.userName);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });

    socket.on("room full", () => {
        _emitter.emit(SOCKET_ERROR, "Room full, only support 2 people at the moment");
        socket.disconnect();
    });

    socket.on(SOCKET_SEND_ROOM_INFO, (message) => {
        _emitter.emit(SOCKET_ROOM_INFO, message);
    });
};

export const emitSocketMessage = (type, message = {}) => {
    socket.emit(type, message);
};

export const isSocketValid = () => {
    console.log(socket);
    return socket !== undefined;
};