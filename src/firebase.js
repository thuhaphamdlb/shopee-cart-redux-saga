import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyAOw2YIPmvYZJ2VIR8KVv8CM1YfXUOgti4",
    authDomain: "fashion-shop-ha-cam.firebaseapp.com",
    databaseURL: "https://fashion-shop-ha-cam.firebaseio.com",
    projectId: "fashion-shop-ha-cam",
    storageBucket: "fashion-shop-ha-cam.appspot.com",
    messagingSenderId: "292027172285",
    appId: "1:292027172285:web:f5ee1f28a7ecefc80d3ed4"
};

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const database = firebase.database()

export const GoogleProvider = new firebase.auth.GoogleAuthProvider()
GoogleProvider.setCustomParameters({ prompt: 'select_account' })

export const handleUserProfile = async ({ userAuth, additionalData }) => {
    if (!userAuth) return;
    const { uid } = userAuth
    const userRef = firestore.doc(`users/${uid}`)
    const snapshot = await userRef.get()

    if (!snapshot.exists) {
        const { displayName, email } = userAuth
        const timestamp = new Date()
        const userRoles = ['user']

        try {
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                userRoles,
                ...additionalData
            })
        }
        catch (e) {
            console.log(e)
        }
    }
    return userRef
}

export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(userAuth => {
            unsubscribe();
            resolve(userAuth);
        }, reject);
    })
}

export default firebase