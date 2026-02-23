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

export const subscribeToCards = (boardId, callback) => {
  const q = query(
    collection(db, "cards"),
    where("boardId", "==", boardId),
    orderBy("order", "asc"),
  );
  return onSnapshot(q, (snapshot) => {
    const cards = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(cards);
  });
};

export const createCard = async (boardId, listId, title, order) => {
  const docRef = await addDoc(collection(db, "cards"), {
    title,
    listId,
    boardId,
    order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateCard = async (cardId, data) => {
  await updateDoc(doc(db, "cards", cardId), data);
};

export const deleteCard = async (cardId) => {
  await deleteDoc(doc(db, "cards", cardId));
};

export const batchUpdateCards = async (updates) => {
  const batch = writeBatch(db);
  updates.forEach(({ id, data }) => {
    batch.update(doc(db, "cards", id), data);
  });
  await batch.commit();
};
