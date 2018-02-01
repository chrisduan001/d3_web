/**
 * Created with template on 1/30/18.
 */
import * as socket from "./socketHandler";
import { _emitter } from "../index";
import {RTC_ON_ADD_STREAM, RTC_RECEIVE_MESSAGE, RTC_START_STREAM} from "../shared/types";
import _ from "lodash";

const configuration = {
    'iceServers': [{
        'url': 'stun:stun.l.google.com:19302'
    }]
};

const dataChannelOptions = {
    ordered: false,
    maxRetransmitTime: 1000
};

let rtcPeerConn;
let dataChannel;

const receiveDataChannelMessage = (evt) => {
    console.log(evt.data);
    _emitter.emit(RTC_RECEIVE_MESSAGE, evt.data);
};

const receiveChannelCallback = () => {
    console.log("remote datachannel set up");
    dataChannel = event.channel;
    dataChannel.onmessage = receiveDataChannelMessage;
};

const handleSendChannelStatusChange = () => {
    console.log("datachannel status: " + dataChannel.readyState);
    if (dataChannel.readyState === "open") {
        console.log("local data channel set up");
        dataChannel.onmessage = receiveDataChannelMessage;
    }
};

const setRemoteDesc = (desc, options) => {
    rtcPeerConn.setRemoteDescription(desc)
        .then(() => {
            if (rtcPeerConn.remoteDescription.type === 'offer') {
                if (!_.isEmpty(options)) {
                    _emitter.emit(RTC_START_STREAM, options.enableVideo);
                    return;
                }

                createAnswer();
            }
        })
};

const createAnswer = () => {
    rtcPeerConn.createAnswer()
        .then(offer => {
            return rtcPeerConn.setLocalDescription(offer);
        })
        .then(() => {
            socket.sendSdp(rtcPeerConn.localDescription);
        })
        .catch(error => console.log(error));
};

export const receiveSdp = ({sdp, options}) => {
    const desc = new RTCSessionDescription(sdp);
    setRemoteDesc(desc, options);
};

export const receiveIceCandidate = ({candidate}) => {
    console.log("receive ice candidate");
    rtcPeerConn.addIceCandidate(new RTCIceCandidate(candidate));
};

export const initRtc = () => {
    rtcPeerConn = new RTCPeerConnection(configuration);

    console.log("starting signalingl...");
    dataChannel = rtcPeerConn.createDataChannel("textMessages", dataChannelOptions);
    //remote channel
    rtcPeerConn.ondatachannel = receiveChannelCallback;

    //local channel
    dataChannel.onopen = handleSendChannelStatusChange;

    rtcPeerConn.onicecandidate = (evt) => {
        if (evt.candidate) {
            socket.sendIceCandidate(evt.candidate);
        }
    };

    rtcPeerConn.onaddstream = (evt) => {
        console.log("on add stream");
        _emitter.emit(RTC_ON_ADD_STREAM, evt);
    }
};

export const startCall = ({stream, enableVideo}) => {
    rtcPeerConn.addStream(stream);

    createOffer({enableVideo});
};

export const answerCall = ({stream}) => {
    rtcPeerConn.addStream(stream);
    createAnswer();
};

export const createOffer = (options = {}) => {
    rtcPeerConn.createOffer()
        .then(offer => {
            return rtcPeerConn.setLocalDescription(offer);
        })
        .then(() => {
            socket.sendSdp(rtcPeerConn.localDescription, options);
        })
        .catch(err => console.log(err));
};

export const sendMesage = (userName, message) => {
    dataChannel.send(userName + ": " + message);
};