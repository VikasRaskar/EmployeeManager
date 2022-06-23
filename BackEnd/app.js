const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = 4000;

const app = express();
app.use(bodyParser.json());
app.use(cors());
//Import Routes
const EmployeeRoutes = require('./routes/employee');
//Middleware
app.use('/employee', EmployeeRoutes)
//Routing to Check  
app.get ('/', (req, res)=>{
    res.send('Welcome to Node Js');
})

//db connection
mongoose.connect('mongodb+srv://user_2:user2@mycluster.ahvqx.mongodb.net/?retryWrites=true&w=majority', ()=>{
    console.log('Database Connection Successfully')
})

// Start The listening the SERVER
app.listen(PORT, ()=> console.log(`Server is listening at Port ${PORT}`))