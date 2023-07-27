// common tailwind styles / space is added at beginning and end of string so additional styles can be added after each instance
const h1 = " text-h1  font-bold  text-neu-0 ";
const h2 = " text-h2  font-bold  text-neu-0 ";
const h3 = " text-h3  font-semibold  text-neu-0 ";
const h4 = " text-h4  font-medium  text-neu-0 ";
const smTxt = " text-sm  text-neu-0 ";
const btn =
  " bg-pri-5  rounded  px-4  py-3  h-10  cursor-pointer  hover:bg-pri-9 " + h4;
const input =
  " bg-neu-8  text-neu-0  h-10  rounded  px-3  mr-4  w-80 outline-none outline-offset-[-2px] focus:outline-pri-5 ";
const grid = " grid  grid-cols-auto  gap-4 ";
const card =
  " card p-4 text-neu-0  bg-neu-8  rounded-lg shadow-md cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_25px_-5px] hover:shadow-pri-5 ";

// CORE APP
$(function () {
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
    getFreeGames();
  });

  searchHistoryBtn.on("click", function () {
    searchHistory();
  });

  iveReviewedBtn.on("click", function () {
    getReviewed();
  });

  // COMMON FUNCTIONS
  // clears dom before re rendering
  function clearDom() {
    root.text("");
    root.css({ backgroundImage: "none", height: "calc(100vh + 56px)" });
    root.removeClass(" flex");
    root.addClass(
      "  mt-14  block  bg-cover  bg-no-repeat  p-8  bg-neu-9  bg-none "
    );
  }

  // renders searchvar when called
  function getSearchBar() {
    let searchBarDiv = $("<div>");
    let searchField = $("<input>");
    let searchBtn = $("<button>");

    searchField.addClass(input);
    searchBtn.addClass(btn);
    searchBarDiv.addClass(" flex  mb-4");

    root.append(searchBarDiv);
    searchBarDiv.append(searchField);
    searchBarDiv.append(searchBtn);
    searchBtn.text("Go!");
    searchField.attr({
      placeholder: "Search Title or Genre",
      id: "searchField",
    });
    searchBtn.on("click", getSearchResults);
  }

  // renders card grid when called to house cards
  function getGrid() {
    let gridDiv = $("<div>");
    root.append(gridDiv);
    gridDiv.addClass(grid);
  }

  // renders a card for each game when called in for loop
  function getCard(id, imgSrc, titleSrc, releaseSrc, altLabel, altSrc) {
    // imgSrc = data point for game thumbnail
    // titleSrc = data point for game title
    // releaseSrc = data point for game release date
    // altLabel = (boolean) if true label is 'Value' else 'Avg. Score'
    // altSrc = value or game rating data point.
    let newCard = $("<div>");
    let img = $("<img>");
    let title = $("<h3>");
    let release = $("<p>");
    let ratingDiv = $("<div>");
    let ratingLabel = $("<p>");
    let rating = $("<h2>");
    let idConst = $("<p>" + id + "</p>");

    // renders card on .grid
    $(".grid").append(newCard);

    // holds the id collected from the api for storage
    newCard.append(idConst);
    idConst.css("display", "none").attr("id", "id");

    // renders each line item on card
    newCard.append(img);
    newCard.append(title);
    newCard.append(release);
    newCard.append(ratingDiv);
    ratingDiv.append(ratingLabel);
    ratingDiv.append(rating);

    // sets styles for card
    newCard.addClass(card);
    img.addClass("w-full  h-52 object-cover");
    title.addClass(h3 + " mt-4");
    release.addClass(smTxt + " mb-6  text-neu-3");
    rating.addClass(h2);
    ratingLabel.addClass(" text-sm  text-neu-3");

    // conditional for altLabel
    if (altLabel) {
      ratingLabel.text("Value");
    } else {
      ratingLabel.text("Avg. Score");
    }

    // conditional for release date text
    if (!releaseSrc) {
      releaseSrc = "Release: (TBA)";
    }

    // conditional for altScr text
    if (!altSrc || altSrc == "N/A") {
      altSrc = "N/A";
      rating.addClass(" text-neu-5");
    }

    // data from returned results goes here
    img.attr("src", imgSrc);
    title.text(titleSrc);
    release.text(releaseSrc);
    rating.text(altSrc);
  }

  // listener for cards - temporily prints game title in console - will eventually render that games info page.
  root.on("click", ".card", function () {
    let id = $(this).children("#id").text();
    let title = $(this).children().eq(2).text();
    saveToLocalStorage(id, title);
    console.log(title);
  });

  // converts realease received from RAWG to "Jan 2023 format"
  function formatReleaseDate(u) {
    const releaseUnix = Date.parse(u);
    const date = new Date(releaseUnix);
    const options = { month: "short", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }

  function saveToLocalStorage(id, title) {
    let thisGame = {
      thisId: id,
      thisTitle: title,
    };

    let existingViewedGames = JSON.parse(localStorage.getItem("viewedGames"));
    if (existingViewedGames === null) {
      existingViewedGames = [];
    }

    // if an id of a clicked card already exists in localStorage this will move that id to be beginning of the array
    if (
      JSON.stringify(existingViewedGames).includes(JSON.stringify(thisGame))
    ) {
      existingViewedGames.push(
        existingViewedGames.splice(
          existingViewedGames.findIndex((v) => v == JSON.stringify(thisGame)) +
            1,
          1
        )[0]
      );
      localStorage.setItem("viewedGames", JSON.stringify(existingViewedGames));
    } else {
      existingViewedGames.push(thisGame);
      localStorage.setItem("viewedGames", JSON.stringify(existingViewedGames));
    }
  }

  // when the review form is done we can plug in the data with this function
  function saveReviewToLocal(id, title, score, comment) {
    let thisReview = {
      thisId: id,
      thisTitle: title,
      thisScore: score,
      thisComment: comment,
    };

    let existingReviews = JSON.parse(localStorage.getItem("myReviews"));

    if (existingReviews === null) {
      existingReviews = [];
    }

    if (JSON.stringify(existingReviews).includes(JSON.stringify(thisReview))) {
      existingReviews.push(
        existingReviews.splice(
          existingReviews.findIndex((v) => v == JSON.stringify(thisReview)) + 1,
          1
        )[0]
      );
      localStorage.setItem("myReviews", JSON.stringify(existingReviews));
    } else {
      existingReviews.push(thisReview);
      localStorage.setItem("myReviews", JSON.stringify(existingReviews));
    }
  }

  // TEMPORARY FUNCTION TO TEXT REVIEWED GAMES
  function testReview() {
    const temp = [
      {
        id: "24182",
        title: "The Legend of Zelda: Twilight Princess HD",
        score: "7",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut vehicula urna. Etiam blandit elementum sem ac feugiat. Maecenas porttitor rhoncus libero a iaculis. Pellentesque accumsan volutpat odio, et rhoncus tortor vehicula non. Vestibulum tempus metus sed pellentesque pharetra. Integer tempus",
      },
      {
        id: "22511",
        title: "The Legend of Zelda: Breath of the Wild",
        score: "7",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut vehicula urna. Etiam blandit elementum sem ac feugiat. Maecenas porttitor rhoncus libero a iaculis. Pellentesque accumsan volutpat odio, et rhoncus tortor vehicula non. Vestibulum tempus metus sed pellentesque pharetra. Integer tempus",
      },
      {
        id: "56092",
        title: "The Legend of Zelda: The Wind Waker",
        score: "7",
        comment:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut vehicula urna. Etiam blandit elementum sem ac feugiat. Maecenas porttitor rhoncus libero a iaculis. Pellentesque accumsan volutpat odio, et rhoncus tortor vehicula non. Vestibulum tempus metus sed pellentesque pharetra. Integer tempus",
      },
    ];

    $.each(temp, function (i) {
      saveReviewToLocal(
        temp[i].id,
        temp[i].title,
        temp[i].score,
        temp[i].comment
      );
    });
  }
  testReview();
  // TEMPORARY FUNCTION TO TEXT REVIEWED GAMES

  // PAGE RENDERS
  // renders landing page
  function landingPage() {
    clearDom();
    // sets background image and opacity
    root.css({
      backgroundImage:
        "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images8.alphacoders.com/954/thumb-1920-954028.jpg)",
    });
    root.addClass(" flex");

    let greetingDiv = $("<div>");
    let greeting = $("<h1>");
    let subGreeting = $("<h3>");
    let searchField = $("<input>");
    let searchBtn = $("<button>");

    root.append(greetingDiv);
    greetingDiv.append(greeting);
    greetingDiv.append(subGreeting);
    greetingDiv.append(searchField);
    greetingDiv.append(searchBtn);

    greeting.text("Your next adventure awaits...");
    subGreeting.text(
      "Search from 1000s of games by title or genre to compare reviews and prices"
    );
    searchField.attr({
      placeholder: "Search Title or Genre",
      id: "searchField",
    });
    searchBtn.text("Show me what you've got!");

    greetingDiv.addClass(" text-center  m-auto");
    greeting.addClass(h1 + "  mb-1 ");
    subGreeting.addClass(h3 + "  mb-6");
    searchField.addClass(input + " text-center");
    searchBtn.addClass(btn + "  block  mt-4  mx-auto");

    searchBtn.on("click", getSearchResults);
  }

  //renders Stuff I've Reviewed Page when nav link is clicked
  function getReviewed() {
    clearDom();
    getSearchBar();
    getGrid();
    let getReviewedTemp = [
      {
        name: "Warcraft III: Reforged",
        image:
          "https://media.rawg.io/media/games/4e9/4e908c9270228430128105bcd88e51bc.jpg",
        rating: "59",
        release: "Jan 2020",
        price: "$10.99",
      },
      {
        name: "Warcraft III: Reforged",
        image:
          "https://media.rawg.io/media/games/4e9/4e908c9270228430128105bcd88e51bc.jpg",
        rating: "59",
        release: "Jan 2020",
        price: "$10.99",
      },
      {
        name: "Warcraft III: Reforged",
        image:
          "https://media.rawg.io/media/games/4e9/4e908c9270228430128105bcd88e51bc.jpg",
        rating: "59",
        release: "Jan 2020",
        price: "$10.99",
      },
      {
        name: "Warcraft III: Reforged",
        image:
          "https://media.rawg.io/media/games/4e9/4e908c9270228430128105bcd88e51bc.jpg",
        rating: "59",
        release: "Jan 2020",
        price: "$10.99",
      },
      {
        name: "Warcraft III: Reforged",
        image:
          "https://media.rawg.io/media/games/4e9/4e908c9270228430128105bcd88e51bc.jpg",
        rating: "59",
        release: "Jan 2020",
        price: "$10.99",
      },
    ];

    // gets localStorage 'myReviews' and parses to an array
    let myReviews = JSON.parse(localStorage.getItem("myReviews"));
    myReviews.reverse();

    // creates a reviewed game for every item stored in the array
    $.each(getReviewedTemp, function (i) {
      let indexer = myReviews[i];

      // search for that title but...
      getGame(indexer.thisTitle).then(function (gameData) {
        $.each(gameData.results, function (y) {
          let x = gameData.results[y];
          // only display that title if the id from RAWG matches the one we stored...
          if (x.id == indexer.thisId) {
            getCard(
              x.id,
              x.background_image,
              x.name,
              formatReleaseDate(x.released),
              false,
              indexer.thisScore
            );
          }
        });
      });
    });
  }

  // renders the Search history (UI only) when nav link is clicked
  function searchHistory() {
    clearDom();
    getSearchBar();
    getGrid();

    // gets localStorate 'viewedGames' and parse to an array
    let history = JSON.parse(localStorage.getItem("viewedGames"));
    history.reverse();
    // for each item in history...
    $.each(history, function (i) {
      let indexer = history[i];

      // search for that title but...
      getGame(indexer.thisTitle).then(function (gameData) {
        $.each(gameData.results, function (y) {
          let x = gameData.results[y];
          // only display that title if the id from RAWG matches the one we stored...
          if (x.id == indexer.thisId) {
            //then print that card
            getCard(
              x.id,
              x.background_image,
              x.name,
              formatReleaseDate(x.released),
              false,
              x.metacritic
            );
          }
        });
      });
    });
  }

  function getFreeGames() {
    freeGames().then(function (gameData) {
      clearDom();
      getGrid();
      console.log(gameData);

      $.each(gameData, function (i) {
        let indexer = gameData[i];
        getCard(
          indexer.id,
          indexer.thumbnail,
          indexer.title,
          indexer.published_date,
          true,
          indexer.worth
        );
      });
    });
  }

  // prints search results on page
  function getSearchResults() {
    getGame($("#searchField").val()).then(function (gameData) {
      // gets Promise from getGame() and loads page when fullfilled.
      clearDom();
      getSearchBar();
      getGrid();

      console.log(gameData);
      gameData.results.reverse(); // reverses the array of search results so the newest game will appear first

      $.each(gameData.results, function (i) {
        let isOfficial = gameData.results[i].added; // The RAWG API has a lot of unofficial data.  This will help us condition if content is legitimate.  We may need to use other keypairs in the object
        let indexer = gameData.results[i];
        if (isOfficial > 10) {
          getCard(
            indexer.id,
            indexer.background_image,
            indexer.name,
            formatReleaseDate(indexer.released),
            false,
            indexer.metacritic
          );
        }
      });
    });
  }

  landingPage(); // renders the landing page on load
});
