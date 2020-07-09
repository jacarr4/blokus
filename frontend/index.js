function createGame() {
    const Http = new XMLHttpRequest();
    Http.onreadystatechange = function() {
        if(Http.readyState == 4 && Http.status == 200) {
            console.log(Http.responseText);
        }
    }
    const url = "/api/create_game"
    Http.open("GET", url);
    Http.send();
}