"use client";

import Link from "next/link";
import { useState } from "react";
import itemsData from "./items.json";

import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

import { useUserAuth } from "../_utils/auth-context";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const { user } = useUserAuth();

  // ✅ Protection: if not logged in, show message + link back
  if (!user) {
    return (
      <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
        <div className="mx-auto max-w-md bg-white border rounded-lg p-6">
          <h1 className="text-xl font-bold mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-4">
            You must be logged in to view the shopping list.
          </p>
          <Link
            href="/week-8"
            className="block text-center rounded bg-black text-white py-2 hover:bg-slate-800"
          >
            Go to Login
          </Link>
        </div>
      </main>
    );
  }

  // Normal Week-7 states
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);
  const [selectedItemName, setSelectedItemName] = useState("");

  // Add item from NewItem form
  function handleAddItem(item: Omit<ItemType, "id">) {
    const newItem: ItemType = {
      id: crypto.randomUUID(),
      ...item,
    };
    setItems((prev) => [...prev, newItem]);
  }

  // Click item → clean name → send to MealIdeas
  function handleItemSelect(item: ItemType) {
    const cleaned = item.name
      .split(",")[0]
      .trim()
      .replace(
        /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|\u2011-\u26FF|\uD83E[\uDD00-\uDDFF])/g,
        ""
      )
      .trim()
      .toLowerCase();

    setSelectedItemName(cleaned);
  }

  return (
    <main className="min-h-screen bg-white p-6 text-black">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left side: NewItem + ItemList */}
        <div className="md:w-1/2">
          <NewItem onAddItem={handleAddItem} />
          <div className="mt-6">
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
        </div>

        {/* Right side: Meal Ideas */}
        <div className="md:w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}