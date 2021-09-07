import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSDw8jNFGgZHsEISsz06EXtDxuwUJKJDA",
  authDomain: "pvzhelyazkova.firebaseapp.com",
  databaseURL:
    "https://pvzhelyazkova-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "pvzhelyazkova",
  storageBucket: "pvzhelyazkova.appspot.com",
  messagingSenderId: "402283661494",
  appId: "1:402283661494:web:52f1df5537e194590b7e17",
  measurementId: "G-ZTCRHXWR9V",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const auth = firebase.auth();
export default db;
