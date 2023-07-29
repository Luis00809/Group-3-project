// common tailwind styles / space is added at beginning and end of string so additional styles can be added after each instance
const h1 = " text-h1  font-bold  text-neu-0 ";
const h2 = " text-h2  font-bold  text-neu-0 ";
const h3 = " text-h3  font-semibold  text-neu-0 ";
const h4 = " text-h4  font-medium  text-neu-0 ";
const smTxt = " text-sm  text-neu-0 ";
const mdTxt = " text-med text-neu-0 ";
const lgTxt = " text-lg text-neu-0 ";
const btn =
<<<<<<< HEAD
	" bg-pri-5  rounded  px-4  py-3  h-10  cursor-pointer  hover:bg-pri-9 " + h4;
=======
  " bg-pri-5  rounded  px-4  py-3  h-10  cursor-pointer hover:bg-pri-9 " + h4 ;
>>>>>>> e56250a (fix merge)
const input =
	" bg-neu-8  text-neu-0  h-10  rounded  px-3  mr-4  w-80 outline-none outline-offset-[-2px] focus:outline-pri-5 ";
const grid = " grid  grid-cols-auto  gap-4 ";
const card =
<<<<<<< HEAD
	" card p-4 text-neu-0  bg-neu-8  rounded-lg shadow-md cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_25px_-5px] hover:shadow-pri-5 ";

=======
  " card p-4 text-neu-0  bg-neu-8  rounded-lg shadow-md cursor-pointer hover:scale-[1.02] hover:shadow-[0_0_25px_-5px] hover:shadow-pri-5 ";
 
>>>>>>> e56250a (fix merge)
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
	function getCard(
		id,
		imgSrc,
		titleSrc,
		releaseSrc,
		altLabel,
		altSrc,
		timeBool,
		timeSrc
	) {
		// imgSrc = data point for game thumbnail
		// titleSrc = data point for game title
		// releaseSrc = data point for game release date
		// altLabel = (string) the label for the data point.
		// altSrc = value or game rating data point.
		// timeBool = (boolean) used for free games to add another line item for givaway end date
		// timeSrc = value of the end date.
		let newCard = $("<div>");
		let img = $("<img>");
		let title = $("<h3>");
		let release = $("<p>");
		let altDiv = $("<div>");
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
		newCard.append(altDiv);
		altDiv.append(ratingDiv);
		ratingDiv.append(ratingLabel);
		ratingDiv.append(rating);

		// sets styles for card
		newCard.addClass(card);
		img.addClass("w-full  h-52 object-cover");
		title.addClass(h3 + " mt-4");
		release.addClass(smTxt + " mb-6  text-neu-3");
		altDiv.addClass("flex ");
		rating.addClass(h2);
		ratingLabel.addClass(" text-sm  text-neu-3");

		// conditional for release date text
		if (!releaseSrc) {
			releaseSrc = "Release: (TBA)";
		}

		if (altSrc == "N/A") {
			rating.addClass(" text-neu-3 ");
		}

		if (timeBool) {
			let timeDiv = $("<div>");
			let timeLabel = $("<p>");
			let timeLeft = $("<h2>");

			altDiv.append(timeDiv);
			timeDiv.append(timeLabel);
			timeDiv.append(timeLeft);

			timeDiv.addClass("text-right ml-auto");
			timeLabel.addClass(" text-sm  text-neu-3");
			timeLeft.addClass(h2);

			timeLabel.text("Giveaway ends");

<<<<<<< HEAD
			if (!timeSrc || timeSrc == "N/A") {
				timeSrc = "N/A";
				timeLeft.addClass("text-neu-5");
				timeLeft.text(timeSrc);
			} else {
				timeLeft.text(formatReleaseDate(timeSrc));
			}
		}
=======
      if (!timeSrc || timeSrc == "N/A") {
        timeSrc = "N/A";
        timeLeft.addClass("text-neu-5");
        timeLeft.text(timeSrc);
      } else {
        timeLeft.text(formatDate(timeSrc));
      }
    }
