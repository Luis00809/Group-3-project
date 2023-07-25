$(function () {
  let body = $("body");
  let nav = $("nav");
  let root = $("#root");

  // NAV BAR LISTENERS
  let returnToLandingBtn = nav.children().eq(0);
  let freeGamesBtn = nav.children().eq(1).children().eq(0);
  let searchHistoryBtn = nav.children().eq(1).children().eq(1);
  let iveReviewedBtn = nav.children().eq(1).children().eq(2);

  returnToLandingBtn.on("click", function () {
    console.log("this renders the landing page");
    landingPage();
  });

  freeGamesBtn.on("click", function () {
    console.log("this render a list of free games");
    getFreeGames();
  });

  searchHistoryBtn.on("click", function () {
    console.log("this renders my search history");
    searchHistory();
  });

  iveReviewedBtn.on("click", function () {
    console.log("this renders games ive reviewed");
  });

  // COMMON FUNCTIONS
  // clears dom before re rendering
  function clearDom() {
    root.text("");
    root.css("background", "none");
  }

  // converts realease received from RAWG to "Jan 2023 format"
  function formatReleaseDate(u) {
    const releaseUnix = Date.parse(u);
    const date = new Date(releaseUnix);
    const options = { month: "short", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }

  // renders landing page
  function landingPage() {
    clearDom();
    // sets background image and opacity
    root.css({
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images8.alphacoders.com/954/thumb-1920-954028.jpg)",
    });

    let greetingDiv = $("<div>");
    let greeting = $("<h1>");
    let subGreeting = $("<h3>");
    let searchField = $("<input>");
    let searchBtn = $("<button>");

    root.append(greetingDiv);
    greetingDiv.addClass("greetingDiv");
    greetingDiv.append(greeting);
    greeting.text("Your next adventure awaits...");
    greetingDiv.append(subGreeting);
    subGreeting.text(
      "Search from 1000s of games by title or genre to compare reviews and prices"
    );
    greetingDiv.append(searchField);
    searchField.attr({
      placeholder: "Search Title or Genre",
      id: "searchField",
    });
    greetingDiv.append(searchBtn);
    searchBtn.text("Show me what you've got!");

    searchBtn.on("click", getSearchResults);
  }

  // listener for history cards - temporily prints game title in console - will eventually render that games info page.
  root.on("click", ".historyCard", function () {
    let title = $(this).children().eq(1).text();
    console.log(title);
  });

  // renders the Search history (UI only) when nav link is clicked
  function searchHistory() {
    clearDom();

    let searchBarDiv = $("<div>");
    let searchField = $("<input>");
    let searchBtn = $("<button>");

    root.append(searchBarDiv);
    searchBarDiv.append(searchField);
    searchBarDiv.append(searchBtn);
    searchBtn.text("Go!");
    searchField.attr({
      placeholder: "Search Title or Genre",
      id: "searchField",
    });
    searchBarDiv.addClass("searchBarDiv");

    searchBtn.on("click", getGame);
    // this array is temporary for the sake of building the components.  It will need to be updated to get search history from localStorage
    let tempArray = [
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
        price: "$10.99",
      },
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
        price: "$10.99",
      },
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
        price: "$10.99",
      },
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
        price: "$10.99",
      },
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
        price: "$10.99",
      },
    ];

    let historyCardDiv = $("<div>");
    root.append(historyCardDiv);
    historyCardDiv.addClass("grid");

    // creates a historyCard for every item stored in the array
    $.each(tempArray, function (i) {
      let card = $("<div>");
      let img = $("<img>");
      let title = $("<h3>");
      let release = $("<p>");
      let ratingDiv = $("<div>");
      let ratingLabel = $('<p class="small-text">Avg. score</p>');
      let rating = $("<h2>");

      historyCardDiv.append(card);
      card.addClass("card");
      card.append(img);

      card.append(title);

      card.append(release);
      release.addClass("small-text release");
      card.append(ratingDiv);
      ratingDiv.append(ratingLabel);
      ratingDiv.append(rating);

      // data from returned results goes here
      img.attr("src", tempArray[i].image);
      title.text(tempArray[i].name);
      release.text(tempArray[i].release);
      rating.text(tempArray[i].rating);
    });
  }

  function getFreeGames() {
    clearDom();
    let tempArray = [
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
      },
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
      },
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
      },
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
      },
      {
        name: "Grand Theft Auto V",
        image:
          "https://media.rawg.io/media/games/456/456dea5e1c7e3cd07060c14e96612001.jpg",
        rating: "4.47",
        release: "2013-09-17",
      },
    ];

    let freeGamesDiv = $("<div>");
    root.append(freeGamesDiv);
    freeGamesDiv.addClass("grid");

    $.each(tempArray, function (i) {
      let card = $("<div>");
      let img = $("<img>");
      let title = $("<h3>");
      let release = $("<p>");
      let ratingDiv = $("<div>");
      let ratingLabel = $('<p class="small-text">Avg. score</p>');
      let rating = $("<h2>");

      freeGamesDiv.append(card);
      card.addClass("card");
      card.append(img);

      card.append(title);

      card.append(release);
      release.addClass("small-text release");
      card.append(ratingDiv);
      ratingDiv.append(ratingLabel);
      ratingDiv.append(rating);

      // data from returned results goes here
      img.attr("src", tempArray[i].image);
      title.text(tempArray[i].name);
      release.text(tempArray[i].release);
      rating.text(tempArray[i].rating);
    });
  }

  // prints search results on page
  function getSearchResults() {
    getGame().then(function (gameData) {
      // gets Promise from getGame() and loads page when fullfilled.
      clearDom();

      let searchBarDiv = $("<div>");
      let searchField = $("<input>");
      let searchBtn = $("<button>");

      root.append(searchBarDiv);
      searchBarDiv.append(searchField);
      searchBarDiv.append(searchBtn);
      searchBtn.text("Go!");
      searchField.attr({
        placeholder: "Search Title or Genre",
        id: "searchField",
      });
      searchBarDiv.addClass("searchBarDiv");
      searchBtn.on("click", getSearchResults);

      console.log(gameData);

      let searchResultsDiv = $("<div>");
      root.append(searchResultsDiv);
      searchResultsDiv.addClass("grid");

      gameData.results.reverse(); // reverses the array of search results so the newest game will appear first

      $.each(gameData.results, function (i) {
        let isOfficial = gameData.results[i].added; // The RAWG API has a lot of unofficial data.  This will help us condition if content is legitimate.  We may need to use other keypairs in the object

        if (isOfficial > 10) {
          let card = $("<div>");
          let img = $("<img>");
          let title = $("<h3>");
          let release = $("<p>");
          let ratingDiv = $("<div>");
          let ratingLabel = $("<h4>Metacritic Score</h4>");
          let rating = $("<h2>");

          searchResultsDiv.append(card);
          card.addClass("card");
          card.append(img);

          card.append(title);

          card.append(release);
          release.addClass("small-text release");
          card.append(ratingDiv);
          ratingDiv.append(ratingLabel);
          ratingDiv.append(rating);

          let indexer = gameData.results[i];

          // data from returned results goes here
          img.attr("src", indexer.background_image);
          title.text(indexer.name);

          release.text("Released: " + formatReleaseDate(indexer.released)); // converts date

          // if a game does not have a release date;
          if (indexer.tba) {
            release.text("Release: (TBA)");
          }

          // if a game does not have a meta score;
          if (!indexer.metacritic) {
            indexer.metacritic = "N/A";
            rating.css("color", "var(--neutral-500)");
          }
          rating.text(indexer.metacritic);
        }
      });
    });
  }

  landingPage(); // renders the landing page on load
});
