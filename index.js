// LOCAL STORAGE MANUAL SETTING (SINCE NO ADDING WORDS LOGIC PRESENT)

let localStorageSet = false;

if (localStorageSet === false) {
  localStorage.setItem(
    "words",
    JSON.stringify([
      {
        id: 1,
        name: "митинг",
        foreign: "meeting",
        type: "глагол",
        meaning: "Место састанка",
        similar: "чилирање",
      },
      {
        id: 2,
        name: "инфлуенсер",
        foreign: "influencer",
        type: "именица",
        meaning: "Утицајна особа",
        similar: "/",
      },
      {
        id: 3,
        name: "чилирање",
        foreign: "chilling",
        type: "глагол",
        meaning: "Oпуштање",
        similar: "митинг",
      },
      {
        id: 4,
        name: "брифинг",
        foreign: "briefing",
        type: "глагол",
        meaning: "Информисати",
        similar: "/",
      },
      {
        id: 5,
        name: "блог",
        foreign: "blog",
        type: "именица",
        meaning: "Низ текста",
        similar: "интернет",
      },
      {
        id: 6,
        name: "интернет",
        foreign: "internet",
        type: "именица",
        meaning: "Светски систем рачунарских мрежа",
        similar: "блог",
      },
    ])
  );
  if (!localStorage.getItem("matchedWords")) {
    localStorage.setItem("matchedWords", JSON.stringify([]));
  }

  if (!localStorage.getItem("nameContained")) {
    localStorage.setItem("nameContained", JSON.stringify([]));
  }

  if (!localStorage.getItem("similarWords")) {
    localStorage.setItem("similarWords", JSON.stringify([]));
  }

  if (!localStorage.getItem("oftenViewedWords")) {
    localStorage.setItem("oftenViewedWords", JSON.stringify([]));
  }
}

localStorageSet = true;

// GETTING LOCAL STORAGE VALUES

const storedWords = JSON.parse(localStorage.getItem("words"));

const lastStoredWords = storedWords.slice(-6);

let someStoredWords = storedWords.sort(() => 0.5 - Math.random());
someStoredWords = someStoredWords.slice(0, 2);

const storedMatchedWords = JSON.parse(localStorage.getItem("matchedWords"));

const storedNameContainedWords = JSON.parse(
  localStorage.getItem("nameContained")
);

const storedSimilarWords = JSON.parse(localStorage.getItem("similarWords"));

const oftenViewedWords = JSON.parse(localStorage.getItem("oftenViewedWords"));

// SELECTORS

const intro = $(".intro");
const searchLetters = $(".letter");
const searchBtn = $(".search-nav-btn");
const darkModeBtn = $(".dark-mode-nav-btn");
const searchContainer = $(".search-container");
const searchInfo = $(".search-info");
const hamburgerMenu = $(".hamburger-menu");
const hamburgerNav = $(".bot-nav__right__links");
const hamburgerClose = $(".hamburger-menu__close");
const backdrop = $(".backdrop");
const searchInputtedTextBtn = $(".search-btn-find");
const closeSearchContainer = $(".search-btn-close");
const matchedWordsHeader = $(".matched-words-header");
const container = $(".container");
const matchedWords = $(".matched-words");
const similarWords = $(".similar-words");
const lastAddedWords = $(".last-added-words");
const repeatingWords = $(".repeating-words");
const flexContainer = $(".flex-container");
const wordItem = $(".word-item");

const scrollDots1 = $(".scroll-dots1");
const scrollDots2 = $(".scroll-dots2");
const scrollDots3 = $(".scroll-dots3");
const scrollDots4 = $(".scroll-dots4");
const scrollDots5 = $(".scroll-dots5");
const scrollDots6 = $(".scroll-dots6");
const scrollDot1 = $(".scroll-dot1");
const scrollDot2 = $(".scroll-dot2");
const scrollDot3 = $(".scroll-dot3");

