import axios from "axios/index";

axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;

const URL_BASE = require('../config/defaultVars');
const URL = URL_BASE.getURL() + "employee";

export const newEmployee = (values) => ({
    type: "ADD_EMPLOYEE",
    payload: axios.put(URL, {...values})

});

export const fetchEmployee = () => ({
    type: "FETCH_EMPLOYEES",
    payload: axios.get(URL)

});

export const addServiceInEmployee = (employee, service) => {
    const _new = {...employee};
    _new.services.push(service);
    return ({
        type: "ADD_SERVICE",
        payload: axios.post(URL + '/' + _new._id, _new)

    });
};

export const filterEmployee = (event) => {
    return ({
        type: "FILTER_EMPLOYEE",
        payload: event.target.value.toLowerCase()
    })
};

export const filterSituationService = (situation, idEmployee) => {
    return ({
        type: "FILTER_SITUATION",
        payload: {situation: situation, id: idEmployee}
    })
};

export const graphicServices = (employeeId) => {
  return ({
      type: "GRAPHIC",
      payload: axios.get(URL + '/' + employeeId + '/graphic')
  })
};

export const saveEmployeeForAddService = (employee) => {
    return ({
        type: "EMPLOYEE_SELECTED",
        payload: employee
    });
};

export const calculateDelay = (timeMinuteWritten, timeHourWritten, timeEstimateMinute, timeEstimateHour) => {
    return ({
        type: "DELAY",
        payload: {timeMinuteWritten, timeHourWritten, timeEstimateMinute, timeEstimateHour}
    })
};

export const alterStatusService = (employee, service, values) => {
    return ({
        type: "ALTER_SERVICE",
        payload: axios.post(URL + '/' + employee + '/' + service, values)
    });
};

