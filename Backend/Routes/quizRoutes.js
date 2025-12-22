import express from 'express';
import { getCategories, getQuestions, getResults, getRandomQuestions } from '../Controllers/quizController.js';

const router = express.Router();

router.get('/categories', getCategories);
router.get('/questions', getQuestions);
router.post('/results', getResults);
router.get('/random',getRandomQuestions);