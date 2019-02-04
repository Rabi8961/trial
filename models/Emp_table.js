var mongoose = require("mongoose");




var EmpSchema = new mongoose.Schema({
    name:String,
    salary:Number,
    age : Number,
    updated_at: {type:Date, default: Date.now},
});

module.exports = mongoose.model("emp", EmpSchema);