const instagram = $(".instagram");
const randomStoredWords = $(".some-stored-words");

// ARRAY STORAGE OF WORDS

const lastSearchedWord = storedWords[storedWords.length - 1];
const lastMatchedWord = storedMatchedWords[storedMatchedWords.length - 1];

const searchLettersArray = [];
const storedWordsArray = [];

for (let i = 0; i < searchLetters.length; i++) {
  searchLettersArray.push(searchLetters[i].innerText.toLowerCase());
}

for (let i = 0; i < storedWords.length; i++) {
  storedWordsArray.push(storedWords[i].name.slice(0, 1));
}

const sameInitials = searchLettersArray.filter((initial) =>
  storedWordsArray.includes(initial)
);

sameInitials.some((initial) => {
  for (i = 0; i < searchLetters.length; i++) {
    if (searchLetters[i].textContent.toLowerCase() == initial) {
      searchLetters[i].style.color = "rgb(255, 100, 0)";
    }
  }
});

// SEARCH CONTAINER SHOW/HIDE HANDLERS

searchBtn.on("click", function () {
  searchContainer.addClass("visible");
  backdrop.addClass("show");
});

hamburgerMenu.on("click", function () {
  hamburgerNav.addClass("bot-nav__right__links--small");
});

hamburgerClose.on("click", function () {
  hamburgerNav.removeClass("bot-nav__right__links--small");
});

// DARK MODE TOGGLER

function darkModeToggler() {
  $(document.body).toggleClass("dark-mode-body");
}

darkModeBtn.on("click", darkModeToggler);

// SEARCH BUTTON HANDLER

searchInputtedTextBtn.on("click", function () {
  const existingWords = JSON.parse(localStorage.getItem("words"));
  localStorage.setItem("similarWords", JSON.stringify([]));
  const searchInputText = $(".search-input").val();
  if (searchInputText.trim().length === 0) {
    searchInfo.removeClass("search-info");
    searchInfo.addClass("show-search-info");
    return;
  } else {
    searchInfo.removeClass("show-search-info");
  }

  if (existingWords.find((word) => word.name.includes(searchInputText))) {
    const storedMatchedWords = JSON.parse(localStorage.getItem("matchedWords"));

    storedMatchedWords.push(searchInputText);

    localStorage.setItem("matchedWords", JSON.stringify(storedMatchedWords));

    storedWords.forEach((word) => {
      if (
        word.name.includes(storedMatchedWords[storedMatchedWords.length - 1])
      ) {
        const nameContained = [];
        nameContained.push(word);
        localStorage.setItem("nameContained", JSON.stringify(nameContained));
      }
    });

    storedWords.forEach((word) => {
      let similarWords = JSON.parse(localStorage.getItem("similarWords"));
      if (word.similar == searchInputText) {
        similarWords = [word];
        localStorage.setItem("similarWords", JSON.stringify(similarWords));
      }
    });

    storedWords.forEach((word) => {
      if (word.name == searchInputText) {
        const oftenViewedWords = JSON.parse(
          localStorage.getItem("oftenViewedWords")
        );

        oftenViewedWords.push(word);
        localStorage.setItem(
          "oftenViewedWords",
          JSON.stringify(oftenViewedWords)
        );
      }
    });

    window.location.href = "/results.html";
  } else {
    window.location.href = "/not-found.html";
  }
});

// ITEM CLICKING HANDLER (SHOULD LEAD TO ANOTHER ROUTE)

function itemClickHandler(event) {
  const itemName = event.currentTarget.children[1].children[1].innerText;

  window.location.href = `/${itemName}.html`;

  storedWords.forEach((word) => {
    if (word.id == event.path[1].id) {
      const oftenViewedWords = JSON.parse(
        localStorage.getItem("oftenViewedWords")
      );

      oftenViewedWords.push(word);
      localStorage.setItem(
        "oftenViewedWords",
        JSON.stringify(oftenViewedWords)
      );
    }
  });
}

