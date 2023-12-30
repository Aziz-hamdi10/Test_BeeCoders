

const express=require('express');
const router =express.Router();
const user = require('../models/user');
const bcrypt= require('bcrypt');
const jwt=require('jsonwebtoken')
const multer = require('multer');

const mystorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, redirect) => {
        let date = Date.now();
        let f1 = date + '.' + file.mimetype.split('/')[1];
        redirect(null, f1);
        filename = f1;
    }
});

const upload = multer({ storage: mystorage });
router.post('/register', upload.any('image'),async(req,res)=>{
   try{
    const data = req.body;
    const usr = new user(data);
    const saltRounds = 20;
    const salt = await bcrypt.genSalt(saltRounds);
    const cryptpass = await bcrypt.hash(data.password, salt);
    console.log('Hashed password:', cryptpass);
    usr.password=cryptpass;
    usr.save().then(
        (saved) =>{res.send(usr);})
        .catch(
        (err)=>{res.send(err);});

   }
   catch{
    res.send(error)
   }
   
    
})
router.post('/login1', async (req, res) => {
    try {
      const data = req.body;
      user1= await user.findOne({email: data.email} )
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const oldHashMatches = await bcrypt.compare(password, user.password);
      
      if (oldHashMatches) {
        const newHash = await bcrypt.hash(password, 10); 
        user.password = newHash;
        await user.save();
      }
  
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (isValidPassword) {
        return res.json({ message: 'Login successful' });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
router.post('/login',async (req,res)=>{

    data=req.body;
    user1= await user.findOne({username: data.username} )
    if(!user1){
        res.status(404).send("username invalid")
    }
    else{
        console.log(data.password)
        console.log(user1.password)
        console.log(bcrypt.compareSync(data.password,user1.password))

        const validpass = bcrypt.compareSync(data.password,user1.password);
      
        if(data.password!=user1.password)
        {
            res.status(404).send("password invalid")

        }
        else{
          
            payload={
                _id: user1._id
                ,email:user1.email
            }
           

            token= jwt.sign(payload,'123456789')
            console.log(token)

        res.send({mytoken:token})
        }
    }

})

router.post('/add',upload.any('image'),async(req,res)=>{
        try{
            data =req.body;
            User=new user(data);
           saveduser= await User.save();
            res.send(saveduser);
                 
            
        }
        catch(err){
            console.log(err);
    
        }
      
    
    
    });
    router.get('/get',(req,res)=>{
        user.find().then((users)=>{
            res.send(users);
        }).catch((err)=>{console.log(err);})
    
    })
    router.get('/getnew',async(req,res)=>{
        try{
            users=await user.find();
            res.send(users);
    
        }
        catch(err){
            res.send(err);
        }
       
    
    })
    router.get('/getbyid/:id',(req,res)=>{
        myid=req.params.id;
        user.findOne({_id:myid}).then((user)=>{res.send(user);})
        .catch((err=>{ res.send(err);
    
        }))
           
        
    
    })
    router.get('/getbyidnew/:id',async(req,res)=>{
        try{
            myid=req.params.id;
           User=await  user.findOne({_id:myid})
           res.send(User);
           
    
        }
        catch(err){
            res.send(err);
        }
       
           
        
    
    })
    
    
    router.delete('/delete/:id',(req,res)=>{
        myid=req.params.id;
        console.log(myid);
        user.findOneAndDelete({_id:myid})
        .then((deleteduser)=>{console.log(deleteduser);})
        .catch((err)=>{console.log(err);})
    })
    router.delete('/deletenew/:id',async(req,res)=>{
        try{
            myid=req.params.id;
      
           User= await user.findOneAndDelete({_id:myid})
           res.send(User);
        }
        catch(err){
            res.send(err);
        }
     
      
    })
    router.put('/update/:id',(req,res)=>{
        myid=req.params.id;
        data=req.body;
        user.findByIdAndUpdate({_id:myid},data)
        .then((dataupdated)=>{res.send(update);})
        .catch((err)=>{
            res.send(err);
        })
    })
    router.put('/updatenew/:id', async(req,res)=>{
        try{
            myid=req.params.id;
            data=req.body;
            User= await user.findByIdAndUpdate({_id:myid},data)
            res.send(User);
    
        }
        catch(err){res.send(err);}
       
        
       
    })
module.exports=router;