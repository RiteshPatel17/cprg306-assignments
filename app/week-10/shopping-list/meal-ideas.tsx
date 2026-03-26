"use client";

import { useEffect, useState } from "react";

// Type for meals returned by the API
type Meal = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

// This function fetches meals that use a specific ingredient.
// It is OUTSIDE the component so it can be reused and kept clean.
async function fetchMealIdeas(ingredient: string): Promise<Meal[]> {
  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`;
  const response = await fetch(url);
  const data = await response.json();

  // API returns: { meals: [...] } or { meals: null }
  return data.meals ? data.meals : [];
}

export default function MealIdeas({ ingredient }: { ingredient: string }) {
  const [meals, setMeals] = useState<Meal[]>([]);

  // Loads meals and stores them in state
  async function loadMealIdeas() {
    // If ingredient is empty, clear meals
    if (!ingredient) {
      setMeals([]);
      return;
    }

    const result = await fetchMealIdeas(ingredient);
    setMeals(result);
  }

  // Run loadMealIdeas whenever ingredient changes
  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="border rounded p-4 bg-white text-black">
      <h2 className="text-xl font-bold mb-2">Meal Ideas</h2>

      {!ingredient && (
        <p className="text-gray-600">Click an item to see meal ideas.</p>
      )}

      {ingredient && (
        <p className="mb-3">
          Using ingredient: <span className="font-semibold">{ingredient}</span>
        </p>
      )}

      <ul className="space-y-2">
        {meals.map((meal) => (
          <li key={meal.idMeal} className="border rounded p-2">
            {meal.strMeal}
          </li>
        ))}
      </ul>

      {ingredient && meals.length === 0 && (
        <p className="text-gray-600 mt-3">No meals found.</p>
      )}
    </div>
  );
}