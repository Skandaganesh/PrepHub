import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBdlw11xbmOoN89hbS4CIKM1d2oMocDhA",
  authDomain: "ffproject1-1wlqgg.firebaseapp.com",
  projectId: "ffproject1-1wlqgg",
  storageBucket: "ffproject1-1wlqgg.firebasestorage.app",
  messagingSenderId: "889183137698",
  appId: "1:889183137698:web:84972db2522361ca324cfb",
  measurementId: "G-CRZV4WLZCM",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
