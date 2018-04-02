import * as firebase from 'firebase';

const prodConfig = {
  // apiKey: YOUR_API_KEY,
  // authDomain: YOUR_AUTH_DOMAIN,
  // databaseURL: YOUR_DATABASE_URL,
  // projectId: YOUR_PROJECT_ID,
  // storageBucket: '',
  // messagingSenderId: YOUR_MESSAGING_SENDER_ID,
};

const devConfig = {
  apiKey: "AIzaSyDb1Acu2hRPOcuyIKYPNTGIQaqGAf_ghqY",
  authDomain: "article-service-66d43.firebaseapp.com",
  databaseURL: "https://article-service-66d43.firebaseio.com",
  projectId: "article-service-66d43",
  storageBucket: "article-service-66d43.appspot.com",
  messagingSenderId: "466191480429"
};

const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export {
  db,
  auth,
  firebase
};
