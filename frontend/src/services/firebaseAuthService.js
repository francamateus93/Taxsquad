// import { auth, googleProvider } from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getAuth,
  GoogleAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADERYxZoa7GSE4bDFDLsMwqcPqvrHjqCQ",
  authDomain: "taxsquad-project.firebaseapp.com",
  projectId: "taxsquad-project",
  storageBucket: "taxsquad-project.firebasestorage.app",
  messagingSenderId: "351836815257",
  appId: "1:351836815257:web:d2014ee593191fe2895d08",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};

export const registerWithEmail = async (email, password) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error(error);
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error(error);
  }
};
