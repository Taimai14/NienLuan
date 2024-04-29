import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFCcvglRntV_8q_GSJeZfCo7mfQ2Xj-og",
  authDomain: "movie-62589.firebaseapp.com",
  projectId: "movie-62589",
  storageBucket: "movie-62589.appspot.com",
  messagingSenderId: "895609703219",
  appId: "1:895609703219:web:4556049390f849f3394c46",
  measurementId: "G-8FHSFEXMRL",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
