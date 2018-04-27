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
    serviceAdded: false
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
            console.log("ERROR", action);
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
        case "ALTER_SERVICE_FULFILLED":
            console.log(action)
            return state;
        default:
            return state;
    }

}