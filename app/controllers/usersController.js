const express = require('express')
const router = express.Router()
const _ = require('lodash')

const {User} = require('../model/user')
const { authenticationUser } = require('../middlewares/authentication')

// localhost:3000/users/register
router.post('/register', function(req, res){
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => res.send(_.pick(user, ['_id', 'username', 'email'])))
        .catch(err => res.send(err))
})



//localhost:3000/user/login

router.post('/login', function(req, res){

    const body = req.body
    User.findByCredentials(body.email || body.mobile, body.password)
        .then(user => user.generateToken())
            // here we will send back the empty object and sending token into the header
            // .then(token => res.setHeader('x-auth', token).send({}))
            .then(token => res.setHeader('x-auth', token).send({}))
            .catch(err => res.json(err))


    // finding the user by email id 
    // User.findOne({email : body.email})
    //     // .then(user => user ? res.json(user) : res.status('404').send())
    //     .then(user => {
    //             if(!user){
    //                 res.status('404').send('invaalid email or password')
    //             }
    //             // first pass the plain and after that passing the encrypted
    //             bcryptjs.compare(body.password, user.password)
    //                 .then(result => result ? res.json(user) : res.status('404').send('invalid email or password'))
    //                 .catch(err => res.json(err))
    //         }
    //     )
    //     .catch(err => res.json(err))
})


// localhost:3000/user/account

router.get('/account',authenticationUser, function(req, res){
    const {user} = req
    // we can't passing the object dirctly from the middleware so we passing through the request
    res.send(user)
    // // checking for the token passed in the header or not
    // const token = req.header('x-auth')

    //     // own static method
    //     User.findByToken(token)
    //         .then(user => res.send(user))
    //         .catch(err => res.status('401').send(err))

})


//localhost:3000/user/logout
router.delete('/logout', authenticationUser, function(req, res){
    const {user , token} = req
    // here pull used to remove the propety from the databse on the condition
    User.findByIdAndUpdate(user._id, {$pull : {tokens : {token : token}}})
        .then(() => res.send({'notice' : 'user successfully logout'}))
        .catch(err => res.send(err))
})



module.exports = {
    userRouter : router
}