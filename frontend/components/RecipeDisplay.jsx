const RecipeDisplay = ({ recipe }) => {
  if (!recipe || !recipe.title) {
    return <p>No recipe available.</p>;
  }

  return (
    <div className="max-w-md mx-auto bg-gray-100 p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
      <h3 className="text-lg font-semibold">Ingredients:</h3>
      <ul className="list-disc pl-5">
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h3 className="text-lg font-semibold mt-4">Steps:</h3>
      <ol className="list-decimal pl-5">
        {recipe.steps.map((step, index) => (
          <li key={index}>{step}</li>
        ))}
      </ol>
    </div>
  );
};

export default RecipeDisplay;
