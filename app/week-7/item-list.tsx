"use client";

import { useState } from "react";
import Item from "./item";

type SortBy = "name" | "category" | "group";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

type ItemListProps = {
  items: ItemType[];
  // NEW: parent gives us a function to call when an item is clicked
  onItemSelect: (item: ItemType) => void;
};

export default function ItemList({ items, onItemSelect }: ItemListProps) {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  // Always work on a COPY to avoid mutating props
  const itemsCopy = [...items];

  function buttonClass(current: SortBy) {
    return `px-3 py-2 rounded border ${
      sortBy === current ? "bg-black text-white" : "bg-white text-black"
    }`;
  }

  // ===== GROUP VIEW =====
  if (sortBy === "group") {
    // Group items by category using reduce
    const grouped: Record<string, ItemType[]> = itemsCopy.reduce((groups, item) => {
      const cat = item.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
      return groups;
    }, {} as Record<string, ItemType[]>);

    // Sort categories A-Z
    const categories = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

    // Sort items inside each category A-Z by name
    categories.forEach((cat) => {
      grouped[cat] = [...grouped[cat]].sort((a, b) => a.name.localeCompare(b.name));
    });

    return (
      <div>
        {/* Sort buttons */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setSortBy("name")} className={buttonClass("name")}>
            Sort by Name
          </button>
          <button onClick={() => setSortBy("category")} className={buttonClass("category")}>
            Sort by Category
          </button>
          <button onClick={() => setSortBy("group")} className={buttonClass("group")}>
            Group by Category
          </button>
        </div>

        {/* Grouped output */}
        {categories.map((cat) => (
          <div key={cat} className="mb-6">
            <h2 className="text-xl font-bold capitalize mb-2">{cat}</h2>
            <ul>
              {grouped[cat].map((item) => (
                <Item
                  key={item.id}
                  name={item.name}
                  quantity={item.quantity}
                  category={item.category}
                  // NEW: clicking item calls parent handler
                  onSelect={() => onItemSelect(item)}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // ===== SORT VIEW =====
  if (sortBy === "name") {
    itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    itemsCopy.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div>
      {/* Sort buttons */}
      <div className="flex gap-2 mb-4">
        <button onClick={() => setSortBy("name")} className={buttonClass("name")}>
          Sort by Name
        </button>
        <button onClick={() => setSortBy("category")} className={buttonClass("category")}>
          Sort by Category
        </button>
        <button onClick={() => setSortBy("group")} className={buttonClass("group")}>
          Group by Category
        </button>
      </div>

      {/* Items */}
      <ul>
        {itemsCopy.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
            onSelect={() => onItemSelect(item)}
          />
        ))}
      </ul>
    </div>
  );
}