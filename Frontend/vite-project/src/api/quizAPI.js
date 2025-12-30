import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

export const getRandom = async () => {
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
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error;
    }
}

export const getQuestions = async (category) =>{
    try {
        const response = await API.get(`/api/quiz/questions/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}
