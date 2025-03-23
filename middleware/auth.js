const jwt = require('jsonwebtoken')

// if user logged in then give access to modify 
function auth(req,res,next) {
    const token = req.header('x-auth-token') // for authorization
    
    if(!token) return res.status(401).send("Access denied. No token provided.")
    
    try{
        const decoded = jwt.verify(token, process.env.shop_jwtPrivateKey)
        req.user = decoded
        next()
    }
    catch(err){
        res.status(400).send('Invalid token.')
    }
}

module.exports = auth