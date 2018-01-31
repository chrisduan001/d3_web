/**
 * Created with template on 1/29/18.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {} from "react-router-dom";
import {_emitter} from "../../index";
import {SOCKET_ROOM_INFO, SOCKET_ENTER_ROOM, SOCKET_USER_DISCONNECTED, RTC_RECEIVE_MESSAGE} from "../../shared/types";
import _ from "lodash";

class chattingPage extends Component {
    constructor(props) {
        super(props);

        this.state = {messages: [], requestingCall: false, receivedVoiceCall: false, receivedVideoCall: false};
    }

    componentWillMount() {
        this.userName = this.props.history.location.state.userName;

        this.props.setUpRtc();

        this.roomInfoEmitter = _emitter.addListener(SOCKET_ROOM_INFO, ({message}) => {
            console.log("on get room info");
            this.props.onGotRoomInfo(_.find(message, (user) => user !== this.userName));
        });

        this.enterRoomEmitter = _emitter.addListener(SOCKET_ENTER_ROOM, (userName) => {
            console.log("on guest join room");
            //start signaling process
            this.props.onGuestJoinRoom(userName);
        });

        this.disconnectEmitter = _emitter.addListener(SOCKET_USER_DISCONNECTED, () => {
            this.props.onGuestLeaveRoom();
        });

        this.receiveMessageEmitter = _emitter.addListener(RTC_RECEIVE_MESSAGE, message => {
            this.onNewMessage(message);
        });

        this.streamEmitter = _emitter.addListener("stream", evt => {
            this.guestVideo.src = URL.createObjectURL(evt.stream);
        });
        this.props.loadRoomInfo();
    }

    componentWillUnmount() {
        this.roomInfoEmitter.remove();
        this.enterRoomEmitter.remove();
        this.disconnectEmitter.remove();
        this.receiveMessageEmitter.remove();
        this.streamEmitter.remove();
    }

    onNewMessage(message) {
        const stateMessages = this.state.messages;
        stateMessages.push(message);
        this.setState({messages: stateMessages});

        //Set timeout so the refs.length won't throw exception
        setTimeout(() => {
            this.refs[Object.keys(this.refs).length - 1].scrollIntoView({block: 'end', behavior: 'smooth'});
        }, 500);
    }

    renderActiveVideoCall() {
        return (
            <div className="videoSection">
                <div className="activeUserVideo">
                    <video width="300" height="300" ref={video => {this.guestVideo = video}} autoPlay />
                </div>
                <div className="activeMyVideo">
                    <video width="150" height="150" ref={video => {this.myVideo = video}} autoPlay />
                </div>
            </div>
        );
    }

    createMediaStream() {
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        const constraints = {
            audio: false,
            video: true
        };

        navigator.getUserMedia(constraints, (stream) => {
            this.props.onStartCall(stream);
            this.myVideo.src = window.URL.createObjectURL(stream);
        }, (err) => console.log(err));
    }

    renderUserSection() {
        const {guestName} = this.props;
        return (
            <div className="userSection">
                <div className="userContainer">
                    <b>{this.userName}</b>
                </div>
                {
                    _.isEmpty(guestName) ? null :
                        <div className="userContainer">
                            <b>{guestName}</b>
                            <img
                                className="voiceCallIcon"
                                src="../../../src/shared/images/phone.png"
                                onClick={v => this.createMediaStream()}
                            />
                        </div>
                }

            </div>
        )
    }

    renderMessages() {
        return this.state.messages.map((message, index) => {
            return (<li key={index} ref={index}>{message}</li>);
        });
    }

    render() {
        const {
            loading,
            errorMessage,
            messageInput,
            onTypeMessage,
            sendMessage
        } = this.props;

        if (errorMessage) {
            return (
                <div><b>{errorMessage}</b></div>
            );
        }

        if (loading) { return <div className="progressRing center" /> }

        return (
            <div className="chatContainer">
                <div className="videoContainer">

                    {this.renderActiveVideoCall()}

                    {this.renderUserSection()}
                </div>

                <div className="messageContainer">
                    <div className="messageBox">
                        {this.renderMessages()}
                    </div>

                    <div className="inputBox">
                        <textarea className="textField"
                                  onChange={e => onTypeMessage(e.target.value)}
                                  value={messageInput}
                        />

                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={v => {
                                this.onNewMessage(this.userName + ": " + messageInput);
                                sendMessage(this.userName, messageInput)
                            }}
                        >Send</button>

                    </div>
                </div>
            </div>
        )
    }
}

chattingPage.propTypes = {
    key: PropTypes.string,
    errorMessage: PropTypes.string,
    loading: PropTypes.bool,
    guestName: PropTypes.string,
    messageInput: PropTypes.string,
    loadRoomInfo: PropTypes.func.isRequired,
    onGotRoomInfo: PropTypes.func.isRequired,
    onGuestJoinRoom: PropTypes.func.isRequired,
    onGuestLeaveRoom: PropTypes.func.isRequired,
    onTypeMessage: PropTypes.func.isRequired,
    onStartCall: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    setUpRtc: PropTypes.func.isRequired
};

chattingPage.contextTypes = {
    router: PropTypes.object
};

export default chattingPage;