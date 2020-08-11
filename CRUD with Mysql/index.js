
///midddleware
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var cors = require('cors');

var mysql = require('mysql');
let PORT = 3000
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended:true
}));

//connection
var dbConn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test-jumpstart'
});
//connect to database
dbConn.connect();


app.get('/',function(req,res){
    return res.send({error:true,message:'Hello Tej!'})
})
//retrive all users 
app.get('/getusers',function(req,res){
    dbConn.query('Select * FROM info',function(error,results,fields){
        if(error) throw error;
        return res.send({error:false,data:results,message:'All User Data'});
    });
});

//Retrieve user with id
app.get('/getuser/:Id',function(req,res){
  
    let id = req.params.Id;
    console.log(id)
    
    if(!id){
        return res.status(400).send({error:true,message:'Please Provide Id'});
    }
    dbConn.query('select * from info where id=?',id,function(error,results,fields){
        if(error) throw error;
        return res.send({error:false,data:results,message:"Information by Id"});
    });
});
//Add a new Record 
app.post('/adduser',function(req,res){

    let id = req.body.id;
    let name = req.body.name;
    let location = req.body.location;
    if(!name && !location){
        return res.status(4000).send({error:true,message:'Please Provide Information'});
    }
    dbConn.query("insert Into info(id,name,location) value(?,?,?)",[id,name,location],function(error,results,fields){
   if(error) throw error;
   return res.send({ error:false,data:results,message:"added recorded"});        
    
});
});

//upate a record
app.put('/updateuser',function(req,res){
    let id = req.body.id;
    let name = req.body.name;
    let location = req.body.location;
    if(!id || !name || !location){
        return res.status(400).send({error:user,message:'Please Provide Complete'});    
    }
    dbConn.query('update info set name=?,location=? where id=?',[name,location,id],function(error,results,fields){
        if(error) throw error;
        return res.send({error:false,data:results,message:'data updated'}); 
    });
});

///listen
app.delete('/deleteuser/:id',function(req,res){

    let id = req.params.id;
     if(!id){
        return res.status(4000).send({error:true,message:'Please Provide Information'});
    }
    dbConn.query("delete from info where id=?",id,function(error,results,fields){
   if(error) throw error;
   return res.send({ error:false,data:results,message:"User Removed"});        
    
});
});


app.listen(PORT,function (){
  console.log(`Node is running on ${PORT}`);
} 
    
)

module.exports=app;