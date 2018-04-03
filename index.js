'use strict';

const express = require('express');
const app = express();
app.listen(3000);


// initalize multer
const multer = require('multer');
const upload = multer({ dest: 'public/upload' })

//inatilize path
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));


const ExifImage = require('exif').ExifImage;                //using Exif image defined
app.use(express.static('form.html'));

// body-parser parse application/x-www-form-urlencoded
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())                                                // parse application/json


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cat').then(() => {
  console.log('Connected successfully.');
}, err => {
  console.log('Connection to db failed: ' + err);
});




const Schema = mongoose.Schema;                                               // Schema

const catSchema = new Schema({
  name: String,
  dob: Date,
  gender: {
    type: String,
    enum: ['male', 'female'],
  },
  color: String,
  weight: Number,
  image: String,
  location: Object

});

// Model
const Cat = mongoose.model('Cat', catSchema);


/*serve static files (save the form to public-folder) this will create the public folder in server level*/



//give the middle ware multer to upload file
app.post('/reg', upload.single('image'), (req, resp, next) => {
  console.log(req.file);

  req.body.original = 'public/upload/'+req.file.filename;
  console.log('uploaded');
  next();
});


app.post('/reg', (req, resp) => {                                             //  then next reg step                                 
  let location = new Object();
  try {
    new ExifImage({ image: req.body.original }, function (error, exifData) {
      if (error)
        console.log('Error: sss' + error.message);
      else {
        location = exifData.gps;
        
        console.log(exifData.gps);
        const billi = new Cat({
          name: req.body.name,
          dob: req.body.dob,
          gender: req.body.gender,
          color: req.body.color,
          weight: req.body.weight,
          image: 'upload/'+req.file.filename,
          location: location  
          
        });
        console.log(billi);
        billi.save();

        resp.redirect('index.html')
      }
    });
  } catch (error) {
    console.log('Error: ' + error.message);
  }

   
   //resp.redirect('form.html');


})






app.get('/', (req, resp) => {  
  resp.header("Access-Control-Allow-Origin", "*");
  resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");                                                        // to home page
  resp.redirect('index.html');
})

app.get('/alldata', (req, res) => {    
  
  Cat.find({}, (err, data) => {
    res.json(data);
})
  // to all json file of database
  /*Cat.find().then(cats => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.json(cats);
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
  } catch (error) {
    console.log('Error: ' + error.messa0ge);
  }

})*/