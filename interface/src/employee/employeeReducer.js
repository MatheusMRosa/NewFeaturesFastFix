const DEFAULT_STATE = {
    list: [
    {
        name: "",
        services: [{}]
    }
],
    filteredList: [],
    filterValue: ''
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "FETCH_EMPLOYEES_FULFILLED":
            return {...state, list: action.payload.data, filteredList: action.payload.data.filter((item) => {
                    return !state.filterValue || item.name.toLowerCase().indexOf(state.filterValue) >= 0
                })};
        case "ADD_EMPLOYEE_FULFILLED":
            let _new = action.payload.data;
            _new.services = _new.services || [];
            return {...state, list: [...state.list, _new]};
        case "ADD_EMPLOYEE_REJECTED":
            console.log("ERROR", action);
            return "";
        case "FILTER_EMPLOYEE":
            return {...state, filterValue:action.payload, filteredList: state.list.filter((item) => {
                return !action.payload || item.name.toLowerCase().indexOf(action.payload) >= 0
            })};
        default:
            return state;
    }

}