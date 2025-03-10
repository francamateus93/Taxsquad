import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, sign } from "firebase/auth";

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
const auth = app.auth();
const googleProvider = new app.auth.GoogleAuthProvider();
