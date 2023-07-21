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
  });

  iveReviewedBtn.on("click", function () {
    console.log("this renders games ive reviewed");
  });

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
      id: "searchField"
    });
    greetingDiv.append(searchBtn);
    searchBtn.text("Show me what you've got!");

    searchBtn.on("click", getGame);
  }

  landingPage();
});
