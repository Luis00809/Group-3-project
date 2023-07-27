function getGame(gameName) {
  let fetchGame =
    "https://api.rawg.io/api/games?search=" +
    gameName +
    "&search_exact=true&page_size=5000&ordering=released&key=decffd508da34a34bc289acf081e71c0";

  if (!gameName) {
    console.log("Enter a Valid Game Name");
    return;
  }

  return fetch(fetchGame)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

function freeGames() {
  const settings = {
    async: true,
    crossDomain: true,
    url: "https://gamerpower.p.rapidapi.com/api/giveaways",
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ec68b97893mshf85a5138dcd165ep1180d5jsnc5fcd51d8dc9",
      "X-RapidAPI-Host": "gamerpower.p.rapidapi.com",
    },
  };

  return $.ajax(settings).done(function (response) {
    return response;
  });
}
