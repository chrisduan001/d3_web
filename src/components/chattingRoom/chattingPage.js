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

        this.state = {messages: []};
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

        this.props.loadRoomInfo();
    }

    componentWillUnmount() {
        this.roomInfoEmitter.remove();
        this.enterRoomEmitter.remove();
        this.disconnectEmitter.remove();
        this.receiveMessageEmitter.remove();
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

    static renderActiveVoiceCall() {
        return (
            <div className="voiceSection">
                <img className="activeVoice" src="../../../src/shared/images/phone.png" />
            </div>
        );
    }

    static renderActiveVideoCall() {
        return (
            <div className="videoSection">
                <div className="activeUserVideo">
                    <img className="activeUserVideoIcon" src="../../../src/shared/images/phone.png" />
                </div>
                <div className="activeMyVideo">
                    <img className="activeMyVideoIcon" src="../../../src/shared/images/video.png" />
                </div>
            </div>
        );
    }

    renderUserSection() {
        const {guestName, startVoiceCall, startVideoCall} = this.props;
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
                                onClick={startVoiceCall}
                            />
                            <img
                                className="videoCallIcon"
                                src="../../../src/shared/images/video.png"
                                onClick={startVideoCall}
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
            videoActivated,
            callActivated,
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

                    {
                        (videoActivated || callActivated) ?
                            videoActivated ? this.renderActiveVideoCall() : this.renderActiveVoiceCall()
                            : <div className="videoSection" />
                    }

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
    callActivated: PropTypes.bool,
    videoActivated: PropTypes.bool,
    loading: PropTypes.bool,
    guestName: PropTypes.string,
    messageInput: PropTypes.string,
    loadRoomInfo: PropTypes.func.isRequired,
    onGotRoomInfo: PropTypes.func.isRequired,
    onGuestJoinRoom: PropTypes.func.isRequired,
    onGuestLeaveRoom: PropTypes.func.isRequired,
    onTypeMessage: PropTypes.func.isRequired,
    startVoiceCall: PropTypes.func.isRequired,
    startVideoCall: PropTypes.func.isRequired,
    sendMessage: PropTypes.func.isRequired,
    setUpRtc: PropTypes.func.isRequired
};

chattingPage.contextTypes = {
    router: PropTypes.object
};

export default chattingPage;