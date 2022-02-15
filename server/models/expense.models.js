const mongoose = require('mongoose')

const Expense = new mongoose.Schema({
    username:{type:String,required:true},
    amount:{type:Number,required:true},
    type:{type:String,required:true},
    date:{type:Date,required:true}
},
    {collection:'user-expenses'}
)

const model = mongoose.model('ExpenseData',Expense)

module.exports = model 

