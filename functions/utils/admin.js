const admin = require('firebase-admin');


let serviceAccount = require('./slack-91cef-firebase-adminsdk-m5mp9-68428563a1');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore()

module.exports = {
    admin, db
}