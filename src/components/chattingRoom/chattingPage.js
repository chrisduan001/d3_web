/**
 * Created with template on 1/29/18.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {} from "react-router-dom";
import {_emitter} from "../../index";
import {SOCKET_ROOM_INFO, SOCKET_ENTER_ROOM} from "../../shared/types";
import _ from "lodash";

class chattingPage extends Component {
    componentWillMount() {
        this.userName = this.props.history.location.state.userName;

        this.roomInfoEmitter = _emitter.addListener(SOCKET_ROOM_INFO, ({message}) => {
            this.props.onGetRoomInfo(_.find(message, (user) => user !== this.userName));
        });

        this.enterRoomEmitter = _emitter.addListener(SOCKET_ENTER_ROOM, (userName) => {
            this.props.onGuestJoinRoom(userName);
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

    renderUserSection() {
        return (
            <div className="userSection">
                <div className="userContainer">
                    <b>{this.userName}</b>
                </div>
                {
                    _.isEmpty(this.props.guestName) ? null :
                        <div className="userContainer">
                            <b>{this.props.guestName}</b>
                            <img className="voiceCallIcon" src="../../../src/shared/images/phone.png" />
                            <img className="videoCallIcon" src="../../../src/shared/images/video.png" />
                        </div>
                }

            </div>
        )
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

                    {this.renderUserSection()}
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
    guestName: PropTypes.string,
    loadRoomInfo: PropTypes.func.isRequired,
    onGetRoomInfo: PropTypes.func.isRequired,
    onGuestJoinRoom: PropTypes.func.isRequired
};

chattingPage.contextTypes = {
    router: PropTypes.object
};

export default chattingPage;