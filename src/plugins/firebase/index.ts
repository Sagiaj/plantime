import firebase from '@/config/firebase';
import 'firebase/firestore';

const db = firebase.firestore();

export default db;

export const FirebaseAuth = firebase.auth;
