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
};

export default function ItemList({ items }: ItemListProps) {
  const [sortBy, setSortBy] = useState<SortBy>("name");

  const itemsCopy = [...items];

  function buttonClass(current: SortBy) {
    return `px-3 py-2 rounded border ${
      sortBy === current ? "bg-black text-white" : "bg-white text-black"
    }`;
  }

  // GROUP VIEW
  if (sortBy === "group") {
    const grouped: Record<string, ItemType[]> = itemsCopy.reduce((groups, item) => {
      const cat = item.category;
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
      return groups;
    }, {} as Record<string, ItemType[]>);

    const categories = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

    categories.forEach((cat) => {
      grouped[cat] = [...grouped[cat]].sort((a, b) => a.name.localeCompare(b.name));
    });

    return (
      <div>
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
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // SORT VIEW
  if (sortBy === "name") {
    itemsCopy.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    itemsCopy.sort((a, b) => a.category.localeCompare(b.category));
  }

  return (
    <div>
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

      <ul>
        {itemsCopy.map((item) => (
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