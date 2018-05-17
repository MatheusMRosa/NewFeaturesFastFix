const DEFAULT_STATE =
    {
        user: "",
        pass: "",
        logged: false,
        error: 0
    }
;

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "ADD_USER_FULFILLED":
            let _new = action.payload.data;
            return {...state, _new};
        case "ADD_USER_REJECTED":
            return {...state, logged: false};
        case "VERIFY_USER_FULFILLED":
            let validated = action.payload.data;
            if (validated === "OK") {
                return {...state, logged: true};
            } else if (validated === "Fields Nulls") {
                console.log("Fields Nulls")
            } else {
                console.log("Problems with a section");
            }
            return {...state, logged: false};
        case "VERIFY_USER_REJECTED":
            if (!action.payload.response){
                return {...state, error: 404, logged: false}
            }
            let validateStatus = action.payload.response.status;
            if (validateStatus === 403) {
                return {...state, error: 403, logged: false}
            } else {
                return {...state, error: 404, logged: false}
            }
        case "VERIFY_SESSION_FULFILLED":
            return {...state, logged: true};
        case "VERIFY_SESSION_REJECTED":
            return {...state, logged: false};
        case "LOGOUT_FULFILLED":
            return {...state, logged: false};
        case "LOGOUT_REJECTED":
            return {...state, logged: false};
        case "BACK_ERROR":
            return {...state, error: 0};
        default:
            return state;
    }

}