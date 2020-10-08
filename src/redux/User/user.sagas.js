import { takeLatest, call, all, put } from 'redux-saga/effects'

import userTypes from './user.types'

import { signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess } from './user.actions'

import { auth, getCurrentUser, handleUserProfile, GoogleProvider } from '../../firebase';
import { handleResetPasswordAPI } from './user.helpers'

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
    try {
        const userRef = yield call(handleUserProfile, { userAuth: user, additionalData });
        const snapshot = yield userRef.get()
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        )
    } catch (error) {
        console.log(error);
    }
}

export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapshotFromUserAuth(user)
    } catch (error) {
        console.log(error)
    }
}

export function* onEmailSignIn() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN, emailSignIn)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield getCurrentUser()
        if (!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    } catch (error) {
        console.log(error);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
    try {
        yield auth.signOut()
        yield put(
            signOutUserSuccess()
        )
    } catch (error) {
        console.log(error);
    }
}

export function* onSignOutUser() {
    yield takeLatest(userTypes.SIGN_OUT_USER, signOutUser)
}

export function* signUpUser({ payload: { displayName, email, password, confirmPassword } }) {
    if (password !== confirmPassword) {
        const err = ['Confirm Password does\'t match'];
        yield put(
            userError(err)
        )
        return;
    }
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password)
        const additionalData = { displayName }
        yield getSnapshotFromUserAuth(user, additionalData)
    } catch (error) {
        console.log(error);
    }
}

export function* onSignUpUser() {
    yield takeLatest(userTypes.SIGN_UP_USER, signUpUser)
}

export function* resetPassword({ payload: { email } }) {
    try {
        yield call(handleResetPasswordAPI, email)
        yield put(
            resetPasswordSuccess()
        )
    } catch (error) {
        yield put(
            userError(error)
        )
    }
}

export function* onResetPassword() {
    yield takeLatest(userTypes.RESET_PASSWORD, resetPassword)
}

export function* googleSignIn() {
    try {
        const { user } = yield auth.signInWithPopup(GoogleProvider);
        yield getSnapshotFromUserAuth(user);

    } catch (error) {
        console.log(error);
    }
}

export function* onGoogleSignIn() {
    yield takeLatest(userTypes.GOOGLE_SIGN_IN, googleSignIn);
}

export default function* userSagas() {
    yield all([
        call(onEmailSignIn),
        call(onCheckUserSession),
        call(onSignOutUser),
        call(onSignUpUser),
        call(onResetPassword),
        call(onGoogleSignIn)
    ])
}