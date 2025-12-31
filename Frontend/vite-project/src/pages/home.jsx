import { useState } from "react"
import useQuizCategories from "../hooks/useQuizCategories"


const Home = () => {

    const { categories, isLoading, error } = useQuizCategories();
    const difficulties = ["Easy", "Medium", "Hard"];

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

  return (
    <div className="min-h-screen bg-gray-700 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-200 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Master Quiz</h1>
        <button className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Scores
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center gap-12 mt-16 px-4">
        {isLoading && <p>Loading categories...</p>}
        {error && <p className="text-red-500">Failed to load categories</p>}

        {!isLoading && !error && categories?.length > 0 && (
          <div className="flex flex-col md:flex-row gap-12">
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
                      : "bg-gray-400 hover:bg-gray-300"
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Play Button */}
        <button
          /*onClick={handlePlay}*/
          className="mt-10 bg-gray-200 px-10 py-3 rounded text-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          /*disabled={!selectedCategory || !selectedDifficulty}*/
        >
          Play
        </button>
      </main>
    </div>
  );
};

export default Home

