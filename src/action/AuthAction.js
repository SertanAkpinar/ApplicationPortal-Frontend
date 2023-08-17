export const SHOW_LOGIN_DIALOG = 'SHOW_LOGIN_DIALOG'
export const HIDE_LOGIN_DIALOG = 'HIDE_LOGIN_DIALOG'

export const AUTHENTICATION_PENDING = 'AUTHENTICATION_PENDING'
export const AUTHENTICATION_SUCCESS = 'AUTHENTICATION_SUCCESS'
export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR'
export const CLEAR_AUTHENTICATION = 'CLEAR_AUTHENTICATION';
export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';

export function getShowLoginDialogAction() {
    return {
        type: SHOW_LOGIN_DIALOG
    }
}

export function getHideLoginDialogAction() {
    return {
        type: HIDE_LOGIN_DIALOG
    }
}

export function getAuthenticationPendingAction() {
    return {
        type: AUTHENTICATION_PENDING
    }
}

export function getAuthenticationSuccessAction(userSession) {
    console.log('userSession:', userSession); // Überprüfung des userSession-Objekts

    console.log('isAdmin:', userSession?.isAdmin); // Überprüfung des isAdmin-Attributs

    return {
        type: AUTHENTICATION_SUCCESS,
        user: userSession.user,
        accessToken: userSession.accessToken,
        isAdmin: userSession?.user?.isAdmin //userSession?.user?.isAdmin
    }
}

export function getAuthenticationErrorAction(error) {
    return {
        type: AUTHENTICATION_ERROR,
        error: error
    }
}

export function authenticateUser(userID, password) {
    // console.log('Authenticate')
    return dispatch => {
        dispatch(getAuthenticationPendingAction());
        login(userID, password)
            .then(
                userSession => {
                    const action = getAuthenticationSuccessAction(userSession);
                    dispatch(action)
                },
                error => {
                    dispatch(getAuthenticationErrorAction(error));
                }
            )
            .catch(error => {
                dispatch(getAuthenticationErrorAction(error))
            })
    }
}

function login(userID, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userID, password })
    }
    return fetch('https://localhost/login', requestOptions)
        .then(handleResponse)
        .then(userSession => {
            return userSession;
        })
}

function handleResponse(response) {
    const authorizationHeader = response.headers.get('Authorization')
    return response.text().then(text => {
        // console.log('Receive result: ' + authorizationHeader)

        // const data = text && JSON.parse(text)
        let data;
        try {
            data = JSON.parse(text);
        } catch (error) {
            console.error('Invalid JSON string:', text);
            return Promise.reject(error);
        }
        var token
        if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1]
        }
        if (!response.ok) {
            if (response.status === 401) {
                logout()
            }
            const error = (data && data.message) || response.statusText
            return Promise.reject(error)
        } else {
            let userSession = {
                user: data,
                accessToken: token,
                isAdmin: data.isAdministrator
            }
            return userSession
        }
    })
}

function logout() {
    console.error('Should logout')
}

// export const setAuthToken = (token) => ({
//     type: 'SET_AUTH_TOKEN',
//     payload: token
//   });
export const setAuthToken = (token) => {
    // Token im Local Storage speichern
    localStorage.setItem('authToken', token);

    return {
        type: SET_AUTH_TOKEN,
        payload: token
    };
};

// export const clearAuthenticationAction = () => {
//   return {
//     type: CLEAR_AUTHENTICATION,
//   };
// };
export const clearAuthenticationAction = () => {
    // Token aus dem Local Storage entfernen
    localStorage.removeItem('authToken');

    return {
        type: CLEAR_AUTHENTICATION,
    };
};

export const setIsAdmin = (isAdmin) => {
    return {
        type: 'SET_IS_ADMIN',
        payload: isAdmin,
    };
};
