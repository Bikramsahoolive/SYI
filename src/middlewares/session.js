
function checkSession(req,res,next){
    let admin = req.session.key;
    if (admin==undefined){

        let template = `<h1 style="text-align:center;color:red;margin:50px 0">Login Required</h1>
        <h5 style="text-align:center;color:blue;margin:50px 0;text-decoration:none;"><a href="/login">Go to Login</a></h5>`;
        res.status(400).send(template);
       

    }else if (admin.sexp<Date.now()){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                let template = `<h1 style="text-align:center;color:red;margin:50px 0">Session Expired!</h1>
        <h5 style="text-align:center;color:blue;margin:50px 0;text-decoration:none;"><a href="/login">Go to Login</a></h5>`;
                res.status(500).send(template);
               
            }
        })
    }else{
        req.session.key = {name:"Admin",isActive:true,sexp:Date.now()+900000};
        next();
    }
   
}


module.exports=checkSession;