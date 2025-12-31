import { useState, useEffect } from "react";
import { getRandomQuestions } from "../api/quizAPI";

export const useQuizRandom = () => {
    const [randomQuestions, setRandomQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchRandomQuestions = async () =>{
            setIsLoading(true);
            try {
                const data = await getRandomQuestions();
                setRandomQuestions(data.questions);
            } catch (error) {
                setError(error.message || "Failed to load questions");
            }
            finally{
                setIsLoading(false);
            }
        };

        fetchRandomQuestions();
    },[]);

    return { randomQuestions, isLoading, error };
}

export default useQuizRandom;