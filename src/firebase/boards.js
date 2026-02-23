import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export const subscribeToBoards = (userId, callback) => {
  const q = query(
    collection(db, "boards"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
  );
  return onSnapshot(q, (snapshot) => {
    const boards = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(boards);
  });
};

export const createBoard = async (userId, title) => {
  const docRef = await addDoc(collection(db, "boards"), {
    title,
    userId,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateBoard = async (boardId, data) => {
  await updateDoc(doc(db, "boards", boardId), data);
};

export const deleteBoard = async (boardId) => {
  await deleteDoc(doc(db, "boards", boardId));
};
