import { useState, useEffect } from "react";
import { getRandom } from "../api/quizAPI";

export const useQuizRandom = () => {
    const [randomQuestions, setRandomQuestions] = useState([]);
    const [isLoading, setisLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchRandomQuestions = async () =>{
            setisLoading(true);
            try {
                const data = await getRandom();
                setRandomQuestions(data);
            } catch (error) {
                setError(error);
            }
            finally{
                setisLoading(false);
            }
        };

        fetchRandomQuestions();
    },[]);

    return { randomQuestions, isLoading, error };
}

export default useQuizRandom;