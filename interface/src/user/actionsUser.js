import axios from "axios/index";

const URL_BASE = require('../config/defaultVars');
const URL = URL_BASE.getURL() + "user";

export const newUser = (values) => ({
    type: "ADD_USER",
    payload: axios.put(URL, {...values})
});

export const backError = () => ({
    type: "BACK_ERROR",
    payload: true
});
