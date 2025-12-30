import { useEffect, useState } from "react";
import{ getQuestions } from "../api/quizAPI";

export const useQuizQuestion = (category) => {
    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect ( () => {
        if (!category) return;
        const fetchQuestions = async () =>{
            setIsLoading(true);
            try {
                const data = await getQuestions(category);
                setQuestions(data);
            } catch (error) {
                setError(error);
            } finally{
                setIsLoading(false);
            }
        };

        fetchQuestions();
    },[category]);

    return { questions, isLoading, error };
}

export default useQuizQuestion;