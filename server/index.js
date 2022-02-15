const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.models')
const Expense = require('./models/expense.models')
const Expenses = require('./models/expenses.models')
const jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json())

//mongoose.connect('mongodb://localhost:27017/expense-tracker')

//const DB = 'mongodb+srv://expensetracker:expense@cluster0.thuya.mongodb.net/expensetracker?retryWrites=true&w=majority'
const DB = 'mongodb+srv://expensetracker:tracker@cluster0.thuya.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(DB,{useNewUrlParser: true,
    useUnifiedTopology: true }).then(()=>{
    console.log('connection succesfull!')
}).catch((err)=>console.log('no connection',err))

app.get('/hello',(req,res)=>{
    res.send('hello world')
})

app.post('/api/register',async (req,res)=>{
    try{
        await User.create({  
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        })
        res.json({status:'ok'})
    }
    catch(err){
        res.json({status:'error',error:'Duplicate username or email'})
    }
    
})

app.post('/api/login',async (req,res)=>{
    
    const user = await User.findOne({
            username:req.body.username,
            password:req.body.password
        })
    if(user){
        const token = jwt.sign({
            username:user.username,
            email:user.email
        },'secret123')
        return res.json({status:'ok',user:token})
    }
    else{
        return res.json({status:'error',user:false})
    }
})

//app post this end point will add expenses to the database
//app get this end point will get data based on the inputs - we can send the inputs in the body

app.post('/api/expense',async (req,res)=>{
    try{
        await Expenses.create({ 
            username:req.body.author,
            amount:req.body.amount,
            type:req.body.type,
            date:req.body.date
        })
        res.json({status:'ok'})
    }
    catch(err){
        console.log(err)
        res.json({status:'error',error:'We are facing some network issues!'})
    }

})

app.get('/api/expense',async (req,res)=>{
    //console.log(req.body)
    Expenses.find({"username":"a"}).then(function (expenses) {
        res.send(expenses);
        //console.log(expenses)
    });

})

app.get('/api/allexpense',async (req,res)=>{
    //console.log(req.body)
    Expenses.find().then(function (expenses) {
        res.send(expenses);
        console.log(expenses)
    });

})


app.listen(1337,()=>{
    console.log("Server started on 1337 ! ")
})