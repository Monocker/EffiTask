import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
/* import { getAnalytics } from "firebase/analytics";
 */
const firebaseConfig = {
  apiKey: 'AIzaSyDU1UihhpIuZ-7JwJiGttL6HloazYcD0h4',
  authDomain: 'effitask-fb3ff.firebaseapp.com',
  projectId: 'effitask-fb3ff',
  storageBucket: 'effitask-fb3ff.appspot.com',
  messagingSenderId: '669449622209',
  appId: '1:669449622209:web:d1f085d200cce1d104ba40',
  measurementId: 'G-Y6SLBFRSFK'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
/* const analytics = getAnalytics(app);
 */
export { db, auth }
