/**
 * Created with template on 1/28/18.
 */
import io from "socket.io-client";
import {SOCKET_ERROR, SOCKET_ENTER_ROOM, SOCKET_DISCONNECT} from "../shared/types";
import { _emitter } from "../index";

export const connectSocket = (roomNumber, userName) => {
    const config = window.config;
    const socket = io.connect(config.baseUrl, {query: {userName, roomNumber}});

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
};