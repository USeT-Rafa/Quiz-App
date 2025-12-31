import { useEffect, useState } from "react"
import useQuizCategories from "../hooks/useQuizCategories"


const home = () => {

    const { categories, isLoading: categoriesLoading, error: categoriesError } = useQuizCategories();
    

   return (
    <div className="min-h-screen bg-gray-700 text-gray-900">
      {/* Header */}
      <header className="bg-gray-200 py-4 px-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold mx-auto">Master Quiz</h1>
        <button className="absolute right-6 bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Scores
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center gap-12 mt-16">
        <div className="flex gap-20">
          {/* Categories */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-200 px-6 py-2 rounded font-medium">
              Categories
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-32 py-2 rounded ${
                  selectedCategory === cat
                    ? "bg-gray-300"
                    : "bg-gray-400 hover:bg-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty */}
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-200 px-6 py-2 rounded font-medium">
              Difficulty
            </div>
            {difficulties.map((level) => (
              <button
                key={level}
                onClick={() => setSelectedDifficulty(level)}
                className={`w-32 py-2 rounded ${
                  selectedDifficulty === level
                    ? "bg-gray-300"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Play Button */}
        <button
          className="mt-10 bg-gray-200 px-10 py-3 rounded text-lg font-medium hover:bg-gray-300"
          disabled={!selectedCategory || !selectedDifficulty}
        >
          Play
        </button>
      </main>
    </div>
  );
}

export default home

