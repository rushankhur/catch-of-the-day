import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyD9TWiWDWDCePwBorK49Vrc81oUCpW0Y_8",
    authDomain: "catch-of-the-day-rush.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-rush.firebaseio.com"
});

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp };

export default base;
