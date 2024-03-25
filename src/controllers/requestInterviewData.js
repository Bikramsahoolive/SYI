const {firebase} =require('../model/daatabase');
const {getFirestore,collection,addDoc,getDocs,deleteDoc,doc } = require('firebase/firestore');
const db = getFirestore(firebase);

async function receiveData(req,res){
    let data = req.body;
  // console.log(data);
  try {
    const docRef = await addDoc(collection(db,"applicants"), data);
    //   console.log("Document written with ID: ", docRef.id);
      res.send({message:"Request Submitted.",status:true,id:docRef.id});
    
  } catch (error) {
    console.log(error);
  }

    
}

async function getApplicationData(req,res){

try {
  const querySnapshot = await getDocs(collection(db, "applicants"));
  const data = [];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
          let document = doc.data();
          document.id = doc.id;
          data.push(document);
          // console.table(data);
  });
          res.send(data);
} catch (error) {
  console.log(error);
}


}


async function deleteData(req,res){
  let id = req.body.id;
  await deleteDoc(doc(db, "applicants", id));
  res.send({status:true,message:"Deleted Successfully"});

}


module.exports={
    receiveData,
    getApplicationData,
    deleteData
}