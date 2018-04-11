import axios from "axios/index";

const URL_BASE = require('../config/defaultVars');
const URL = URL_BASE.getURL() + "employee";



export const newEmployee = (values)=>({
    type:"ADD_EMPLOYEE",
    payload: axios.put(URL, {...values})

});
export const fetchEmployee = ()=>({
    type:"FETCH_EMPLOYEES",
    payload: axios.get(URL)

});