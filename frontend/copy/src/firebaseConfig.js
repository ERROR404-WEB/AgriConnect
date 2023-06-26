import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA4tis_8YJDh0iIZbLHNxm--Er3zyoF11s",
    authDomain: "farmconnect-4e4aa.firebaseapp.com",
    projectId: "farmconnect-4e4aa",
    storageBucket: "farmconnect-4e4aa.appspot.com",
    messagingSenderId: "408394152934",
    appId: "1:408394152934:web:5f0046b72acd71eb74b427",
    measurementId: "G-KKPWF3XT17"
  };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;