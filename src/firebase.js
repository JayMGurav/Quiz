import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { async } from 'q';

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
    return { uid, ...data2 };
  } catch (err) {
    console.error('during getUserDoc ' + err.message);
  }
};

//create Qz
export const createQz = async (uid, Qid, Qz) => {
  if (!uid) return;
  const roomsRef = firestore
    .collection('user')
    .doc(uid)
    .collection('Qzs')
    .doc(Qid);

  const coll = await roomsRef.get();
  if (!coll.exists) {
    const createdAt = new Date();
    try {
      roomsRef.set({
        createdAt,
        tag: 'saved',
        status: 'waiting',
        ...Qz,
      });
    } catch (err) {
      console.error('during createQz ' + err.message);
    }
  }
  return getQzDoc(uid, Qid);
};

export const getQzDoc = async (uid, Qid) => {
  // console.log(uid + ':::' + Qid);
  if (!uid && !Qid) return;
  try {
    const data = await firestore.doc(`user/${uid}/Qzs/${Qid}`).get();
    if (data.exists) {
      const data2 = data.data();
      return { uid, ...data2 };
    } else {
      return {
        status: null,
        Qid,
        uid,
      };
    }
  } catch (err) {
    console.error('during getQzDoc ' + err.message);
  }
};

//get doc with the tag "saved " || "taken"

export const getList = async (uid, tag) => {
  if (!uid && !tag) return;

  // console.log(uid);
  const arr = firestore
    .collection(`user/${uid}/Qzs`)
    .where('tag', '==', tag)
    .get()
    .then(function(querySnapshot) {
      const qzArr = [];
      querySnapshot.forEach(function(doc) {
        const id = doc.id;
        const data = doc.data();
        // console.log(id + 'hello');
        qzArr.push({ id, ...data });
      });
      return qzArr;
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
  return arr;
};

//once Qz started change its status to joining and get snapShot
//then again if started change it to started

export default firebase;