>>>>>>> 9ad6903 (adds date of review to localStorage Logic)

		// data from returned results goes here
		img.attr("src", imgSrc);
		title.text(titleSrc);
		release.text(releaseSrc);
		ratingLabel.text(altLabel);
		rating.text(altSrc);
	}

	// listener for cards - temporily prints game title in console - will eventually render that games info page.
	root.on("click", ".card", function () {
		let id = $(this).children("#id").text();
		let title = $(this).children().eq(2).text();
		saveToLocalStorage(id, title);
		console.log(title);
 
		getCardData(id,title);
	});

<<<<<<< HEAD
  function getCardData(id,title) {
		clearDom();
=======
  // converts realease received from RAWG to "Jan 2023 format"
  function formatDate(u) {
    const releaseUnix = Date.parse(u);
    const date = new Date(releaseUnix);
    const options = { month: "short", day: "numeric", year: "numeric" };
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
          existingViewedGames.findIndex(
            (v) => v == JSON.stringify(thisGame)
          ) /* + 1 */,
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
    // id = RAWG id for recollecting game data later
    let dateOfReview = formatDate(new Date());

    let thisReview = {
      thisId: id,
      thisTitle: title,
      thisScore: score,
      thisComment: comment,
      thisDate: dateOfReview,
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

  // TEMPORARY FUNCTION TO TEST REVIEWED GAMES
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
  // TEMPORARY FUNCTION TO TEST REVIEWED GAMES

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
>>>>>>> fa0f57a (fixed function that was accidentally renamed)
    getGrid();
		root.css({
			backgroundImage:
				"linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://images8.alphacoders.com/954/thumb-1920-954028.jpg)",
		});
		getGame(title).then(function (gameData) {
			$.each(gameData.results, function (y) {
				let x = gameData.results[y];
				let thisScore = x.metacritic;

<<<<<<< HEAD
<<<<<<< HEAD
				// conditional for altScr text
				if (!thisScore || thisScore == "N/A") {
					thisScore = "N/A";
				} else {
					thisScore = thisScore + "/100";
				}
        console.log(x.id)
				// only display that title if the id from RAWG matches the one we stored...
				if (x.id == id) {
					//then print that card
					getCard(
						x.id,
						x.background_image,
						x.name,
						formatReleaseDate(x.released),
						"Metacritic score",
						thisScore
					);
				}
			});
		});
	};
  
=======
    // Displays message or 
    
=======
    // Displays message or

>>>>>>> abf1bb3 (adds my review logic when a page renders that has a review in the past)
    // gets localStorage 'myReviews' and parses to an array
    let myReviews = JSON.parse(localStorage.getItem("myReviews"));

    if (!myReviews) {
      emptyStateReview();
      console.log("please add a review");
      return;
    }

<<<<<<< HEAD
>>>>>>> 9467f45 (added function to display message when the history and the review pages are empty)
=======
    myReviews.reverse();
>>>>>>> abf1bb3 (adds my review logic when a page renders that has a review in the past)



<<<<<<< HEAD
=======
          // only display that title if the id from RAWG matches the one we stored...
          if (x.id == indexer.thisId) {
            getCard(
              x.id,
              x.background_image,
              x.name,
              "Reviewed on: " + indexer.thisDate,
              "My Score",
              indexer.thisScore + "/10"
            );
          }
        });
      });
    });
  }
>>>>>>> 9ad6903 (adds date of review to localStorage Logic)

<<<<<<< HEAD
	// converts realease received from RAWG to "Jan 2023 format"
	function formatReleaseDate(u) {
		const releaseUnix = Date.parse(u);
		const date = new Date(releaseUnix);
		const options = { month: "short", day: "numeric", year: "numeric" };
		const formattedDate = date.toLocaleString("en-US", options);
		return formattedDate;
	}
