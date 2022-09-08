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

const storedWords = JSON.parse(localStorage.getItem("words"));
const storedMatchedWords = JSON.parse(localStorage.getItem("matchedWords"));

const storedNameContainedWords = JSON.parse(
  localStorage.getItem("nameContained")
);

const storedSimilarWords = JSON.parse(localStorage.getItem("similarWords"));
const oftenViewedWords = JSON.parse(localStorage.getItem("oftenViewedWords"));

const intro = $(".intro");
const searchLetters = $(".letter");
const searchBtn = $(".search-nav-btn");
const darkModeBtn = $(".dark-mode-nav-btn");
const searchContainer = $(".search-container");
const hamburgerMenu = $(".hamburger-menu");
const hamburgerNav = $(".bot-nav__right__links");
const hamburgerClose = $(".hamburger-menu__close");
const backdrop = $(".backdrop");
const searchInputtedTextBtn = $(".search-btn-find");
const closeSearchContainer = $(".search-btn-close");
const matchedWordsHeader = $(".matched-words-header");
const matchedWords = $(".matched-words");
const similarWords = $(".similar-words");
const lastAddedWords = $(".last-added-words");
const wordItem = $(".word-item");

const repeatingWords = $(".repeating-words");
const instagram = $(".instagram");

const lastSearchedWord = storedWords[storedWords.length - 1];
const lastMatchedWord = storedMatchedWords[storedMatchedWords.length - 1];

const searchLettersArray = [];
const storedWordsArray = [];

for (let i = 0; i < searchLetters.length; i++) {
  searchLettersArray.push(searchLetters[i].innerText.toLocaleLowerCase());
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
      searchLetters[i].style.color = "orange";
    }
  }
});

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

function darkModeToggler() {
  $(document.body).toggleClass("dark-mode-body");
}

darkModeBtn.on("click", darkModeToggler);

searchInputtedTextBtn.on("click", function () {
  const existingWords = JSON.parse(localStorage.getItem("words"));
  localStorage.setItem("similarWords", JSON.stringify([]));
  const searchInputText = $(".search-input").val();
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

function itemClickHandler(event) {
  window.location.href = `/item-detail${event.path[1].id}.html`;

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

closeSearchContainer.on("click", function () {
  searchContainer.removeClass("visible");
  backdrop.removeClass("show");
});

backdrop.on("click", function () {
  searchContainer.removeClass("visible");
  backdrop.removeClass("show");
});

matchedWordsHeader.text(`Речи које у свом називу садрже ${lastMatchedWord}`);

mappingHandler(storedWords, lastAddedWords);

mappingHandler(storedNameContainedWords, matchedWords);

mappingHandler(storedSimilarWords, similarWords);

mappingHandler(oftenViewedWords, repeatingWords);

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
