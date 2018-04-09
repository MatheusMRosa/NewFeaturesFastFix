import axios from "axios/index";
const URL_BASE = require('../config/config');
const URL = URL_BASE.getURL() + "employee";

export function addEmployee(values){
    return axios.put(URL, {name: values.name, services: {}});
}
export function featchEmployee(){
    return axios.get(URL).then(res=>res.data);
}