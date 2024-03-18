// Import the functions you need from the SDKs you need
const { initializeApp } = require('firebase/app');
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.apiKey,
  authDomain:process.env.authDomain,
  projectId:process.env.projectId,
  storageBucket:process.env.storageBucket,
  messagingSenderId:process.env.messagingSenderId,
  appId: process.env.appId
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

module.exports={firebase};



//mongoDB


// const { MongoClient } = require('mongodb');

// const uri = "mongodb://127.0.0.1:27017";
// const client = new MongoClient(uri);


//    client.connect()
//    .then(()=>{
//     // console.log("MongoDB Connected")
//    })
//    .catch((err)=>console.log(err));


//     const db = client.db('interview');

//     module.exports={db,firebase};