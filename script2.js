function getGame() {
    let gameName = $('#searchField').val()
    let fetchGame = 'https://api.rawg.io/api/games?search=' + gameName + '&search_exact=true&key=decffd508da34a34bc289acf081e71c0';

    if(!gameName) {
        console.log("Enter a Valid Game Name")
        return
    }

    fetch(fetchGame)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data)
        })
}
