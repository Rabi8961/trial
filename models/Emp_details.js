var mongoose = require("mongoose");

module.exports = mongoose.model("emp_details", {
    age : Number,
    position : String,
    city : String,
    updated_at: {type:Date, default: Date.now},
},'emp_details');