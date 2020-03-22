const {db} = require('../utils/admin')
const firebase = require('firebase')
const config = require('../utils/config')

 firebase.initializeApp(config)

exports.user = (req, res) => {
  db.doc(`/user/${req.user}`)
  .get()
  .then(doc => {
      if(!doc.exists){
        return res.status(400).json({error : "Not found"})
      }
      else{
          
      }
  })

}

exports.signup = (req, res) => {

    let newUser = {
        username : req.body.username,
        email : req.body.email,
        password: req.body.password,
        confirmPassword : req.body.confirmPassword
    }
    let token, userId;

    db.doc(`/user/${newUser.email}`).get()
    .then(doc => {
        if (doc.exists){
            return res.status(400).json({error: "Email already exist"})
        }
        else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
        }})
        .then(data => {
            userId = data.user.uid
           return  data.user.getIdToken()})
        .then(tokenId => {
            token = tokenId
            const userCredentials = {
                username : newUser.username,
                email: newUser.email,
                userImage : null,
                channels : [],
                createdAt : new Date().toISOString(),
                userId
            }
            return db.doc(`/user/${newUser.email}`).set(userCredentials)})
        .then(() => {
            return res.status(201).json({token : token})})
        .catch(err => res.status(400).json({error : err}))

}

exports.login = (req, res) => {
  let user = {
      email : req.body.email,
      password : req.body.password
  }
   firebase.auth().signInWithEmailAndPassword(user.email, user.password) 
   .then(data => data.user.getIdToken())
   .then(token => res.status(200).json({token}))
   .catch(err => {
       console.log(err)
       return res.status(500).json({error : err})
   })


}

exports.message = (req, res) => {
    let newMessage = {
    message : req.body.message,
    createdAt: new Date().toISOString()
    }
    database.ref('channel/111111').set(newMessage)
    .then(data => res.status(200).json({data}))
    .catch(err => {console.log(err)
        return res.status(400).json({error : err})
    })
}

exports.createChannel = (req, res) => {
  let newChannel = {
    name : req.body.name,
    createdAt : new Date().toISOString(),
    members : [req.user.uid],
    creator : req.user.uid,
    messages : []
  }


   db.collection('channels').doc(`${newChannel.name}`).get()
   .then((doc) => {
    if (doc.exists){
      return res.status(400).json({error : "Channel Name already exists"})
    }
    else {
      return db.collection(`/channels/${newChannel.name}`).add(newChannel)
    }

  })
   .then(res => {
    console.log(res)
    return res.status(200).json({"status": "success"})
   })
   .catch(err => {
    console.log(err)
    res.status(400).json({error : err})
   })
  
}

var database = firebase.database()


