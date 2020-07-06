import * as admin from 'firebase-admin';

const serviceAccount = require('../firebase-admin-key');
const firebaseApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://asis-c6b4f.firebaseio.com"
});


export default firebaseApp;