import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCBZ6TlVBKOucn1cqcH0LZz-edBF5mz-Cc",
  authDomain: "disney-clone-plus-ae2ae.firebaseapp.com",
  projectId: "disney-clone-plus-ae2ae",
  storageBucket: "disney-clone-plus-ae2ae.appspot.com",
  messagingSenderId: "1055355379786",
  appId: "1:1055355379786:web:89eb7a9e749fbc188606b3"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

export { auth, provider, storage };
export default db;
