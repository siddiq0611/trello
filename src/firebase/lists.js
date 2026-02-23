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
  writeBatch,
} from "firebase/firestore";
import { db } from "./config";

export const subscribeToLists = (boardId, callback) => {
  const q = query(
    collection(db, "lists"),
    where("boardId", "==", boardId),
    orderBy("order", "asc"),
  );
  return onSnapshot(q, (snapshot) => {
    const lists = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(lists);
  });
};

export const createList = async (boardId, title, order) => {
  const docRef = await addDoc(collection(db, "lists"), {
    title,
    boardId,
    order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateList = async (listId, data) => {
  await updateDoc(doc(db, "lists", listId), data);
};

export const deleteList = async (listId) => {
  await deleteDoc(doc(db, "lists", listId));
};

export const batchUpdateLists = async (updates) => {
  const batch = writeBatch(db);
  updates.forEach(({ id, data }) => {
    batch.update(doc(db, "lists", id), data);
  });
  await batch.commit();
};
