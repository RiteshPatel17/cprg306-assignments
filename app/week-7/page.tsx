"use client";

import { useState } from "react";
import itemsData from "./items.json";
import NewItem from "./new-item";
import ItemList from "./item-list";
import MealIdeas from "./meal-ideas";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function Page() {
  // Items from JSON
  const [items, setItems] = useState<ItemType[]>(itemsData as ItemType[]);

  // NEW: holds the selected ingredient for the API
  const [selectedItemName, setSelectedItemName] = useState("");

  // Adds new item into items state
  function handleAddItem(item: Omit<ItemType, "id">) {
    const newItem: ItemType = {
      id: crypto.randomUUID(),
      ...item,
    };
    setItems((prev) => [...prev, newItem]);
  }

  // NEW: when user clicks an item in the list
  function handleItemSelect(item: ItemType) {
    // Clean the item name for the API:
    // 1) take the part before the comma (removes " , 1 kg")
    // 2) trim spaces
    // 3) remove emojis (basic regex)
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
    <main className="p-6 text-black bg-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>

      {/* Layout: Left = form + list, Right = meal ideas */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <NewItem onAddItem={handleAddItem} />

          <div className="mt-6">
            <ItemList items={items} onItemSelect={handleItemSelect} />
          </div>
        </div>

        <div className="md:w-1/2">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}