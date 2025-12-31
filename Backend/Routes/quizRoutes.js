import express from 'express';
import { getCategories, getQuestions,addQuestions, getRandomQuestions, addQuestion} from '../Controllers/quizController.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/questions/:category', getQuestions);
router.get('/random',getRandomQuestions);

// Route to add a question
router.post('/questions', addQuestion);
router.post('/questions/bulk', addQuestions);

export default router;