import React from 'react';
import '../config/CSS/forbiddenUser.css'

const UserForbidden = () => {
    return (
        <div className="overlay">
            < div className="terminal">
                <h1> Error <span className="errorcode"> 404 </span></h1>
                <p className="output"> The page you are looking for might have been removed, had its name changed or is temporarily unavailable </p>
                <p className="output">Please try <a href="#1">this link</a> or <a href="#2">this link</a></p>
                <p className="output"> Good luck </p>
            </div>
        </div>
)
};

export default UserForbidden;