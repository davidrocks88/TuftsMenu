
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
        sortMenuOrder(meals[i]);
    }

}

function parseMeal(meal) {
    var mealData = meal[0];
    var mealName = "#" + meal[1];
    $(mealName).html("<h1>" + mealName.substring(1) + "</h1>");
    for (var key in mealData) {
        if (mealData.hasOwnProperty(key)) {
            var keyName = key.replace(/[^a-zA-Z0-9+]/g, "_");
            $(mealName).append("<ul class='" + keyName + "'><p class='minus'>" + key + "</p></ul>");

            var dtLength = mealData[key].length;
            for (var i = 0; i < dtLength; i++) {
                $("." + keyName).append("<li>" + mealData[key][i] + "</li>");
            }
        }
    }
}

function sortMenuOrder(meal) {
    var mealID = "#" + meal[1];
    var mealClass = "." + meal[1].toUpperCase();
    // edge-case: dinner class is "entrees", not "entree"
    mealClass = (mealClass === ".DINNER") ? mealClass + "_ENTREES" : mealClass + "_ENTREE";

    // bring non-hidden categories to top of menu
    $(mealID + " ul").each(function() {
        var that = this;
        var cat = "." + $(that).attr("class");
        if ($(cat + " li").css("display") !== "none") {
            $(mealID).prepend($(that));
        } else {
            $(cat + " p").attr("class", "plus");
        }
    });

    // bring entrees to top of menu
    $(mealID).prepend($(mealID + " .VEGETARIAN_OPTIONS"));
    $(mealID).prepend($(mealClass));
    $(mealID).prepend($(mealID + " h1"));
}