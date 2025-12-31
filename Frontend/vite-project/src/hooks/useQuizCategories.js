import { useEffect, useState } from "react";
import { getCategories } from "../api/quizAPI";

export const useQuizCategories = () =>{

    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect ( () => {
        const fetchCategories = async () =>{
            setIsLoading(true);
            try {
                const data = await getCategories();
                setCategories(data.categories);
            } catch (error) {
                setError(error.message || "Failed to load categories");
            } finally{
                setIsLoading(false);    
            }
        };

        fetchCategories();

    },[]);

    return { categories, isLoading, error };

}

export default useQuizCategories;
