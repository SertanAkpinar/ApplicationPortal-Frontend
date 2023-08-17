import * as authenticationAction from '../action/AuthAction'


const initialState = {
    user: null,
    loginPending: false,
    showLoginDialog: false,
    error: null,
    isAdmin: false,
    authToken: localStorage.getItem('authToken') || null
}

function rootReducer(state = initialState, action) {
    // console.log('bin im reducer: ' + action.type)

    switch (action.type) {
        case authenticationAction.SHOW_LOGIN_DIALOG:
            // console.log('Show Login Dialog Action')
            return {
                ...state,
                showLoginDialog: true,
                error: null
            }
        case authenticationAction.HIDE_LOGIN_DIALOG:
            // console.log('Hide login dialog action');
            return {
                ...state,
                showLoginDialog: false,
                error: null
            }
        case authenticationAction.SET_AUTH_TOKEN: // Neue Fallbedingung für die Token-Aktion
            // console.log('Set auth token action:', action);
            return {
                ...state,
                authToken: action.payload //Token quasi erstellen
            };
        case authenticationAction.AUTHENTICATION_SUCCESS:
            console.log('Authentication success action:', action.isAdmin);
            return {
                ...state,
                user: action.user,
                authToken: action.accessToken, //speichert im redux store
                isAdmin: action.isAdmin
            };
        default:

            return state
    }
}

export default rootReducer