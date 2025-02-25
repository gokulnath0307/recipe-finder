"use client";

import BMIForm from "@/components/BMIForm";
import RecipeDisplay from "@/components/RecipeDisplay";
import React, { useState } from "react";
import axios from "axios";
export default function page() {
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRecipeGeneration = async (formData) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      setRecipe(response.data.recipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
      setRecipe(null);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        {" "}
        <BMIForm onRecipeGenerated={handleRecipeGeneration} />
      </div>
      <div> {<RecipeDisplay recipe={recipe} />}</div>
    </div>
  );
}
