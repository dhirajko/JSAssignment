'use strict'
class exif {

    constructor() {
        this.ExifImage = require('exif').ExifImage;

    }

    getlocation(image) {

        let location = new Object();
        try {
            new ExifImage({ image: image }, function (error, exifData) {
                if (error)
                    console.log('Error: ' + error.message);
                else {
                    location = exifData.gps;
                    return location;
                }

            }

            )}catch (error) {
            console.log('Error: ' + error.message);
          }
    }
}

module.exports=new exif;