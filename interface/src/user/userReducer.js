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
            console.log("ERROu", action);
            return "";
        default:
            return state;
    }

}