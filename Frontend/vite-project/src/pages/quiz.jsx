import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useQuizQuestion from "../hooks/useQuizQuestion";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const category = location.state?.category;
  const difficulty = location.state?.difficulty;

  const { questions, isLoading, error } = useQuizQuestion(category, difficulty);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [score, setScore] = useState(0);

  const goToNextQuestion = () => {
    setSelectedAnswer(null);
    setIsLocked(false);

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigate("/results", {
        state: {
          score,
          total: questions.length,
          category,
          difficulty,
        },
      });
    }
  };

 // AUTO-ADVANCE (2 seconds)
  useEffect(() => {
    if (!isLocked) return;

    const timer = setTimeout(() => {
      goToNextQuestion();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLocked]);


  // ✅ NOW conditional rendering
  if (!category || !difficulty) {
    return <p className="text-white">Missing quiz data</p>;
  }

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!questions.length) return <p className="text-white">No questions found</p>;

  const currentQuestion = questions[currentIndex];

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center px-4 gap-6">
      <div className="text-white text-lg font-semibold">
        Question {currentIndex + 1} / {questions.length}
      </div>

      <div className="w-full max-w-xl bg-gray-700 rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <div className="bg-gray-200 text-gray-900 rounded-lg p-6 text-lg font-medium text-center">
          {currentQuestion.question}
        </div>

        <div className="flex flex-col gap-4">
          {currentQuestion.options.map((option) => {
            let style = "bg-gray-300 hover:bg-gray-400";

            if (isLocked) {
              if (option === currentQuestion.answer) {
                style = "bg-green-500 text-white";
              } else if (option === selectedAnswer) {
                style = "bg-red-500 text-white";
              }
            }

            return (
              <button
                key={option}
                onClick={() => {
                  if (!isLocked) {
                    setSelectedAnswer(option);
                    setIsLocked(true);
                    if (option === currentQuestion.answer) {
                      setScore((s) => s + 1);
                    }
                  }
                }}
                className={`py-3 rounded font-medium transition ${style}`}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
