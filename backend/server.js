const express= require("express");
const cors =require("cors")
const bodyParser=require("body-parser");
const app = express();
const router =express.Router();
const ObjectId=require("mongodb").ObjectID;
const fileuplaod=require("express-fileupload");
var mongoose = require('mongoose');
// mongodb://<username>:<password>@clustermasjeed1-shard-00-00-ekpfe.mongodb.net:27017,clustermasjeed1-shard-00-01-ekpfe.mongodb.net:27017,clustermasjeed1-shard-00-02-ekpfe.mongodb.net:27017/test?ssl=true&replicaSet=ClusterMasjeed1-shard-0&authSource=admin&retryWrites=true
// mongoose.connect('mongodb://pradip:8600439794!@#@clustermasjeed1-shard-00-00-ekpfe.mongodb.net:27017,clustermasjeed1-shard-00-01-ekpfe.mongodb.net:27017,clustermasjeed1-shard-00-02-ekpfe.mongodb.net:27017/test?ssl=true&replicaSet=ClusterMasjeed1-shard-0&authSource=admin&retryWrites=true',{ useUnifiedTopology: true, useNewUrlParser: true});
// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function callback () {
//   console.log("connected db");
// });

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

// list
router.get('/users',(req,res)=>{
    db.collection('users').find({}).toArray((err,userlist)=>{
       if(err) throw err;   
          res.send(userlist);  
    });
});







//create
router.post('/users/create',(req,res)=>{
    const file = req.body;
    // const fileurl = file.files.File;
    console.log("file",file);
    // fileurl.mv(`${__dirname}/uploads/${req.body.filename}`,err=>{
    //    if(err){
    //      console.log(err);
    //      return res.status(500).send(err);
    //    } 
    //    res.json({fileName:req.body.file})
    // })
   db.collection('users').insertOne({
       firstname:req.body.firstname,lastname:req.body.lastname,filename:req.body.filename
    },(err,result)=>{
      if(err) throw err;
        console.log('User created successfully')
   });
});

//updated
router.put('/users/update',(req,res)=>{
   db.collection("users").updateOne({_id:ObjectId(req.body._id)},
   {$set:{firstname:req.body.firstname,lastname:req.body.lastname}},(err,result)=>{
       if(err) throw err;
       console.log("User updated successfully")
   })
});

//delete
router.delete('/users/delete',(req,res)=>{
    console.log(req.body._id);
    console.log(ObjectId(req.body._id));
   db.collection("users").deleteOne({_id:ObjectId(req.body._id)},(err,result)=>{
   if(err) throw err;
   console.log(" User deleted successfully")
   })
});

//

app.use('/api',router);

app.listen(5001,()=>console.log("server is up and running "));