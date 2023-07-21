$(function () {
  let body = $("body");
  let root = $("#root");

  function landingPage() {
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
  }

  landingPage();
});
