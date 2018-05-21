const DEFAULT_STATE = {
    list: [
        {
            name: "",
            services: []
        }
    ],
    filteredList: [],
    filterValue: '',
    employeeSelected: undefined,
    employeeSaved: false,
    serviceAdded: false,
    delay: false,
    graphic: undefined
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "FETCH_EMPLOYEES_FULFILLED":
            return {
                ...state, list: action.payload.data, filteredList: action.payload.data.filter((item) => {
                    return !state.filterValue || item.name.toLowerCase().indexOf(state.filterValue) >= 0
                })
            };
        case "ADD_EMPLOYEE_FULFILLED":
            let _new = action.payload.data;
            _new.services = _new.services || [];
            return {...state, list: [...state.list, _new], filteredList: [...state.list, _new], employeeSaved: true};
        case "ADD_EMPLOYEE_REJECTED":
            return state;
        case "ADD_SERVICE_FULFILLED":
            return {...state, serviceAdded: true};
        case "ADD_SERVICE_REJECTED":
            return state;
        case "FILTER_EMPLOYEE":
            return {
                ...state, filterValue: action.payload, filteredList: state.list.filter((item) => {
                    return !action.payload || item.name.toLowerCase().indexOf(action.payload) >= 0
                })
            };
        case "EMPLOYEE_SELECTED":
            return {...state, employeeSelected: action.payload};
        case "DELAY":
            let estimate = (action.payload.timeEstimateHour * 60) + action.payload.timeEstimateMinute;
            let written = (action.payload.timeHourWritten * 60) + action.payload.timeMinuteWritten;
            if (written - estimate > 0) {
                return {...state, delay: true}
            } else {
                return {...state, delay: false}
            }
        case "FILTER_SITUATION":
            if (action.payload.situation === "clean") {
                return {...state, filteredList: state.list};
            } else {
                return {
                    ...state, filteredList: [...state.list.filter((employee) => {
                        if (employee._id === action.payload.id) {
                            return {
                                ...employee, services: employee.services.filter((item) => {
                                    switch (action.payload.situation) {
                                        case "ok":
                                            if (item.done && !item.delayed) {
                                                return item;
                                            }
                                            return null;
                                        case "opened":
                                            if (!item.done) {
                                                return item
                                            }
                                            return null;
                                        case "delayed":
                                            if (item.done && item.delayed) {
                                                return item;
                                            }
                                            return null;
                                        default:
                                            return item;
                                    }
                                })
                            }
                        } else {
                            return employee;
                        }
                    })]
                };
            }
        case "GRAPHIC_FULFILLED":
            return {...state, graphic: action.payload.data};
        case "ALTER_SERVICE_FULFILLED":
            return state;
        default:
            return state;
    }

}