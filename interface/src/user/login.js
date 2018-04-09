import axios from "axios/index";
const URL_BASE = require('../config/config');
const URL = URL_BASE.getURL() + "login";

export function featchUser(){
    return axios.get(URL).then(res=>res.data);
}