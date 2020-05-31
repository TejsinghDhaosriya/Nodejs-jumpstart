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