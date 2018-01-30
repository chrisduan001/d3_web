/**
 * Created with template on 1/29/18.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {} from "react-router-dom";
import {_emitter} from "../../index";
import {SOCKET_ROOM_INFO, SOCKET_ENTER_ROOM} from "../../shared/types";

class chattingPage extends Component {
    componentWillMount() {
        this.roomInfoEmitter = _emitter.addListener(SOCKET_ROOM_INFO, (msg) => {
            console.log(msg);
        });

        this.enterRoomEmitter = _emitter.addListener(SOCKET_ENTER_ROOM, (userName) => {
            console.log(userName + " joined the room");
        });

        this.props.loadRoomInfo();
    }

    componentWillUnmount() {
        this.roomInfoEmitter.remove();
        this.enterRoomEmitter.remove();
    }

    renderActiveVoiceCall() {
        return (
            <div className="voiceSection">
                <img className="activeVoice" src="../../../src/shared/images/phone.png" />
            </div>
        );
    }

    renderActiveVideoCall() {
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

    render() {
        const {loading, errorMessage} = this.props;

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

                    <div className="userSection">
                        <b>User Name</b>
                        <img className="voiceCallIcon" src="../../../src/shared/images/phone.png" />
                        <img className="videoCallIcon" src="../../../src/shared/images/video.png" />
                    </div>
                </div>

                <div className="messageContainer">
                    <div className="messageBox">
                        message box
                    </div>

                    <div className="inputBox">
                        <textarea />
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
    loadRoomInfo: PropTypes.func.isRequired
};

chattingPage.contextTypes = {
    router: PropTypes.object
};

export default chattingPage;