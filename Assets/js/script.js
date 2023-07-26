const h1 = " tw-text-h1 tw-font-bold tw-text-neu-0 ";
const h2 = " tw-text-h2 tw-font-bold tw-text-neu-0 ";
const h3 = " tw-text-h3 tw-font-semibold tw-text-neu-0 ";
const h4 = " tw-text-h4 tw-font-medium tw-text-neu-0 ";

const smTxt = " tw-text-sm tw-text-neu-0 ";

const btn =
  " tw-bg-pri-5 tw-rounded tw-px-4 tw-py-3 tw-h-10 tw-cursor-pointer hover:tw-bg-pri-9 " +
  h4;
const input =
  " tw-bg-neu-8 tw-text-neu-0 tw-h-10 tw-rounded tw-px-3 tw-mr-4 tw-w-80 ";

const grid = " tw-grid tw-grid-cols-auto tw-gap-4 ";
const card =
  " tw-p-4 tw-text-neu-0 tw-bg-neu-8 tw-rounded-lg hover:tw-bg-opac-pri hover:tw-border-pri-5 hover:tw-border-2 ";

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
    root.removeClass("tw-flex");
    root.addClass(
      " tw-mt-14 tw-block tw-bg-cover tw-bg-no-repeat tw-p-8 tw-bg-neu-9 tw-bg-none "
    );
  }

  function getCard(imgSrc, titleSrc, releaseSrc, altLabel, altSrc) {
    // imgSrc = data point for game thumbnail
    // titleSrc = data point for game title
    // releaseSrc = data point for game release date
    // altLabel = (boolean) if true label is 'Value' else 'Avg. Score'
    // altSrc = value or game rating data point.
    let thisGrid = $(".tw-grid");
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
    img.addClass("tw-bg-cover");
    title.addClass(h3 + "tw-mt-4");
    release.addClass(smTxt + "tw-mb-6 tw-text-neu-3");
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
    ratingLabel.addClass("tw-text-sm tw-text-neu-3");

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
      rating.addClass("tw-text-neu-5");
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
    root.addClass("tw-flex");

    let greetingDiv = $("<div>");
    let greeting = $("<h1>");
    let subGreeting = $("<h3>");
    let searchField = $("<input>");
    let searchBtn = $("<button>");

    root.append(greetingDiv);
    greetingDiv.addClass("tw-text-center tw-m-auto");
    greetingDiv.append(greeting);
    greeting.text("Your next adventure awaits...");
    greeting.addClass(h1 + " tw-mb-1 ");
    greetingDiv.append(subGreeting);
    subGreeting.text(
      "Search from 1000s of games by title or genre to compare reviews and prices"
    );
    subGreeting.addClass(h3 + " tw-mb-6");
    greetingDiv.append(searchField);
    searchField.attr({
      placeholder: "Search Title or Genre",
      id: "searchField",
    });
    searchField.addClass(input + "tw-text-center");
    greetingDiv.append(searchBtn);
    searchBtn.text("Show me what you've got!");
    searchBtn.addClass(btn + " tw-block tw-mt-4 tw-mx-auto");

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
    root.addClass("");
    searchBarDiv.append(searchField);
    searchBarDiv.append(searchBtn);
    searchBtn.text("Go!");
    searchField.attr({
      placeholder: "Search Title or Genre",
      id: "searchField",
    });
    searchField.addClass(input);
    searchBtn.addClass(btn);
    searchBarDiv.addClass("tw-flex tw-mb-4");

    searchBtn.on("click", getSearchResults);
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

    let gridDiv = $("<div>");
    root.append(gridDiv);
    gridDiv.addClass(grid);

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
      console.log(gameData);

      let freeGamesDiv = $("<div>");
      root.append(freeGamesDiv);
      freeGamesDiv.addClass(grid);

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

      let searchBarDiv = $("<div>");
      let searchField = $("<input>");
      let searchBtn = $("<button>");

      searchField.addClass(input);
      searchBtn.addClass(btn);
      searchBarDiv.addClass("tw-flex tw-mb-4");

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

      let gridDiv = $("<div>");
      root.append(gridDiv);
      gridDiv.addClass(grid);

      gameData.results.reverse(); // reverses the array of search results so the newest game will appear first

      $.each(gameData.results, function (i) {
        let isOfficial = gameData.results[i].added; // The RAWG API has a lot of unofficial data.  This will help us condition if content is legitimate.  We may need to use other keypairs in the object
        let indexer = gameData.results[i];
        if (isOfficial > 10) {
          getCard(
            indexer.background_image,
            indexer.name,
            indexer.released,
            false,
            indexer.metacritic
          );
        }
      });
    });
  }

  landingPage(); // renders the landing page on load
});
