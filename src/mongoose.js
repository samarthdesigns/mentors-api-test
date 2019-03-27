const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const uri = 'mongodb+srv://dscUser:dscUserMentorPassword@mentorsapp-fbjjc.mongodb.net/test?retryWrites=true'

const db = mongoose.connect(uri,{
    useNewUrlParser: true
})

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userName:{
        type: String
    },
    password:{
        type: String 
    }
})

const user = mongoose.model('User', userSchema)

const addUser = (userName, password, confirmPassword, fullName, callback) => {

    if(password === confirmPassword){
        user.count({userName: userName},(error, data)=>{

            if(data != 0){
                return callback(undefined,'Username already exits')
            }
            else{
    
                const newUser = new user ({
                    name: fullName,
                    userName: userName,
                    password: password,
                    mentors:{
                        samarth: false,
                        ayush: false,
                        samyak: false,
                        dhiraj: false
                    }
                })
    
                newUser.save().then(()=>{
                    callback('Added new user',undefined)
                    console.log('Data Sent')
                }).catch(()=>{
                    console.log('Data not sent')
                })
            }
    
        }).then(()=>{
            console.log('Fetched')
        }).catch(()=>{
            console.log('Not Fetched')
        })
    }
    else{
        return callback(undefined,'Passwords donot match')
    }

}

const listUsers = (callback) => {
    user.find({},(error, data)=>{
        callback(data)
    }).then(()=>{
        console.log('Fetched')
    }).catch(()=>{
        console.log('Not Fetched')
    })
}

const listUser = (userName ,callback) => {
    user.find({userName: userName},(error, data)=>{
        callback(data)
    }).then(()=>{
        console.log('Fetched')
    }).catch(()=>{
        console.log('Not Fetched')
    })
}

module.exports = {
    addUser : addUser,
    listUsers : listUsers,
    listUser : listUser
}