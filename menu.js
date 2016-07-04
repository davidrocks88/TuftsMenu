
var request = new XMLHttpRequest();

var date = new Date();
var day = date.getDate();
var month = date.getMonth() + 1;
var year = date.getFullYear();
var hall = 'dewick';


request.addEventListener("load", reqListener);


request.open("GET", "https://tuftsdiningdata.herokuapp.com/menus/" + hall + '/' + day + '/' + month + '/' + year);


request.send();

var obj;

function reqListener() {
    obj = JSON.parse(this.responseText);
    handleResponse(obj);
}

function handleResponse(obj) {
    breakfast = obj.data.Breakfast;
    lunch = obj.data.Lunch;
    dinner = obj.data.Dinner;

    $("#hall").append(hall);

    var meals = [[breakfast, "breakfast"], [lunch, "lunch"], [dinner, "dinner"]];
    var numMeals = meals.length;

    for (var i = 0; i < numMeals; i++) {
        parseMeal(meals[i]);
    }

}

function parseMeal(meal) {
    var mealData = meal[0];
    var mealName = "#" + meal[1];
    $(mealName).html("<h1>" + mealName.substring(1) + "</h1>");
    for (var key in mealData) {
        if (mealData.hasOwnProperty(key)) {
            $(mealName).append("<ul>" + key + "</ul>");

            var dtLength = mealData[key].length;
            for (var i = 0; i < dtLength; i++) {
                $(mealName).append("<li>" + mealData[key][i] + "</li>");
            }
        }
    }
}