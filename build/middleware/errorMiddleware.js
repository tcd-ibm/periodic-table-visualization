// middleware is a function that is execute during the request response cycle

/**
 * @description Customerized Error handler that override the default error handler in ExpressJS
 * @author Nuoxi Zhang 
 * @nuoxiz
 * @param {*} err passed into override default Express error handler
 * @param {*} req user HTTPS request
 * @param {*} res response
 * @param {*} next Middlewar - pass in if we want to call any other middleware
 */
const errorHandler = (err, req, res, next) =>{
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode)
    // return the error stack if is not in the "production" mode which is defined in build.js
    res.json(
        {
            message : err.message,
            stack : process.env.NODE_ENV ==='production' ?null: err.stack
        }
    )
}


module.exports = {
    errorHandler
}