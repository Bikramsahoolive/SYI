
function checkSession(req,res,next){
    let admin = req.session.key;
    if (admin==undefined){
        res.status(400).send({ isActive:false , message:"Login Required" });
    }else if (admin.sexp<Date.now()){
        req.session.destroy((err)=>{
            if(err){
                console.log(err);
            }else{
                res.status(500).send({isActive:false,message:"session expired."});
            }
        })
    }else{
        req.session.key = {name:"Admin",isActive:true,sexp:Date.now()+900000};
        next();
    }
   
}


module.exports=checkSession;