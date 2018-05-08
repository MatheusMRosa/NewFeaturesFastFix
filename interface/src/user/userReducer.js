const DEFAULT_STATE =
    {
        user: "",
        pass: "",
        logged: false,
        error: ""
    }
;

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "ADD_USER_FULFILLED":
            let _new = action.payload.data;
            return {...state, _new};
        case "ADD_USER_REJECTED":
            return state;
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
            let validateStatus = action.payload.response.status;
            if (validateStatus === 403){
                return {...state, error: "403"}
            } else {
                console.log("Problems with Login");
            }
            return state;
        case "VERIFY_SESSION_FULFILLED":
                return {...state, logged: true}
        default:
            return state;
    }

}