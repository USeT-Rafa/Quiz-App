import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getRandomQuestions = async () => {
    try {
        const response = await API.get('/api/quiz/random')
        return response.data;
    } catch (error) {
        console.error('Error fetching random quiz:', error);
        throw error;
    }
}

export const getCategories = async () =>{
    try {
        const response = await API.get('/api/quiz/categories');
        console.log('API response for categories:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const getQuestions = async (category, difficulty) =>{
    try {
        const response = await API.get(`/api/quiz/questions/${category}`, { params: { difficulty } });
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}
