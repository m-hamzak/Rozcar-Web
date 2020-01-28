import firebase from "firebase/app";
import "firebase/messaging";

const config = {
  apiKey: "AIzaSyDde8jfupHbP9tlsaGTL4Dl7Ed16Ddao64",
  authDomain: "lanlong-2bd03.firebaseapp.com",
  databaseURL: "https://lanlong-2bd03.firebaseio.com",
  projectId: "lanlong-2bd03",
  storageBucket: "lanlong-2bd03.appspot.com",
  messagingSenderId: "373385363802",
  appId: "1:373385363802:web:7ef0d90f50b895fa"
};

firebase.initializeApp(config);

export default config;
