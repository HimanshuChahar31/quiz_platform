import mongoose from "mongoose";

export const connection = async ()=>{
    await mongoose.connect('mongodb+srv://himanshuchahar31082005_db_user:quiz-platform@cluster0.oig1rbc.mongodb.net/quiz-platform')
    .then(()=>{
        console.log('DB connected')
    })
}