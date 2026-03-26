"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

import { useUserAuth } from "../_utils/auth-context";
import { getItems, addItem } from "../_services/shopping-list-service";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  // ✅ Hook 1: auth context (always runs)
  const { user } = useUserAuth();

  // ✅ Hooks must always run (even if user is null)
  const [items, setItems] = useState<ItemType[]>([]); // ✅ start empty
  const [selectedItemName, setSelectedItemName] = useState("");

  // ✅ Load items from Firestore when user logs in
  useEffect(() => {
    async function loadItems() {
      if (!user) return;

      const firestoreItems = await getItems(user.uid);
      setItems(firestoreItems);
    }

    loadItems();
  }, [user]);

  // ✅ Protect page AFTER hooks
  if (!user) {
    return (
      <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
        <div className="mx-auto max-w-md bg-white border rounded-lg p-6">
          <h1 className="text-xl font-bold mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-4">
            You must be logged in to view the shopping list.
          </p>
          <Link
            href="/week-10"
            className="block text-center rounded bg-black text-white py-2 hover:bg-slate-800"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  // ✅ From here onward, user is guaranteed NOT null
  const uid = user.uid;

  // ✅ Add item: write to Firestore, then update UI state
  async function handleAddItem(item: Omit<ItemType, "id">) {
    // 1) Add to Firestore
    const newId = await addItem(uid, item);

    // 2) Update UI immediately
    const newItem: ItemType = { id: newId, ...item };
    setItems((prev) => [...prev, newItem]);
  }

  // ✅ Click item -> clean name -> send to MealIdeas API
  function handleItemSelect(item: ItemType) {
    const cleaned = item.name
      .split(",")[0] // remove extra info after comma
      .trim()
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u2011-\u26FF|\uD83E[\uDD00-\uDDFF])/g,
        ""
      ) // remove emojis
      .trim()
      .toLowerCase();

    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen bg-white p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side: Add + List */}
        <div className="md:w-1/2">
          <NewItem onAddItem={handleAddItem} />

          <div className="mt-6">
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
        </div>

        {/* Right side: Meal ideas */}
        <div className="md:w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}