const DEFAULT_STATE = [
    {
        name: "Empregado",
        services: [
            {
                descService: "Serviço"
            }
        ]
    }
];

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "FETCH_EMPLOYEES_FULFILLED":
            return [...action.payload.data];
        case "ADD_EMPLOYEE_FULFILLED":
            let _new = action.payload.data;
            _new.services = _new.services || [];
            return [...state, _new];
        case "ADD_EMPLOYEE_REJECTED":
            console.log("ERROR", action);
            return "";
        default:
            return state;
    }

}