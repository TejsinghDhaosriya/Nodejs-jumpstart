var express  = require('express');  
var app =express();
var bodyParser = require('body-parser');
var jsondata = require('./movies.json');
var _und = require('underscore');

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

router.get('/',function(req,res){
    res.json(jsondata);
})  

router.post('/postdata',function(req,res){
   // console.log(req.body.Id);
    if(req.body.Id && req.body.Title)
     {
       
       jsondata.push(req.body);
       res.json(jsondata);  
     }
     else{
         console.log("put some value");
     }
})

router.put('/updatedata/:Id',function(req,res){
    console.log(req.params.Id)
 if(req.params.Id){
     _und.each(jsondata,function(ele,index)
     {
         if(req.params.Id==ele.Id){
             ele.Title="Hello";
             ele.Director="tez";
         }
     })
   res.json(jsondata);
    }

    else{ console.log("Invalid Req");}

})

router.delete('/deletedata/:Id',function(req,res){
    getindextodelete=-1;
    console.log(req.params.Id); 
    if(req.params.Id){
        _und.each(jsondata,function(ele,index){
            if(ele.Id==req.params.Id){
                getindextodelete=index;
            }
        })
     if(getindextodelete>-1)
    {
        jsondata.splice(getindextodelete,2);
    }
    res.json(jsondata);
}
else{
    console.log("invalid delete input");
}

   
})

app.use('/api',router);
app.listen(port);