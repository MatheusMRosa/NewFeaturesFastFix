import axios from "axios/index";

const URL_BASE = require('../config/defaultVars');
const URL = URL_BASE.getURL() + "login";

export const verifyLogin = (user) => {
    const _new = {...user};
    return ({
        type: "ADD_SERVICE",
        payload: axios.post(URL, {username:'mathias', password:'123'})

    });
};