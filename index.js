'use strict';

const express = require('express');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const database= require('./CRUD_method/database')
const location= require('./CRUD_method/exif');


const app = express();
const upload = multer({ dest: 'public/upload' });



app.listen(3000);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('form.html'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

database.connectdatabase('mongodb://localhost/cat');

//Schema
const Schema= database.createSchema();
// Model
const Model=database.createModel('Model',Schema);


//give the middle ware multer to upload file
app.post('/reg', upload.single('image'), (req, resp, next) => {
  console.log(req.file);

  req.body.original = 'public/upload/' + req.file.filename;
  console.log('uploaded');
  next();
});


app.post('/reg', (req, resp) => {                                             //  then next reg step                                 

  const billi = new Model({
    name: req.body.name,
    dob: req.body.dob,
    gender: req.body.gender,
    color: req.body.color,
    weight: req.body.weight,
    image: 'upload/' + req.file.filename,
    location: location.getlocation(req.body.original)    
    

  });
  console.log(billi);
  billi.save();

  resp.redirect('index.html')
})







//resp.redirect('form.html');







app.get('/', (req, resp) => {
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");                                                        // to home page
  resp.redirect('index.html');
})

app.get('/alldata', (req, res) => {

  Model.find({}, (err, data) => {
    res.json(data);
  })
  // to all json file of database
  /*ImageModel.find().then(ImageModels => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json(ImageModels);
  });*/
});


/*Getting EXIF coordinate in imagae data*/
/*
const ExifImage = require('exif').ExifImage;
app.get('/loc', (req, resp) => {
resp.status(200);
  try {
    new ExifImage({ image: `sarita.jpg` }, function (error, exifData) {
      if (error)
        console.log('Error: ' + error.message);
      else
        resp.send(exifData);                                  // Do something with your data! 
    });
  } ImageModelch (error) {
    console.log('Error: ' + error.messa0ge);
  }

})*/