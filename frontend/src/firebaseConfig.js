import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

  const firebaseConfig = {
  apiKey: "AIzaSyBg5SWoaYq8KjjJlmqGyUwzdHNU5ku4lSU",
    authDomain: "ffproject1-1wlqgg.firebaseapp.com",
    projectId: "ffproject1-1wlqgg",
    storageBucket: "ffproject1-1wlqgg.appspot.com",
    messagingSenderId: "889183137698",
    appId: "1:889183137698:web:84972db2522361ca324cfb",
    measurementId: "G-CRZV4WLZCM",
}
 
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
