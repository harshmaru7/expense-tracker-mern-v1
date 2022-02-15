const mongoose = require('mongoose')

const Expenses = new mongoose.Schema({
    username:{type:String,required:true},
    amount:{type:Number,required:true},
    type:{type:String,required:true},
    date:{type:String,required:true}
},
    {collection:'user-expense'}
)

const model = mongoose.model('ExpensesData',Expenses)

module.exports = model 

