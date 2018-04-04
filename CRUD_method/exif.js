

'use strict'
class exif {

    constructor() {
        this.ExifImage=require('exif').ExifImage;

    }

    getlocation(pic,remainingWork) {

        //let location = new Object();


        try {
            console.log(pic);
            
            new ExifImage({ image: pic }, function (error, exifData) {
              if (error)
                console.log('Error: ' + error.message);
              else
                console.log(exifData.gps);
                return exifData.gps;
            }).then((gps)=>{
                remainingWork(gps);
                
            });
          } catch (error) {
            console.log('Error: ' + error.message);
          }
           
    }
}

module.exports = new exif;