import axios from "axios/index";
axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;

const URL_BASE = require('../config/defaultVars');
const URL = URL_BASE.getURL() + "employee";


axios.post(URL_BASE.getURL()+"login", {username:'mathias', password:'123'}).then(()=>{

})

export const newEmployee = (values) => ({
    type: "ADD_EMPLOYEE",
    payload: axios.put(URL, {...values})

});

export const fetchEmployee = () => ({
    type: "FETCH_EMPLOYEES",
    payload: axios.get(URL)

});

export const addServiceInEnployee = (employee, service) => {
    const _new = {...employee};
    _new.services.push(service);
    return ({
        type: "ADD_SERVICE",
        payload: axios.post(URL+'/'+_new._id, _new)

    });
};
