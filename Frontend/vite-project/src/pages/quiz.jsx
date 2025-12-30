import { useEffect, useState } from "react"
import {useParams} from "react-router-dom"
import useQuizCategories from "../hooks/useQuizCategories"
import useQuizQuestion from "../hooks/useQuizQuestion"
import useQuizRandom from "../hooks/useQuizRandom"

const quiz = () => {
    const { category } = useParams();

    const { categories, isLoading: categoriesLoading, error: categoriesError } = useQuizCategories();
    const { randomQuestions, isLoading : randomLoading, error: randomError } = useQuizRandom();
    const { questions , isLoading: questionsLoading, error: questionsError } = useQuizQuestion(category);

    useEffect(()=>{
        const
    })









  return (
    <div>
      
    </div>
  )
}

export default quiz
