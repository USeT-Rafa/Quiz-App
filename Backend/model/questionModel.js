import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    category : {type: String, required : true, trim:true},//trim to remove extra spaces
    question : {type: String, required : true, trim:true},
    options : {type : [String], required : true},
    difficulty : {type : String, required : true, trim:true},
    answer : {type: String, required : true, trim:true}
})

const Question = mongoose.model("questions", questionSchema);

export default Question;