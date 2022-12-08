const expressJwt = require('express-jwt')

function authJwt(){
    const secret = process.env.SECRET
    const api = process.env.API_URL
    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/product(.*)/, method: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/order(.*)/, method: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/order(.*)/, method: ['POST', 'OPTIONS']},
            `${api}/user/login`,
            `${api}/user/register`
        ]
    })
}

async function isRevoked(req, payload, done){
    if(!payload.isAdmin){
        done(null, true)
    }else{
        done()
    }
}

module.exports = authJwt