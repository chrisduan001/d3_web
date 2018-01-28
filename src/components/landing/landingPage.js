/**
 * Created with template on 1/26/18.
 */
import React from 'react';
import PropTypes from 'prop-types';

const landingForm = ({
        onSubmit,
        roomNumber,
        userName,
        onChangeRoomNumber,
        onChangeUserName
    }) => {
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

            <button
                type="submit"
                className="btn btn-primary"
                onClick={_ => onSubmit()}
            >Click me</button>

        </div>
    )
};

landingForm.propTypes = {
    roomNumber: PropTypes.string,
    userName: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onChangeRoomNumber: PropTypes.func.isRequired,
    onChangeUserName: PropTypes.func.isRequired
};

export default landingForm;
