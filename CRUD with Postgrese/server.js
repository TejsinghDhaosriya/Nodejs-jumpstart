const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app =express();


const db = require("./app/models");
//db.sequelize.sync();

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });


var corsOptions={
    origin :"http://localhost:8081"
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.json({message:"Welcome to our portal"});
})

require("./app/routes/turorial.routes")(app);

const PORT = process.env.PORT||8080;
app.listen(PORT,()=>{
    console.log(`server is runing on port ${PORT}`);

});
