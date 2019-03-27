const express = require('express')
const chalk = require('chalk')
const bodyParser = require('body-parser')

const mongoose = require('./mongoose.js')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
}))

app.get('/users',(req,res) => {
    mongoose.listUsers((data)=>{
        res.send(data)
    });
})

app.get('/user/:userName',(req,res) => {
    mongoose.listUser(req.params.userName,(data)=>{
        res.send(data)
    });
})

app.post('/addUser',(req,res)=>{
    let dataSend = {
        userName: req.body.userName,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        fullName: req.body.fullName
    }

    if(req.body){
        mongoose.addUser(dataSend.userName, dataSend.password, dataSend.confirmPassword, dataSend.fullName, (response, error)=>{
            if(error){
                res.send('Could not add user because: '+ error)
            }
            else{
                res.send('User added')
            }
        })
    }
})

// app.get('/user/:id', (req,res) => {
//     res.status(200).send('User Details for ' + req.params.id)
// })

const portStored = process.env.PORT || 3000

const listener = app.listen(portStored, function() {
    console.log('Your app is listening on port ' + listener.address().port);
});