/**
 * Created with template on 1/26/18.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { _emitter } from "../../index";
import {SOCKET_ENTER_ROOM, SOCKET_ERROR} from "../../shared/types";

class landingForm extends Component {
    componentWillMount() {
        this.enterRoomEmitter = _emitter.addListener(SOCKET_ENTER_ROOM, () => {
            console.log("entered chat room");
        });

        this.errorEmitter = _emitter.addListener(SOCKET_ERROR, (msg) => {
            this.props.onError(msg);
        });
    }

    componentWillUnmount() {
        this.enterRoomEmitter.remove();
        this.errorEmitter.remove();
        console.log("Emitter removed");
    }

    render() {
        const {onSubmit, roomNumber, userName, onChangeRoomNumber, onChangeUserName, loading, errorMessage} = this.props;

        return (
            <div className="landingContainer">
                <input
                    className="landingRoomNumber"
                    placeholder="Enter room number"
                    type="text"
                    value={roomNumber}
                    onChange={e => onChangeRoomNumber(e.target.value)}
                />

                <input
                    className="landingUserName"
                    placeholder="Set your name"
                    type="text"
                    value={userName}
                    onChange={e => onChangeUserName(e.target.value)}
                />

                {errorMessage ? <p className="text-danger">{errorMessage}</p> : null}

                <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    onClick={_ => onSubmit(roomNumber, userName)}
                >Click me</button>

                {loading ? <div className="progressRing center" /> : null}
            </div>
        );
    }
}

landingForm.propTypes = {
    roomNumber: PropTypes.string,
    userName: PropTypes.string,
    loading: PropTypes.bool,
    onSubmit: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
    onChangeRoomNumber: PropTypes.func.isRequired,
    onChangeUserName: PropTypes.func.isRequired
};

export default landingForm;