=======
  //renders Stuff I've Reviewed Page when nav link is clicked
<<<<<<< HEAD
function getReviewed(){
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
  ]
>>>>>>> 273269d (fix)
=======
  function searchHistory() {
    clearDom();
    getSearchBar();
    getGrid();
>>>>>>> fa0f57a (fixed function that was accidentally renamed)

<<<<<<< HEAD
	function saveToLocalStorage(id, title) {
		let thisGame = {
			thisId: id,
			thisTitle: title,
		};
=======
    // gets localStorate 'viewedGames' and parse to an array
    let history = JSON.parse(localStorage.getItem("viewedGames"));

    if (!history) {
      emptyStateHistory();
      console.log("please search something");
      return;
    }

    history.reverse();

    // for each item in history...
    $.each(history, function (i) {
      let indexer = history[i];
>>>>>>> 9467f45 (added function to display message when the history and the review pages are empty)

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

<<<<<<< HEAD
	// when the review form is done we can plug in the data with this function
	function saveReviewToLocal(id, title, score, comment) {
		// id = RAWG id for recollecting game data later
		let thisReview = {
			thisId: id,
			thisTitle: title,
			thisScore: score,
			thisComment: comment,
		};
=======
          // only display that title if the id from RAWG matches the one we stored...
          if (x.id == indexer.thisId) {
            //then print that card
            getCard(
              x.id,
              x.background_image,
              x.name,
              formatDate(x.released),
              "Metacritic score",
              thisScore
            );
          }
        });
      });
    });
  }
>>>>>>> 9ad6903 (adds date of review to localStorage Logic)

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

	// TEMPORARY FUNCTION TO TEST REVIEWED GAMES
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
	// TEMPORARY FUNCTION TO TEST REVIEWED GAMES

<<<<<<< HEAD
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
=======
      $.each(gameData, function (i) {
        let indexer = gameData[i];
        getCard(
          indexer.id,
          indexer.thumbnail,
          indexer.title,
          formatDate(indexer.published_date),
          "Value",
          indexer.worth,
          true,
          indexer.end_date
        );
      });
    });
  }
>>>>>>> 9ad6903 (adds date of review to localStorage Logic)

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
		let greetingDiv = $("<div>");
		let greeting = $("<h1>");
		let subGreeting = $("<h3>");
		let searchField = $("<input>");
		let searchBtn = $("<button>");
=======




  // still need to find proper place to add eventlistener to 
=======
  // still need to find proper place to add eventlistener to
>>>>>>> fa0f57a (fixed function that was accidentally renamed)
  // need to take in game data for text value
  // modalBtn.on('click', function(){
  //   displayModal();
  // })
