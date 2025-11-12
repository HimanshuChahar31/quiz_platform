import mongoose from "mongoose";

const performanceEnum = ["Excellent","Good","Average","Needs Work"];
const ResultSchema  = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    title:{
        type: String,
        required: true,
        trim: true
    },
    technology:{
        type: String,
        required: true,
        trim:true,
        enum:[
            "html",
            "css",
            "js",
            "react",
            "node",
            "mongodb",
            "java",
            "python",
            "cpp",
            "bootstap"

        ]
    },
    level:{
        type: String,
        required: true,
        enum: ["basic","intermediate","advanced"]

    },
    totalQuestion:{
        type: Number,
        requied: true,
        min:0
    },
    correct:{
        type: Number,
        required: true,
        min: 0,
        default: 0
    },
    wrong:{
        type: Number,
        required: true,
        min:0,
        default:0
    },
    score:{
        type:Number,
        required: true,
        min:0,
        max:100,
        default:0
    },
    performance:{
        type:String,
        enum:performanceEnum,
        default:"Needs Work"
    },
},{
    timestamps:true
});

// compute score and performance 
ResultSchema.pre('save',function(next){
    const total = Number(this.totalQuestion)|| 0;
    const correc  = Number(this.correct) || 0;
    this.score  =total ? Math.round((correct/total)*100) : 0;
    if(this.score>=80){
        this.performance = "Excellent";
    }
    else if(this.score>=65){
        this.performance = "Good";
    }
    else if(this.score>=45){
        this.performance = "Average";
    }
    else{
        this.performance = "Need Work";
    }

    if((this.wrong===undefined || this.wrong===null) && total){
        this.wrong = Math.max(0,total-correct);


    }
    next();

});

const Result = mongoose.model.Result || mongoose.model("Result",ResultSchema);
export default Result;