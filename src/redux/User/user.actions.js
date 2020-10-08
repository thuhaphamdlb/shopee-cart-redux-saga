import userTypes from './user.types'

export const emailSignIn = userCredentials => ({
    type: userTypes.EMAIL_SIGN_IN,
    payload: userCredentials
})

export const signInSuccess = user => ({
    type: userTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const checkUserSession = () => ({
    type: userTypes.CHECK_USER_SESSION
})

export const signOutUser = () => ({
    type: userTypes.SIGN_OUT_USER
})

export const signOutUserSuccess = () => ({
    type: userTypes.SIGN_OUT_USER_SUCCESS
})

export const signUpUser = userCredentials => ({
    type: userTypes.SIGN_UP_USER,
    payload: userCredentials
})

export const userError = err => ({
    type: userTypes.USER_ERROR,
    payload: err
})

export const resetPassword = userCredentials => ({
    type: userTypes.RESET_PASSWORD,
    payload: userCredentials
})

export const resetPasswordSuccess = () => ({
    type: userTypes.RESET_PASSWORD_SUCCESS,
    payload: true
})

export const resetUserState = () => ({
    type: userTypes.RESET_USER_STATE
})

export const googleSignIn = () => ({
    type: userTypes.GOOGLE_SIGN_IN
})

export const fetchUser = () => ({
    type: userTypes.FETCH_USER
})

export const fetchUserSuccess = users => ({
    type: userTypes.FETCH_USER_SUCCESS,
    payload: users
})

export const fetchUserFailure = error => ({
    type: userTypes.FETCH_USER_FAILURE,
    payload: error
})