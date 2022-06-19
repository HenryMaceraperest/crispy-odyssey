import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Firebase database configuration
const firebaseConfig = {
    apiKey: "AIzaSyCH3A42E5nW0Lkb5CeB_t7suYYPCxbcR-c",
    authDomain: "cosmos-odyssey-db.firebaseapp.com",
    projectId: "cosmos-odyssey-db",
    storageBucket: "cosmos-odyssey-db.appspot.com",
    messagingSenderId: "88412072907",
    appId: "1:88412072907:web:054b7b738e83c3e574644e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();

/** firebase function to cause a popup for signing in with google */
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore(firebaseApp);

/** firebase function that checks if user is authenticated, and then allows access to user data (email, displayName, etc.) */
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInformation });
        } catch (e) {
            console.log('error creating the user ', e.message);
        }
    }
    return userSnapshot;
};

/** firebase function that allows creating a user with email & password */
export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

/** firebase function that allows to sign in with email & password */
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

/** firebase function to sign out the user & not have access to the user object */
export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);