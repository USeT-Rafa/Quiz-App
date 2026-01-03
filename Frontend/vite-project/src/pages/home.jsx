import { useState } from "react"
import useQuizCategories from "../hooks/useQuizCategories"
import { useNavigate } from "react-router-dom";



const Home = () => {
    const navigate = useNavigate();
    
    const { categories, isLoading, error } = useQuizCategories();
    const difficulties = ["Easy", "Medium", "Hard"];

    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isDifficultyOpen, setIsDifficultyOpen] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDifficulty, setSelectedDifficulty] = useState(null);

    const handlePlay = () => {
      if (!selectedCategory || !selectedDifficulty) return;

      navigate("/quiz", {
        state: {
          category: selectedCategory,
          difficulty: selectedDifficulty
        }
      });
    };

  return (
    <div className="min-h-screen bg-gray-700 text-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-200 py-4 px-6 relative flex items-center">
        <h1 className="absolute left-1/2 -translate-x-1/2 text-2xl font-semibold">Master Quiz</h1>
        <button className="ml-auto bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
          Scores
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center gap-12 mt-16 px-4">
        {isLoading && <p>Loading categories...</p>}
        {error && <p className="text-red-500">Failed to load categories</p>}

        {!isLoading && !error && categories?.length > 0 && (
          <div className="flex flex-row items-start gap-12">
            <div className="bg-gray-200 px-6 py-2 rounded font-medium">
              {/* Main button */}
              <button
                onClick={() => setIsCategoryOpen(prev => !prev)}
                className="w-48 flex items-center justify-between bg-gray-200 px-6 py-3 rounded font-medium"
              >
                Categories
                <span
                  className={`transition-transform duration-200 ${
                    isCategoryOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {/* Dropdown */}
              {isCategoryOpen && (
                <div className="flex flex-col gap-2 mt-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedCategory(cat);
                        setIsCategoryOpen(false); // close after select
                      }}
                      className={`w-48 py-2 rounded ${
                        selectedCategory === cat
                          ? "bg-gray-300"
                          : "bg-gray-400 hover:bg-gray-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Difficulty */}
            <div className="flex flex-row items-start gap-12">
              <div className="bg-gray-200 px-6 py-2 rounded font-medium">
                <button
                  onClick={() => setIsDifficultyOpen(prev => !prev)}
                  className="w-48 flex items-center justify-between bg-gray-200 px-6 py-3 rounded font-medium"
                >
                  Difficulty
                  <span
                    className={`transition-transform duration-200 ${
                      isDifficultyOpen ? "rotate-180" : ""
                    }`}
                  >
                  ▼
                  </span>
                </button>

                {/* Dropdown */}
                {isDifficultyOpen && (
                <div className="flex flex-col gap-2 mt-2">
                  {difficulties.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedDifficulty(cat);
                        setIsDifficultyOpen(false); // close after select
                      }}
                      className={`w-48 py-2 rounded ${
                        selectedDifficulty === cat
                          ? "bg-gray-300"
                          : "bg-gray-400 hover:bg-gray-300"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
              </div>
            </div>
          </div>
        )}

        {/* Play Button */}
        <button
          onClick={handlePlay}
          disabled={!selectedCategory || !selectedDifficulty}
          className="mt-10 bg-gray-200 px-10 py-3 rounded text-lg font-medium hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Play
        </button>
      </main>
    </div>
  );
};

export default Home

