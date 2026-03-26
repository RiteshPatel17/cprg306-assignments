// app/week-10/_services/shopping-list-service.js

import { db } from "../_utils/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

// Helper: points to users/{userId}/items
function itemsCollectionRef(userId) {
  return collection(db, "users", userId, "items");
}

// ✅ Get all items for a user
export async function getItems(userId) {
  const items = [];

  const snapshot = await getDocs(itemsCollectionRef(userId));

  snapshot.forEach((doc) => {
    items.push({
      id: doc.id,      // document id
      ...doc.data(),   // name, quantity, category
    });
  });

  return items;
}

// ✅ Add a new item for a user, return the new document id
export async function addItem(userId, item) {
  const docRef = await addDoc(itemsCollectionRef(userId), item);
  return docRef.id;
}