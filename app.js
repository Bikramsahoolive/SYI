const express = require('express');
const path = require('path');
const session = require('express-session');




const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json({ limit:"1mb" }));
app.use(express.urlencoded({extended:true,limit:'1mb'}));
app.use(express.static(path.join(__dirname,'/public')));
app.use(session({
    secret:"hi xmx",
    resave:false,
    saveUninitialized:true
}))


const{receiveData,getApplicationData,deleteData}=require('./src/controllers/requestInterviewData');
const checkSession= require('./src/middlewares/session');



app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/html/index.html');
});

app.get('/about',(req,res)=>{
    let template = `<h1 style="text-align:center;color:red;margin:50px 0">This Page is under maintenance</h1>
    <h5 style="text-align:center;color:blue;margin:50px 0;text-decoration:none;"><a href="/">Back to home</a></h5>`
    res.send(template);
});

app.get('/contact',(req,res)=>{
    let template = `<h1 style="text-align:center;color:red;margin:50px 0">This Page is under maintenance</h1>
    <h5 style="text-align:center;color:blue;margin:50px 0;text-decoration:none;"><a href="/">Back to home</a></h5>`
    res.send(template);
});

app.get('/reg',(req,res)=>{
    res.sendFile(__dirname+'/public/html/registration.html');
});

app.get('/login',(req,res)=>{
    res.sendFile(__dirname+'/public/html/login.html');
});
app.post('/login',(req,res)=>{
    let data=req.body;
    if(data.username=="syi@123" && data.password=="pass@123"){
        req.session.key = {name:"Bikram Sahoo",email:"bikramsahoo@live.in",isActive:true,sexp:Date.now()+300000};
        res.send({status:true,message:'login successfully'});

    }else{
        res.send({status:false,message:"username or password incorrect."});
    }
})
app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/');
        }
    })
})

app.get('/reg-data',checkSession,(req,res)=>{
    res.sendFile(__dirname+'/public/html/request-table.html');
});

app.post('/request-form',receiveData);
app.post('/request-data',checkSession,getApplicationData);
app.delete('/delete-application',checkSession,deleteData);


app.listen(PORT,()=>console.log(`Server is running on port: ${PORT}`));