"use client";

import { useState } from "react";
import NewItem from "./new-item";
import ItemList from "./item-list";
import itemsData from "./items.json";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  function handleAddItem(item: Omit<ItemType, "id">) {
    const newItem: ItemType = {
      id: crypto.randomUUID(),
      ...item,
    };

    setItems((prev) => [...prev, newItem]);
  }

return (
  <main className="p-6 text-black bg-white min-h-screen">
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>

      <NewItem onAddItem={handleAddItem} />

      <div className="mt-6">
        <ItemList items={items} />
      </div>
    </div>
  </main>
);
}