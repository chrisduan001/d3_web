/**
 * Created with template on 1/29/18.
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import {} from "react-router-dom";

class chattingPage extends Component {
    componentWillMount() {
        const historyState = this.props.history.location.state;
        if (historyState) {
            this.key = historyState.roomKey;
        }
        //key can only be used once
        this.props.history.replace({...this.props.history, state: undefined});
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
        if (!this.key) {
            return (
                <div><b>Invalid: Please re-enter room number</b></div>
            );
        }

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

};

chattingPage.contextTypes = {
    router: PropTypes.object
};

export default chattingPage;