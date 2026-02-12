"use client";

import { useState } from "react";
import Item from "./item";
import itemsData from "./items.json";

type SortBy = "name" | "category" | "group";

type ItemType = {
  id: string;
  name: string;
  quantity: number;
  category: string;
};

export default function ItemList() {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  // Make a copy so we don’t change the original JSON data
  const items: ItemType[] = [...(itemsData as ItemType[])];

  // Helper: button style (active button = black)
  function buttonClass(current: SortBy) {
    return `px-3 py-2 rounded border ${
      sortBy === current ? "bg-black text-white" : "bg-white text-black"
    }`;
  }

  // ===== GROUP BY CATEGORY VIEW =====
  if (sortBy === "group") {
    // 1) group items by category
    const grouped: Record<string, ItemType[]> = items.reduce((groups, item) => {
      const cat = item.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
      return groups;
    }, {} as Record<string, ItemType[]>);

    // 2) sort categories A-Z
    const categories = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

    // 3) sort items inside each category A-Z by name
    categories.forEach((cat) => {
      grouped[cat].sort((a, b) => a.name.localeCompare(b.name));
    });

    return (
      <div>
        {/* Buttons */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setSortBy("name")} className={buttonClass("name")}>
            Sort by Name
          </button>

          <button
            onClick={() => setSortBy("category")}
            className={buttonClass("category")}
          >
            Sort by Category
          </button>

          <button onClick={() => setSortBy("group")} className={buttonClass("group")}>
            Group by Category
          </button>
        </div>

        {/* Grouped output */}
        <div className="space-y-6">
          {categories.map((cat) => (
            <div key={cat}>
              <h2 className="text-xl font-bold capitalize mb-2">{cat}</h2>

              <ul className="space-y-2">
                {grouped[cat].map((item) => (
                  <Item
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    category={item.category}
                  />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ===== NORMAL SORT VIEW (NAME or CATEGORY) =====
  if (sortBy === "name") {
    items.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    items.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div>
      {/* Buttons */}
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

      {/* Items list */}
      <ul className="space-y-2">
        {items.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}
