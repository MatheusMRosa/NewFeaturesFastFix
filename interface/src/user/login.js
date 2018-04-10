import axios from "axios/index";
const URL_BASE = require('../config/defaultVars');
const URL = URL_BASE.getURL() + "login";

export function featchUser(){
    return axios.get(URL).then(res=>res.data);
}