window.onload = load;

var obj;
var ready = 0;

function load() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    var marker = String(day) + String(month);

    var hall = 'dewick';
        
    if (localStorage.marker === marker && "obj" in localStorage) {
            ready = 4;
            obj = JSON.parse(localStorage.obj);
    } 
    else {
        localStorage.marker = marker;
        var request = new XMLHttpRequest();

        request.open("GET", "https://tuftsdiningdata.herokuapp.com/menus/" + hall + '/' + day + '/' + month + '/' + year);
        request.send();


        request.onreadystatechange = function() {
            ready = request.readyState;
            console.log(ready);
            if (request.readyState == 4 && request.status == 200) {
                obj = request.responseText;
                localStorage.obj = obj;
                console.log(JSON.parse(obj));
            }
        };

        function reqListener() {
            obj = JSON.parse(this.responseText);
            localStorage.obj = Stringify(obj);
        }
    }
}


function getData() {
    if (ready != 4) {
        console.log('Waiting For Server...');
        return 0;
    }
    else {
        return obj;
    }
}

