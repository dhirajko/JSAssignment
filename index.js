const url = 'cat.json';
jsonFile = '';

function listQ() {                                                                              //sorted fetch
    const e = document.getElementById("list")

    if (e.selectedIndex > 1) {
        jsonFile.sort(function (a, b) {
            var textA = a.title.toUpperCase();
            var textB = b.title.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
       // jsonFile.reverse()
    }
    else
    if (e.selectedIndex > 0) {
        jsonFile.sort(function (a, b) {
            var textA = a.category.toUpperCase();
            var textB = b.category.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        })
       // jsonFile.reverse()
    }
    
    console.log(jsonFile);
    document.querySelector('.container').innerHTML='';
    updateUI(jsonFile);
}
document.getElementById("list").addEventListener("click", listQ);




fetch(url)                                                                                              // default fetch
    .then(givenjson => givenjson.json())
    .then(receivedJSON => {
        jsonFile = receivedJSON;
        updateUI(jsonFile);



    });


updateUI = function (receivedJSON) {                                                                    // UI of web page

    for (const each of receivedJSON) {
        // console.log(each.image);
        const eachDiv = document.createElement('div'); //creating all required div
        const eachImageDiv = document.createElement('div');
        const titleDiv = document.createElement('div');
        const buttonDiv = document.createElement('div');
        const Image = document.createElement('img');
        const button = document.createElement('button');
        console.log("hello")


        Image.src = each.thumbnail; //giving property of required div
        Image.className = 'image';
        eachDiv.className = 'eachThumbnail';
        titleDiv.className = 'Description';
        titleDiv.innerHTML = '<h2>' + each.title + '</h2><br/>' + each.details;
        button.innerHTML = 'view';
        button.className = 'viewbutton';
        button.id = each.id;




        button.addEventListener('click', () => { //event listener for each view button
            const modalbox = document.querySelector('.modal');
            const modal_content = document.querySelector('.modal-content');
            const fullimage = document.createElement('img');
            const smallbox = document.createElement('div');




            fullimage.style.width = '100%';
            fullimage.style.height = 'auto';
            fullimage.style.margin = 'inherit';
            fullimage.style.border = '5px solid black';
            fullimage.style.borderRadius = '5px';
            fullimage.src = each.thumbnail;
            smallbox.className = 'mapbox';
            smallbox.innerHTML = '<iframe src="https://maps.google.com/maps?q=' + each.coordinates.lat + ',' + each.coordinates.lng + '&hl=en&z=14&amp;output=embed" width="100%" height="100%" frameborder="0" style="border:0" allowfullscreen></iframe>'








            modalbox.style.display = 'block';


            modal_content.appendChild(fullimage);
            modal_content.appendChild(smallbox);


        });



        eachImageDiv.appendChild(Image); //appending required div
        buttonDiv.appendChild(button);
        eachDiv.appendChild(eachImageDiv);
        eachDiv.appendChild(titleDiv);
        eachDiv.appendChild(buttonDiv);


        document.querySelector('.container').appendChild(eachDiv);



    }




    const close_button = document.querySelector('.close') //close button
    close_button.addEventListener('click', () => {
        const any = document.querySelector('.modal');
        any.style.display = 'none';
        const modal_content = document.querySelector('.modal-content');
        modal_content.innerHTML = '';
    })



    return receivedJSON;
}