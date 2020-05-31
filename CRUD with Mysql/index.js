
///midddleware
var express = require('express');
var app = express();
var bodyParser  = require('body-parser');
var cors = require('cors');

var mysql = require('mysql');

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


////-----------------------------///////////////
app.get('/',function(req,res){
    return res.send({error:true,message:'hellotej'})
})
//retrive all users 
app.get('/information',function(req,res){
    dbConn.query('Select * FROM info',function(error,results,fields){
        if(error) throw error;
        return res.send({error:false,data:results,message:'Complete Data'});
    });
});

//Retrieve user with id
app.get('/mydata/:Id',function(req,res){
  console.log('0000000000000')
    let id = req.params.Id;
    
    if(!id){
        return res.status(400).send({error:true,message:'Please Provide Id'});
    }
    dbConn.query('select * from info where id=?',id,function(error,results,fields){
        if(error) throw error;
        return res.send({error:false,data:results[0],message:"Information by Id"});
    });
});
//Add a new Record 
app.post('/adduser',function(req,res){

    let name = req.body.name;
    let location = req.body.location;
    console.log(name+"wwwwwwwwwww"+location);
    if(!name && !location){
        return res.status(4000).send({error:true,message:'Please Provide Information'});
    }
    dbConn.query("insert Into info(name,location) value(?,?)",[name,location],function(error,results,fields){
   if(error) throw error;
   return res.send({ error:false,data:results,message:"added recorded"});        
    
});
});

//upate a record
app.put('/update',function(req,res){
    console.log("dddddddddddddddddddddddddddd");
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
app.post('/deleteuser',function(req,res){

    let id = req.body.id;
     if(!id){
        return res.status(4000).send({error:true,message:'Please Provide Information'});
    }
    dbConn.query("delete from info where id=?",id,function(error,results,fields){
   if(error) throw error;
   return res.send({ error:false,data:results,message:"deleted recorded"});        
    
});
});


app.listen(3000,function (){
  console.log("node is running on 30000ww");
} 
    
)

module.exports=app;