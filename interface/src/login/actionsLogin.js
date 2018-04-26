import axios from "axios";

const URL_BASE = require('../config/defaultVars');
const URL = URL_BASE.getURL() + "login";

export const verifyLogin = (user) => {
    const _new = {...user};
    return ({
        type: "VERIFY_USER",
        payload: axios.post(URL,_new)
    });
};

export const verifySession = () => {
    return ({
        type: "VERIFY_SESSION",
        payload: axios.get(URL)
    });
};