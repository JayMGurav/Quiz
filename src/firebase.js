import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';
import { async } from 'q';
import { Details } from '../client/components/Qzlists';
import undefined from 'firebase/firestore';

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
  if (!uid && !Qid) return;
  try {
    const data = await firestore.doc(`room/${Qid}`).get();
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
  const roomsRef = firestore
    .collection('room')
    .doc(Qid)
    .collection('Players')
    .doc(Plyr.id);
  const coll = await roomsRef.get();
  if (!coll.exists) {
    try {
      await roomsRef.set({
        ...Plyr,
      });
      await firestore
        .collection('room')
        .doc(Qid)
        .update({
          players: firebase.firestore.FieldValue.arrayUnion(Plyr.name),
        });
      return ['Created', Plyr];
    } catch (err) {
      console.error('during createQz ' + err.message);
    }
  }
};

export const getPlayer = async (qid, pid) => {
  if (!qid && !pid) return;
  const plyrRef = firestore
    .collection('room')
    .doc(qid)
    .collection('Players')
    .doc(pid);
  const doc = await plyrRef.get();
  if (doc.exists) {
    // ``;
    // try {
    //   // const { players } = doc.data();
    //   // const val = players.find(o => o.id === pid);
    return [doc.exists, pid, doc.data()];
    // } catch (err) {
    //   console.log('during getPlayer ' + err.message);
    // }
  } else {
    return [false, pid];
  }
};

export const changeQuestionStatus = async (uid, qid, Qstatus) => {
  if (!uid && !qid) return;
  const roomsRef = firestore.collection('room').doc(qid);

  const coll = await roomsRef.get();

  if (coll.exists) {
    try {
      await roomsRef.update({
        Qstatus: Qstatus,
      });
      const doc = await getQzDoc(uid, qid);
      return doc.Qstatus;
    } catch (err) {
      console.error('during changing status ' + err.message);
    }
  }
};

export const getQuestions = async (uid, qid, index) => {
  if (!qid) return;

  try {
    const Qdata = await getQzDoc(uid, qid);
    return Qdata.questions[index];
  } catch (err) {
    console.error('during getQuestions ' + err.message);
  }
};

//update score;

export const updateScore = async (qid, pid, score) => {
  if (!qid && !pid) return;
  // const roomsRef = firestore.collection('room').doc(qid);
  console.log(qid, pid, score);
  const plyrRef = firestore
    .collection('room')
    .doc(qid)
    .collection('Players')
    .doc(pid);
  const doc = await plyrRef.get();
  if (doc.exists) {
    try {
      await plyrRef.update({
        score: firebase.firestore.FieldValue.increment(score),
        correct: firebase.firestore.FieldValue.increment(1),
      });
    } catch (err) {
      console.log('During update Score ' + err.message);
    }
  }
};

//order the player according to score
export const orderByScore = async qid => {
  if (!qid) return;
  const qrerf = firestore.collection('room').doc(qid);
  const doc = qrerf.get();
  if (doc.exists) {
    const playersOrder = qrerf
      .collection('players')
      .orderBy('score')
      .get();
    console.log(playersOrder.data());
  }
};

export default firebase;
