$(function () {
  let body = $("body");
  let nav = $("nav");
  let root = $("#root");

  // nav bar listeners
  let returnToLandingBtn = nav.children().eq(0);
  let searchHistoryBtn = nav.children().eq(1).children().eq(0);
  let iveReviewedBtn = nav.children().eq(1).children().eq(1);

  returnToLandingBtn.on("click", function () {
    console.log("this renders the landing page");
    landingPage();
  });

  searchHistoryBtn.on("click", function () {
    console.log("this renders my search history");
    searchHistory();
  });

  iveReviewedBtn.on("click", function () {
    console.log("this renders games ive reviewed");
  });

  // renders landing page
  function landingPage() {
    root.text(""); // clears root before rendering.
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
    });
    greetingDiv.append(searchBtn);
    searchBtn.text("Show me what you've got!");

    searchBtn.on("click", function () {
      console.log("this will search");
    });
  }

  // listener for history cards - temporily prints game title in console - will eventually render that games info page.
  root.on("click", ".historyCard", function () {
    let title = $(this).children().eq(1).text();
    console.log(title);
  });

  // renders the Search history (UI only) when nav link is clicked
  function searchHistory() {
    // resets root
    root.text("");
    root.css("background", "none");

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
    historyCardDiv.addClass("historyCardDiv");

    // creates a historyCard for every item stored in the array
    $.each(tempArray, function (i) {
      let card = $("<div>");
      let img = $("<img>");
      let title = $("<h3>");
      let release = $("<p>");
      let ratingDiv = $("<div>");
      let ratingLabel = $('<p class="small-body">Avg. score</p>');
      let rating = $("<h2>");

      historyCardDiv.append(card);
      card.addClass("historyCard");
      card.append(img);
      img.attr("src", tempArray[i].image);
      card.append(title);
      title.text(tempArray[i].name);
      card.append(release);
      release.addClass("small-body release");
      release.text(tempArray[i].release);
      card.append(ratingDiv);
      ratingDiv.append(ratingLabel);
      ratingDiv.append(rating);
      rating.text(tempArray[i].rating);
    });
  }

  landingPage(); // renders the landing page on load
});
