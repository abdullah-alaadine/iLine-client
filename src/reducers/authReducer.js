const authReducer = (state = { user: null, token: ''}, action) => {
    switch(action.type){
        case "AUTH_SUCCESS":
            return {user: action.payload.user,  token: action.payload.token}
        case "UPDATE_SUCCESS":
            return {...state, user: action.payload}
        case "Logout":
            return null
        default:
            return state
    }
}

export default authReducer