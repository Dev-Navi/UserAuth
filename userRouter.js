
const router=require("express").Router();

const User=require('./userModel');
const bcrypt=require("bcryptjs")
const jwt=require('jsonwebtoken')
const token=require('./token')
const sendMail=require('./utils/sendEmail')
const crypto=require('crypto')

//Register

router.post('/register', async (req,res)=>{
  
   try {

       var emailExits=await User.findOne({email:req.body.email})
       if(emailExits){
           return res.status(400).json("Email Already Exits")
       }

       //PassHash
       var hashps=await bcrypt.hash(req.body.password,10)

       var user=await new User({
        name:req.body.name,
        email:req.body.email,
        password:hashps,
    });

       var data=await user.save();
       res.json(data)


//Mail

const token=await new Token({
userId:user._id,
token:crypto.randomBytes(32).toString("hex"),
}).save()

const url=`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
await sendMail(user.email,"Verify Email",url)
//End Mail
       
   } catch (err) {

    return res.status(400).json(err)
    
   }

   res.json(user)
 
});


//Login

router.post("/login",async (req,res)=>{
    try {

       var userData = await User.findOne({email:req.body.email})
       if(!userData){
           return res.status(400).json("Email Not Exits")
       }

       var validatePsw = await bcrypt.compare(req.body.password,userData.password)

       if(!validatePsw){
           return res.status(400).json("Password Not Valid")
       }

       //Mail

       if(!user.verified){
           let token=await Token.findOne({userId:user._id});
           if(!token){
            token=await new Token({
                userId:user._id,
                token:crypto.randomBytes(32).toString("hex"),
                }).save()
                
                const url=`${process.env.BASE_URL}users/${user._id}/verify/${token.token}`;
                await sendMail(user.email,"Verify Email",url)
           }
           return res.status(400).send({message:'email send your account pl verify'})
       }

       //End
       
 //Login the User Token

 var userToken = jwt.sign({email:userData.email},'process.env.JWI_SECRET');

  res.header("auth",userToken).json(userToken)


    } catch(err) {
       return res.status(400).json(err)
    }

})


const validateUser=(req,res,next)=>{
var token=req.header('auth');
req.token=token;
next();
}

router.get('/getAll',validateUser, async (req,res)=>{
    jwt.verify(req.token,'process.env.JWI_SECRET', async (err,data)=>{
if(err){
    res.sendStatus(403)
}else{
    const data=await User.find().select(['-password']);

    res.json(data)
}
    })
   
})

//Meethi

router.get('/:id/verify/:token',async (req,res)=>{
    try {
        const user=await User.findOne({_id:req.params.id});
        if(!user) return res.status(400).send({message:'Invalid Link'})
        const token=await Token.findOne({
            userId:user._id,
            token:req.params.token
        })
        if(!token) return res.status(400).send({message:'Invalid Link'})

        await User.updateOne({_id:user._id,verified:true})
        await token.remove();
        res.status(200).send({message:'Email varification Sucess'})
    } catch (err) {
        return res.status(400).json(err)
    }
})

//End
module.exports = router;