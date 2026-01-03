import Question from "../model/questionModel.js";

export const getCategories =async (req, res) => {
    try {
        const categories = await Question.distinct("category");
        res.status(200).json({categories});

    } catch (error) {
        res.status(500).json({message:"Error in getting categories", error: error.message});
    }
};

export const getQuestions = async (req, res) => {
    try {
        const { category, difficulty } = req.query;
        const limit = parseInt(process.env.LIMIT_QUESTIONS) || 10;

        if(!category){
            return res.status(400).json({ message: "Category is required" });
        }
        const match = {category};

        if(difficulty){
            match.difficulty = difficulty;
        }

        const questions = await Question.aggregate([
            {$match : match},
            {$sample : {size : limit}}
        ]);
        
        if(!questions.length){
            return res.status(404).json({message:"Questions not found for the given category"});
        };

        res.status(200).json({questions});
        console.log("LImit:", limit);   
    } catch (error) {
        res.status(500).json({message:"Error in getting questions", error: error.message});
    }
};


export const getRandomQuestions =async (req, res) => {
    try {
        const limit = parseInt(process.env.LIMIT_QUESTIONS) || 10;
        const randomCategories = await Question.aggregate([
            {$group : {_id : "$category"}},
            {$sample : {size : limit}}
        ]);

        if(!randomCategories.length){
            return res.status(404).json({message:"No categories found"});
        }

        const randomQuestions = await Promise.all(
            randomCategories.map(cat => Question.aggregate([
                {$match : {category : cat._id}},
                {$sample : {size : 1}}
            ]))
        );

        const questions = randomQuestions.flat();
        res.status(200).json({questions});

    } catch (error) {
        res.status(500).json({message:"Error in getting random questions", error: error.message});
    }
};


export const addQuestion = async (req, res) => {
    try {
        const {category, question, options, answer, difficulty} = req.body;//
        const newQuestion = new Question({
            category,
            question,
            options,
            answer,
            difficulty
        });

        await newQuestion.save();
        res.status(201).json({message: "Question added successfully"});

    } catch (error) {
        res.status(500).json({message: "Failed to add question", error: error.message});
    }
};

export const addQuestions = async (req, res) => {
  try {
    const questions = req.body;

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({ message: "Invalid input data" });
    }

    // Optional: basic validation per question
    for (const q of questions) {
      if (
        !q.category ||
        !q.difficulty ||
        !q.question ||
        !Array.isArray(q.options) ||
        !q.answer
      ) {
        return res.status(400).json({
          message: "Each question must have category, difficulty, question, options, and answer"
        });
      }
    }

    await Question.insertMany(questions);

    res.status(201).json({
      message: "Questions added successfully",
      count: questions.length
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add questions",
      error: error.message
    });
  }
};
