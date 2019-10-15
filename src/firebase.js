import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBks9rZ69SSw8XZaudZq_honmL6pV7Elek',
  authDomain: 'quiz-a65b3.firebaseapp.com',
  databaseURL: 'https://quiz-a65b3.firebaseio.com',
  projectId: 'quiz-a65b3',
  storageBucket: '',
  messagingSenderId: '132473384193',
  appId: '1:132473384193:web:7448a951b15f8e3ce37f00',
  measurementId: 'G-4D43N0NY6X',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//create user profile doc in user coll
export const createUserProfileDoc = async (user, addData) => {
  if (!user) return;

  const userCollRef = firestore.collection(`user`).doc(user.uid);
  const coll = await userCollRef.get();
  if (!coll.exists) {
    const { email } = user;
    const createdAt = new Date();
    try {
      userCollRef.set({
        email,
        createdAt,
        ...addData,
        savedQz: [],
        qzTaken: [],
      });
    } catch (err) {
      console.error('during setting user Profile ' + err.message);
    }
  }
  return getUserDoc(user.uid);
};

// to get document from userId
export const getUserDoc = async uid => {
  if (!uid) return;
  try {
    const data = await firestore.doc(`user/${uid}`).get();
    const data2 = data.data();
    // await firestore.doc(`user/${uid}`).onSnapshot(function(doc) {
    //   return { uid, ...doc.data() };
    // });
    return { uid, ...data2 };
  } catch (err) {
    console.error('during getUserDoc ' + err.message);
  }
};

//

export default firebase;
