
var request = new XMLHttpRequest();

var date = new Date();
var day = date.getDate();
var month = date.getMonth();
var year = date.getFullYear();
var hall = 'dewick';


request.addEventListener("load", reqListener);


request.open("GET", "https://tuftsdiningdata.herokuapp.com/menus/" + hall + '/' + day + '/' + month + '/' + year);


request.send();

var obj;

function reqListener() {
        // document.getElementById('hi').innerHTML = this.responseText;
        obj = JSON.parse(this.responseText);
        handleResponse(obj);
}

function handleResponse(obj) {
        console.log(obj);
        breakfast = obj.data.Breakfast;
        lunch = obj.data.Lunch;
        dinner = obj.data.Dinner;

        console.log(breakfast);

        for (var i = 0; i < breakfast.length; i++) {
                console.log(breakfast[i]);
        };
 

        document.getElementById('Breakfast').innerHTML = JSON.stringify(breakfast);
        document.getElementById('Lunch').innerHTML = JSON.stringify(lunch);
        document.getElementById('Dinner').innerHTML = JSON.stringify(dinner);
}

