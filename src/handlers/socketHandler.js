/**
 * Created with template on 1/28/18.
 */
import io from "socket.io-client";
import {SOCKET_ERROR, SOCKET_ENTER_ROOM, SOCKET_DISCONNECT} from "../shared/types";
import { _emitter } from "../index";

let socket;
export const connectSocket = (roomNumber, userName) => {
    socket = io.connect("http://localhost:1337", {query: {userName, roomNumber}});

    socket.on("connect", () => {
        _emitter.emit(SOCKET_ENTER_ROOM);
    });

    socket.on("disconnect", () => {
        console.log("disconnected");
    });

    socket.on("room full", () => {
        _emitter.emit(SOCKET_ERROR, "Room full, only support 2 people at the moment");
        socket.disconnect();
    });
};

export const disConnectSocket = () => {
    socket.disconnect();
};