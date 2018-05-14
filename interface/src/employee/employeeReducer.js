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
    showOpened: true,
    showDelayed: true,
    showServiceOk: true,
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
            return {...state, list: [...state.list, _new], employeeSaved: true};
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
            let employee = state.list.action.payload.id;
            return {
                ...state, filteredList: employee.filter((item) => {
                    if (action.payload.situation === "opened") {
                        return !item.done
                    } else if (action.payload.situation === "delayed") {
                        if (item.done && item.delayed) {
                            return item
                        }
                    } else if (action.payload.situation === "serviceOk") {
                        if (item.done && !item.delayed) {
                            return item
                        }
                    } else {
                        return item
                    }
                    return !action.payload
                })
            };
        // if (action.payload === "opened"){
        //     return {...state, showOpened: true, showDelayed: false, showServiceOk: false}
        // } else if (action.payload === "delayed"){
        //     return {...state, showOpened: false, showDelayed: true, showServiceOk: false}
        // } else if (action.payload === "ServiceOk"){
        //     return {...state, showOpened: false, showDelayed: false, showServiceOk: true}
        // } else {
        //     return {...state, showOpened: true, showDelayed: true, showServiceOk: true}
        // }
        case "GRAPHIC_FULFILLED":
            return {...state, graphic: action.payload.data};
        case "ALTER_SERVICE_FULFILLED":
            return state;
        default:
            return state;
    }

}