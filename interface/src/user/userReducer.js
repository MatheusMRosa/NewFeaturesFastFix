const DEFAULT_STATE = [
    {
        user: "admin",
        pass: "admin"
    }
];

export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        case "ADD_USER_FULFILLED":
            let _new = action.payload.data;
            return [...state, _new];
        case "ADD_USER_REJECTED":
            console.log("ERROR", action);
            return "";
        case "VERIFY_USER_FULFILLED":
            let validated = action.payload.data;
            if (validated === "Session Enable") {
                console.log("Section Active");
            } else if (validated === "Fields Nulls") {
                console.log("Campos Vazios")
            } else {
                console.log("Problems with a section");
            }
            return [...state, validated];
        case "VERIFY_USER_REJECTED":
            console.log("Problems with Login");
            return "";
        default:
            return state;
    }

}