import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnJ_P6Y9aFnqPjWm37fRdZg9Zi00wlHHY",
  authDomain: "resumeubilder.firebaseapp.com",
  projectId: "resumeubilder",
  storageBucket: "resumeubilder.appspot.com",
  messagingSenderId: "651872686632",
  appId: "1:651872686632:web:7badf607a3c6f464e29b1d",
  measurementId: "G-SXQ8NLZRQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
