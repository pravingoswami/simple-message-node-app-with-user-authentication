const {User} = require('../model/user')


// for middlewere we have three perameters
const authenticationUser = function(req, res, next) {
    // checking for the token passed in the header or not
    const token = req.header('x-auth')

        // own static method
        User.findByToken(token)
            .then(user => {
              if(user){
                    // creating new object property
                // The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
                req.user = user,
                req.token = token
                next()
              } else {
                  res.status('401').send({notice : 'token not available'})
              }
            })
            .catch(err => res.status('401').send(err))
}

module.exports = {
    authenticationUser
}