import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { async } from 'q';
import { Details } from '../client/components/Qzlists';

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
  console.log('During createUserProfileDoc');
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
        qzTaken: [],
        savedQz: [],
      });
    } catch (err) {
      console.error('during setting user Profile ' + err.message);
    }
  }
};

// to get document from userId
export const getUserDoc = async uid => {
  if (!uid) return;
  console.log('During getUserDoc');
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
  console.log('During createQz');
  const roomsRef = firestore.collection('room').doc(Qid);
  const coll = await roomsRef.get();
  if (!coll.exists) {
    const createdAt = new Date();
    try {
      roomsRef.set({
        createdAt,
        uid: uid,
        tag: 'saved',
        status: 'notStarted',
        ...Qz,
      });
      return 'Created';
    } catch (err) {
      console.error('during createQz ' + err.message);
    }
  }
};

export const getQzDoc = async (uid, Qid) => {
  console.log('During getQzDoc');
  if (!uid && !Qid) return;
  try {
    const data = await firestore.doc(`room/${Qid}`).get();
    console.log('durimg getQz :: ' + data.exists);
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
  console.log('During getList');
  let query = firestore.collection('room');
  query = query.where('uid', '==', uid);
  query = query.where('tag', '==', tag);
  const arr = query
    .get()
    .then(function(querySnapshot) {
      const qzArr = [];
      querySnapshot.forEach(function(doc) {
        const id = doc.id;
        const data = doc.data();
        qzArr.push({ id, ...data });
      });
      return qzArr;
    })
    .catch(function(error) {
      console.log('Error getting documents: ', error);
    });
  return arr;
};

//once Qz start is clicked change its status to joining and  --returns status
//then again if started change it to started

export const changeQzStatus = async (uid, qid, status) => {
  if (!uid && !qid) return;
  const roomsRef = firestore.collection('room').doc(qid);

  console.log(uid, qid, status);
  const coll = await roomsRef.get();

  if (coll.exists) {
    try {
      await roomsRef.update({
        status: status,
      });
      const doc = await getQzDoc(uid, qid);
      return doc.status;
    } catch (err) {
      console.error('during changing status ' + err.message);
    }
  }
};

export const getQzStatus = async qid => {
  if (!qid) return;

  const qzRef = firestore.collection('room').doc(qid);
  try {
    const getDoc = await qzRef.get();
    if (getDoc.exists) {
      const data = getDoc.data();
      return data.status;
    }
  } catch (err) {
    console.log('during getQzStatus ' + err.message);
  }
};

//create player
export const createQzPlayer = async (Qid, Plyr) => {
  if (!Qid) return;
  const roomsRef = firestore.collection('room').doc(Qid);
  const coll = await roomsRef.get();
  if (coll.exists) {
    try {
      await roomsRef.update({
        players: firebase.firestore.FieldValue.arrayUnion(Plyr),
      });
      return ['Created', Plyr];
    } catch (err) {
      console.error('during createQz ' + err.message);
    }
  }
};

export const getPlayer = async (qid, pid) => {
  if (!qid && !pid) return;

  const plyrRef = firestore.collection('room').doc(qid);
  const doc = plyrRef.get();
  if (doc.exists) {
    const data = await plyrRef.where('players', 'array-contains', pid).get();
    const val = data.data();
    console.log(val);
    if (val) {
      return [val, null];
    } else {
      return [null, pid];
    }
  }
};

export default firebase;
