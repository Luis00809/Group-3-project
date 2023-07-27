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
    img.addClass("img-card bg-cover");
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
    let title = $(this).children("#id").text();
    saveToLocalStorage(title);
  });

  // converts realease received from RAWG to "Jan 2023 format"
  function formatReleaseDate(u) {
    const releaseUnix = Date.parse(u);
    const date = new Date(releaseUnix);
    const options = { month: "short", year: "numeric" };
    const formattedDate = date.toLocaleString("en-US", options);
    return formattedDate;
  }

  function saveToLocalStorage(id) {
    let existingViewedGames = JSON.parse(localStorage.getItem("viewedGames"));
    if (existingViewedGames === null) {
      existingViewedGames = [];
    }

    // localStorage.setItem('viewedGames', JSON.stringify(id))
    existingViewedGames.push(id);
    localStorage.setItem("viewedGames", JSON.stringify(existingViewedGames));
    console.log(id);
  }

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

  // renders the Search history (UI only) when nav link is clicked
  function searchHistory() {
    clearDom();
    getSearchBar();
    getGrid();
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

    // creates a historyCard for every item stored in the array
    $.each(tempArray, function (i) {
      let indexer = tempArray[i];

      getCard(
        indexer.id,
        indexer.image,
        indexer.name,
        indexer.release,
        false,
        indexer.rating
      );
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
    getGame().then(function (gameData) {
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