// SEARCH CONTAINER BUTTONS

closeSearchContainer.on("click", function () {
  searchContainer.removeClass("visible");
  backdrop.removeClass("show");
});

backdrop.on("click", function () {
  searchContainer.removeClass("visible");
  backdrop.removeClass("show");
});

matchedWordsHeader.text(`Речи које у свом називу садрже "${lastMatchedWord}"`);

// MAPPING DIFFERENT WORDS TO DIFFERENT SECTIONS

mappingHandler(lastStoredWords, lastAddedWords);

mappingHandler(storedNameContainedWords, matchedWords);

mappingHandler(storedSimilarWords, similarWords);

mappingHandler(oftenViewedWords, repeatingWords);

mappingHandler(someStoredWords, randomStoredWords);

function mappingHandler(words, location) {
  if (words.length > 0) {
    return words.map((word) => {
      location.append(
        `<div id=${word.id} class="word-item" onClick=itemClickHandler(event)><img src="./assets/study.jpg"><div class="word-item-bot"><h4>#${word.name}</h4><p>${word.foreign}</p></div></div>`
      );
    });
  }

  location.append(`<p>Нема пронађених речи!</p>`);
}

// COMPARE WIDTH TO ADD OR REMOVE DOTS

function compareWidth(noPaddingWidth) {
  if (
    noPaddingWidth > matchedWords.width() ||
    matchedWords.width() === undefined
  ) {
    scrollDots4.removeClass("dots-shown");
  } else {
    scrollDots4.addClass("dots-shown");
  }

  if (
    noPaddingWidth > similarWords.width() ||
    similarWords.width() === undefined
  ) {
    scrollDots5.removeClass("dots-shown");
  } else {
    scrollDots5.addClass("dots-shown");
  }

  if (
    noPaddingWidth > lastAddedWords.width() ||
    lastAddedWords.width() === undefined
  ) {
    scrollDots1.removeClass("dots-shown");
  } else {
    scrollDots1.addClass("dots-shown");
  }

  if (
    noPaddingWidth > repeatingWords.width() ||
    repeatingWords.width() === undefined
  ) {
    scrollDots2.removeClass("dots-shown");
  } else {
    scrollDots2.addClass("dots-shown");
  }

  if (
    noPaddingWidth > randomStoredWords.width() ||
    randomStoredWords.width() === undefined
  ) {
    scrollDots3.removeClass("dots-shown");
  } else {
    scrollDots3.addClass("dots-shown");
  }
}

window.addEventListener("load", () => {
  const documentWidth = $(document).width();
  const containerWidth = container.width();
  const containerPadding = container.outerWidth() - containerWidth;
  const noPaddingWidth = documentWidth - containerPadding;
  compareWidth(noPaddingWidth);
});

window.addEventListener("resize", () => {
  const documentWidth = $(document).width();
  const containerWidth = container.width();
  const containerPadding = container.outerWidth() - containerWidth;
  const noPaddingWidth = documentWidth - containerPadding;

  compareWidth(noPaddingWidth);
});

// EACH SEPARATE WORDS SECTION SCROLLING LOGIC (NOT COMPLETE)

flexContainer.on("scroll", function (event) {
  const currentWidth = flexContainer.scrollLeft();
  console.log(event);

  if (currentWidth >= 0 && currentWidth <= 150) {
    scrollDot1.addClass("dot-active");
    scrollDot2.removeClass("dot-active");
    scrollDot3.removeClass("dot-active");
  } else if (currentWidth >= 150 && currentWidth <= 300) {
    scrollDot1.removeClass("dot-active");
    scrollDot2.addClass("dot-active");
    scrollDot3.removeClass("dot-active");
  } else {
    scrollDot1.removeClass("dot-active");
    scrollDot2.removeClass("dot-active");
    scrollDot3.addClass("dot-active");
  }
});
