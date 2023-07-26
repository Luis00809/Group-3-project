const h1 = "  text-h1  font-bold  text-neu-0 ";
const h2 = "  text-h2  font-bold  text-neu-0 ";
const h3 = "  text-h3  font-semibold  text-neu-0 ";
const h4 = "  text-h4  font-medium  text-neu-0 ";

const smTxt = "  text-sm  text-neu-0 ";

const btn =
  "  bg-pri-5  rounded  px-4  py-3  h-10  cursor-pointer  hover:bg-pri-9 " + h4;
const input = "  bg-neu-8  text-neu-0  h-10  rounded  px-3  mr-4  w-80 ";

const grid = "  grid  grid-cols-auto  gap-4 ";
const card =
  "  p-4  text-neu-0  bg-neu-8  rounded-lg  hover:bg-opac-pri  hover:translate-y-[-2px] ";

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
    root.css({ backgroundImage: "none", height: "calc(100vh + 56px)" });
    root.removeClass(" flex");
    root.addClass(
      "  mt-14  block  bg-cover  bg-no-repeat  p-8  bg-neu-9  bg-none "
    );
  }

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

  function getGrid() {
    let gridDiv = $("<div>");
    root.append(gridDiv);
    gridDiv.addClass(grid + " grid");
  }

  function getCard(imgSrc, titleSrc, releaseSrc, altLabel, altSrc) {
    // imgSrc = data point for game thumbnail
    // titleSrc = data point for game title
    // releaseSrc = data point for game release date
    // altLabel = (boolean) if true label is 'Value' else 'Avg. Score'
    // altSrc = value or game rating data point.
    let thisGrid = $(".grid");
    let newCard = $("<div>");
    let img = $("<img>");
    let title = $("<h3>");
    let release = $("<p>");
    let ratingDiv = $("<div>");
    let ratingLabel = $("<p>");
    let rating = $("<h2>");

    thisGrid.append(newCard);
    newCard.append(img);

    newCard.addClass(card);
    img.addClass(" bg-cover");
    title.addClass(h3 + " mt-4");
    release.addClass(smTxt + " mb-6  text-neu-3");
    rating.addClass(h2);

    newCard.append(title);

    newCard.append(release);
    newCard.append(ratingDiv);
    ratingDiv.append(ratingLabel);

    if (altLabel) {
      ratingLabel.text("Value");
    } else {
      ratingLabel.text("Avg. Score");
    }
    ratingLabel.addClass(" text-sm  text-neu-3");

    ratingDiv.append(rating);

    // data from returned results goes here
    img.attr("src", imgSrc);
    title.text(titleSrc);

    if (!releaseSrc) {
      releaseSrc = "Release: (TBA)";
    }

    release.text(releaseSrc);

    if (!altSrc || altSrc == "N/A") {
      altSrc = "N/A";
      rating.addClass(" text-neu-5");
    }
    rating.text(altSrc);
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
    root.addClass(" flex");

    let greetingDiv = $("<div>");
    let greeting = $("<h1>");
    let subGreeting = $("<h3>");
    let searchField = $("<input>");
    let searchBtn = $("<button>");

    root.append(greetingDiv);
    greetingDiv.addClass(" text-center  m-auto");
    greetingDiv.append(greeting);
    greeting.text("Your next adventure awaits...");
    greeting.addClass(h1 + "  mb-1 ");
    greetingDiv.append(subGreeting);
    subGreeting.text(
      "Search from 1000s of games by title or genre to compare reviews and prices"
    );
    subGreeting.addClass(h3 + "  mb-6");
    greetingDiv.append(searchField);
    searchField.attr({
      placeholder: "Search Title or Genre",
      id: "searchField",
    });
    searchField.addClass(input + " text-center");
    greetingDiv.append(searchBtn);
    searchBtn.text("Show me what you've got!");
    searchBtn.addClass(btn + "  block  mt-4  mx-auto");

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

      $.each(gameData, function (i) {
        let indexer = gameData[i];

        getCard(
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

      gameData.results.reverse(); // reverses the array of search results so the newest game will appear first

      $.each(gameData.results, function (i) {
        let isOfficial = gameData.results[i].added; // The RAWG API has a lot of unofficial data.  This will help us condition if content is legitimate.  We may need to use other keypairs in the object
        let indexer = gameData.results[i];
        if (isOfficial > 10) {
          getCard(
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
