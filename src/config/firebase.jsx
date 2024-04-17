
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyArXBcsF7tvlZ8mfgRoYNH3PgkubRVq2P4",
  authDomain: "jellyfish-shop.firebaseapp.com",
  projectId: "jellyfish-shop",
  storageBucket: "jellyfish-shop.appspot.com",
  messagingSenderId: "361251990149",
  appId: "1:361251990149:web:6b82f6b9fff167646dd7ec"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {auth};