=======
>>>>>>> e56250a (fix merge)



  let modalBtn = nav.children().eq(1).children().eq(3);
  // still need to find proper place to add eventlistener to 
  // need to take in game data for text value
  modalBtn.on('click', function(){
    displayModal();
  })

  
  function displayModal() {
    let cardContainer = $("<div>");
    // where to append the card container? should I clear the display or just append to root? body?
    cardContainer.addClass(
      "card p-4 text-neu-0 bg-neu-9 rounded-lg shadow-md cursor-pointer hover:scale-[1.02]"
    );
    cardContainer.css({
      width: "35%",
      top: "50%",
      left: "50%",
      "z-index": "20",
      tranform: "translate(-50%, -50%)",
      position: "fixed",
      up: "50px",
    });
    $("body").append(cardContainer);

    let headingDiv = $("<div>");
    headingDiv.css({
      display: "flex",
      "justify-content": "space-between",
      "padding-bottom": "20px",
    });
    cardContainer.append(headingDiv);

    let gameTitle = $("<h3>");
    gameTitle.text("Game Name");
    headingDiv.append(gameTitle);

    let exitBtn = $("<button>");
    exitBtn.attr("id", "exitBtn");
    exitBtn.text("\u00D7");
    headingDiv.append(exitBtn);
    $(document).on("click", "#exitBtn", function () {
      if (cardContainer && overlay) {
        cardContainer.remove();
        overlay.remove();
      }
      console.log("exit");
    });

    let developer = $("<p>");
    developer.addClass("text-sm text-neu-0 mb-6 text-neu-3");
    developer.text("Developer: ");
    cardContainer.append(developer);

    let myScore = $("<p>");
    myScore.addClass("text-sm text-neu-0 mb-1 text-neu-3");
    myScore.text("My Score: ");
    cardContainer.append(myScore);

     
    let buttonContainer = $('<div>');
    buttonContainer.css({
      'display': 'flex',
      'justify-content': 'space-evenly'
    })

    let buttons = [];

    for (let i = 1; i <= 10; i++){
      let button = $('<button>');
      button.text(i);
      button.addClass("bg-neu-8 rounded mb-4 px-4 py-3 h-10 cursor-pointer hover:bg-pri-9");
      buttons.push(button);
      
      // this event listener mimicks a radio-button
      button.on('click', function() {
        buttons.forEach(btn => btn.removeClass('bg-pri-5'));
        $(this).addClass('bg-pri-5');
      });
  
  buttonContainer.append(button);
}
    cardContainer.append(buttonContainer)

    let textarea = $('<textarea>');
    textarea.attr('placeholder', 'My Notes');
    textarea.addClass(' bg-neu-8 text-neu-0 h-10 rounded px-3 mr-4 w-40 ')
    cardContainer.append(textarea);

    let buttonDivs = $("<div>");
    buttonDivs.css({
      display: "flex",
      "justify-content": "space-between",
      "padding-top": "20px",
    });
    let deleteBtn = $("<button>");
    // deleteBtn.addClass('hover:bg-pri-9')
    deleteBtn.css({
      color: "red",
    });
    deleteBtn.text("Delete Review");
    buttonDivs.append(deleteBtn);

    let savebtn = $("<button>");
    savebtn.addClass(
      "bg-pri-5 rounded px-4 py-3 h-10 cursor-pointer hover:bg-pri-9 text-h4 font-medium text-neu-0"
    );
    savebtn.text("Save");
    buttonDivs.append(savebtn);

    cardContainer.append(buttonDivs);

    let overlay = $("<div>");
    overlay.css({
      "pointer-events": "all",
      "background-color": "rgba(0, 0, 0, .5)",
      "z-index": "30",
    });
    overlay.text("hello");
    $("body").append(overlay);
  }

  // prints search results on page
  function getSearchResults() {
    getGame($("#searchField").val()).then(function (gameData) {
      // gets Promise from getGame() and loads page when fullfilled.
      clearDom();
      getSearchBar();
      getGrid();
>>>>>>> 273269d (fix)

		root.append(greetingDiv);
		greetingDiv.append(greeting);
		greetingDiv.append(subGreeting);
		greetingDiv.append(searchField);
		greetingDiv.append(searchBtn);

<<<<<<< HEAD
		greeting.text("Your next adventure awaits...");
		subGreeting.text(
			"Search from 1000s of games by title or genre to compare reviews and prices"
		);
		searchField.attr({
			placeholder: "Search Title or Genre",
			id: "searchField",
		});
		searchBtn.text("Show me what you've got!");
=======
      $.each(gameData.results, function (i) {
        let isOfficial = gameData.results[i].added; // The RAWG API has a lot of unofficial data.  This will help us condition if content is legitimate.  We may need to use other keypairs in the object
        let indexer = gameData.results[i];
        let thisScore = indexer.metacritic;
>>>>>>> 273269d (fix)

		greetingDiv.addClass(" text-center  m-auto");
		greeting.addClass(h1 + "  mb-1 ");
		subGreeting.addClass(h3 + "  mb-6");
		searchField.addClass(input + " text-center");
		searchBtn.addClass(btn + "  block  mt-4  mx-auto");

<<<<<<< HEAD
		searchBtn.on("click", getSearchResults);
	}

	//renders Stuff I've Reviewed Page when nav link is clicked
	function getReviewed() {
		clearDom();
		getSearchBar();
		getGrid();

		// gets localStorage 'myReviews' and parses to an array
		let myReviews = JSON.parse(localStorage.getItem("myReviews"));
		myReviews.reverse();

		// creates a reviewed game for every item stored in the array
		$.each(myReviews, function (i) {
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
							"My Score",
							indexer.thisScore + "/10"
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
					let thisScore = x.metacritic;

					// conditional for altScr text
					if (!thisScore || thisScore == "N/A") {
						thisScore = "N/A";
					} else {
						thisScore = thisScore + "/100";
					}

					// only display that title if the id from RAWG matches the one we stored...
					if (x.id == indexer.thisId) {
						//then print that card
						getCard(
							x.id,
							x.background_image,
							x.name,
							formatReleaseDate(x.released),
							"Metacritic score",
							thisScore
						);
					}
				});
			});
		});
	}

	function getFreeGames() {
		freeGames().then(function (gameData) {
			clearDom();

			let heading = $('<h1 class="' + h2 + '">Free Games & DLC!</h1>');
			let subHeading = $(
				'<p class="' +
					mdTxt +
					' text-neu-3 ">The following items are currenty available for download for free on Steam<p>'
			);

			root.append(heading);
			root.append(subHeading);

			subHeading.addClass(" mb-4");

			getGrid();
			console.log(gameData);

			$.each(gameData, function (i) {
				let indexer = gameData[i];
				getCard(
					indexer.id,
					indexer.thumbnail,
					indexer.title,
					formatReleaseDate(indexer.published_date),
					"Value",
					indexer.worth,
					true,
					indexer.end_date
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
				let thisScore = indexer.metacritic;

				// conditional for altScr text
				if (!thisScore || thisScore == "N/A") {
					thisScore = "N/A";
				} else {
					thisScore = thisScore + "/100";
				}

				if (isOfficial > 10) {
					getCard(
						indexer.id,
						indexer.background_image,
						indexer.name,
						formatReleaseDate(indexer.released),
						"Metacritic Score",
						thisScore,
						false
					);
				}
			});
		});
	}

	landingPage(); // renders the landing page on load
=======
        if (isOfficial > 10) {
          getCard(
            indexer.id,
            indexer.background_image,
            indexer.name,
            formatDate(indexer.released),
            "Metacritic Score",
            thisScore,
            false
          );
        }
      });
    });
  }

  // renders message when reviews page has no data saved to local storage
  function emptyStateReview() {
    let messageDiv = $("<div>");
    let message = $("<h2>");
    let subMessage = $("<h4>");

    root.append(messageDiv);
    messageDiv.append(message);
    messageDiv.append(subMessage);

    messageDiv.addClass(" text-center  mt-4 ");
    message.addClass(h2 + "  mb-1 ");
    subMessage.addClass(h4);

    message.text("Looks like you need to write some reviews!");
    subMessage.text(
      "Go ahead, search your favorite game and give it a review!"
    );
  }

  // renders message when history page has no data saved to local storage
  function emptyStateHistory() {
    let messageDiv = $("<div>");
    let message = $("<h2>");
    let subMessage = $("<h4>");

    root.append(messageDiv);
    messageDiv.append(message);
    messageDiv.append(subMessage);

    messageDiv.addClass(" text-center  mt-4 ");
    message.addClass(h2 + "  mb-1 ");
    subMessage.addClass(h4);

    message.text("You haven't searched anything yet?");
    subMessage.text("Games you search for will hang out here on this page.");
  }

  // call this function in the single title page and pass in the id
  function isGameReviewed(paramId) {
    clearDom(); // remove this when added to single title screen
    let myReviews = JSON.parse(localStorage.getItem("myReviews"));

    $.each(myReviews, function (i) {
      let x = myReviews[i];

      if (x.thisId == paramId) {
        printReview(x.thisTitle, "Jul 28, 2023", x.thisComment, x.thisScore);

        function printReview(title, date, notes, score) {
          // elements to be rendered
          let reviewCard = $("<div>");
          let headerDiv = $("<div>");
          let titleDiv = $("<div>");
          let titleText = $("<h1>");
          let reviewDate = $("<p>");
          let editBtn = $("<button>");
          let bodyDiv = $("<div>");
          let notesDiv = $("<div>");
          let notesLabel = $("<h3>");
          let notesText = $("<p>");
          let scoreDiv = $("<div>");
          let scoreTextDiv = $("<div>");
          let scoreValueText = $("<h1>");
          let scoreOutOfText = $("<h3>");
          let scoreBarDiv = $("<div>");
          let scoreValue = $("<div>");

          root.append(reviewCard);
          reviewCard.addClass("p-4 bg-neu-8 rounded-lg");

          // HEADER DIV SECTION
          reviewCard.append(headerDiv);
          headerDiv.append(titleDiv);
          titleDiv.append(titleText);
          titleDiv.append(reviewDate);
          headerDiv.append(editBtn);

          headerDiv.addClass("flex mb-8");
          titleText.addClass(h1 + "mr-4 mb-1");
          reviewDate.addClass(lgTxt + "text-neu-3");
          editBtn.addClass(btn + " ml-auto ");

          titleText.text("My review of " + title);
          reviewDate.text("Reviewed on: " + date);
          editBtn.text("Edit My Review");

          // BODY DIV SECTION
          reviewCard.append(bodyDiv);
          bodyDiv.append(notesDiv);
          notesDiv.append(notesLabel);
          notesDiv.append(notesText);
          bodyDiv.append(scoreDiv);
          scoreDiv.append(scoreTextDiv);
          scoreTextDiv.append(scoreValueText);
          scoreTextDiv.append(scoreOutOfText);
          scoreDiv.append(scoreBarDiv);
          scoreBarDiv.append(scoreValue);

          bodyDiv.addClass("flex");
          notesDiv.addClass("mr-4 w-full");
          notesLabel.addClass(h3 + " mb-2");
          notesText.addClass(mdTxt);
          scoreDiv.addClass("center p-8 w-full grid place-items-center");
          scoreTextDiv.addClass("flex mb-6");
          scoreValueText.addClass(h1);
          scoreOutOfText.addClass(h3 + " text-neu-3 mt-auto mb-1");
          scoreBarDiv
            .attr({ id: "scoreBarDiv" })
            .addClass("bg-neu-7 w-full h-10 rounded-lg overflow-hidden");
          scoreValue.addClass("bg-pri-5 w-full h-full");

          notesLabel.text("My Notes");
          notesText.text(notes);
          scoreValueText.text(score);
          scoreOutOfText.text("/10");

          // logic to get chart proportions
          let inputScore = parseInt(score); // parse score to a number
          let barWidth = $("#scoreBarDiv").width(); // gets the width of the bar which changes at different view ports
          let scoreBarValue = barWidth - (barWidth / 10) * inputScore; // calculates what the right padding should be
          scoreBarDiv.css("padding-right", scoreBarValue + "px"); // sets the right padding the offsets the bar to communicate the score
        }
      }
    });
  }

  landingPage(); // renders the landing page on load
<<<<<<< HEAD
<<<<<<< HEAD
>>>>>>> 273269d (fix)
=======
  // testPrint(24182); // Test prints the my review seciton
>>>>>>> abf1bb3 (adds my review logic when a page renders that has a review in the past)
=======
  // isGameReviewed(24182); // Test prints the my review seciton
>>>>>>> 9ad6903 (adds date of review to localStorage Logic)
});
