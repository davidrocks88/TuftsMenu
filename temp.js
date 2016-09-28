var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://tuftsdiningdata.herokuapp.com/menus/dewick/28/9/2016');
xhr.send();

xhr.onreadystatechange = function() {
        console.log(this.status);
        }