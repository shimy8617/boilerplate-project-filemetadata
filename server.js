var express = require('express');
var multer = require('multer');
var upload = multer({dest: 'uploads/'});
var bodyParser = require("body-parser");

var app = express();

var cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect = process.env.MONGO_URI;


app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended:false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'),(req, res) => {
  res.json({
    "name": req.file.originalname,
    "type": req.file.mimetype,
    "size": req.file.size
  })  
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
