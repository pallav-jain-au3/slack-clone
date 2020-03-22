const functions = require('firebase-functions');
const cors = require('cors')
const app = require('express')();
const FbAuth = require('./utils/FbAuth')
const {user, signup, login, createChannel} = require('./handlers/userHandle');
//const {createChannel} = require('./handlers/channelHandle')

app.use(cors())
app.get('/user',user)
app.post('/signin', signup)
app.post('/login', login)

app.post('/createChannel',FbAuth, createChannel)


exports.api = functions.https.onRequest(app);
