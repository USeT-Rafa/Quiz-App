import { useEffect, useState } from "react";
import{ getQuestions } from "../api/quizAPI";

export const useQuizQuestion = (category, difficulty) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect ( () => {
        if (!category) return;
        if(!difficulty) return;
        const fetchQuestions = async () =>{
            setIsLoading(true);
            try {
                const data = await getQuestions(category, difficulty);
                setQuestions(data.questions);
            } catch (error) {
                setError(error.message || "Failed to load questions");
            } finally{
                setIsLoading(false);

            }
        };

        fetchQuestions();
    },[category, difficulty]);

    return { questions, isLoading, error };
}

export default useQuizQuestion;