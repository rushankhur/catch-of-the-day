//import Rebase from 're-base';
import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD9TWiWDWDCePwBorK49Vrc81oUCpW0Y_8",
    authDomain: "catch-of-the-day-rush.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-rush.firebaseio.com"
};

firebase.initializeApp(firebaseConfig);

export {
    firebase
}
