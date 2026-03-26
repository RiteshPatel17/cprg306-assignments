"use client";

import { useState } from "react";

type NewItemProps = {
  onAddItem: (item: { name: string; quantity: number; category: string }) => void;
};

export default function NewItem({ onAddItem }: NewItemProps) {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState("produce");

  const [nameTouched, setNameTouched] = useState(false);

  const nameIsValid = name.trim().length >= 2;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!nameIsValid) {
      setNameTouched(true);
      return;
    }

    const item = {
      name: name.trim(),
      quantity: quantity,
      category: category,
    };

    onAddItem(item);

    setName("");
    setQuantity(1);
    setCategory("produce");
    setNameTouched(false);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm border rounded p-4 space-y-4 bg-white text-black"
    >
      {/* NAME */}
      <div>
        <label className="block font-semibold mb-1">Item Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setNameTouched(true)}
          onFocus={() => setNameTouched(false)}
          required
          className={`w-full border rounded p-2 ${
            !nameIsValid && nameTouched ? "border-red-500" : "border-gray-300"
          }`}
        />

        {!nameIsValid && nameTouched && (
          <p className="text-red-500 text-sm mt-1">
            Name must be at least 2 characters.
          </p>
        )}
      </div>

      {/* QUANTITY */}
      <div>
        <label className="block font-semibold mb-1">Quantity</label>
        <input
          type="number"
          min="1"
          max="99"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          required
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
        >
          <option value="produce">Produce</option>
          <option value="dairy">Dairy</option>
          <option value="bakery">Bakery</option>
          <option value="meat">Meat</option>
          <option value="frozen foods">Frozen Foods</option>
          <option value="canned goods">Canned Goods</option>
          <option value="dry goods">Dry Goods</option>
          <option value="beverages">Beverages</option>
          <option value="snacks">Snacks</option>
          <option value="household">Household</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={!nameIsValid}
        className="w-full bg-blue-600 text-white rounded p-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Add Item
      </button>
    </form>
  );
}