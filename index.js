localStorage.setItem(
  "words",
  JSON.stringify([
    {
      name: "митинг",
      foreign: "influencer",
      type: "именица",
      meaning: "Утицајна особа",
      similar: "чилирање",
    },
    {
      name: "чилирање",
      foreign: "chilling",
      type: "глагол",
      meaning: "Oпуштање",
      similar: "митинг",
    },
    {
      name: "брифинг",
      foreign: "briefing",
      type: "глагол",
      meaning: "Информисати",
      similar: "/",
    },
    {
      name: "блог",
      foreign: "blog",
      type: "именица",
      meaning: "Низ текста",
      similar: "интернет",
    },
    {
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

const storedWords = JSON.parse(localStorage.getItem("words"));
const storedMatchedWords = JSON.parse(localStorage.getItem("matchedWords"));

storedMatchedWords.forEach((word) => {
  if (word.name === storedWords.similar) {
    const similarWords = [];
    similarWords.push(word);
    localStorage.setItem("similarWords", similarWords);
  }
});

const searchBtn = $(".search");
const searchContainer = $(".search-container");
const backdrop = $(".backdrop");
const searchInputtedTextBtn = $(".search-btn-find");
const closeSearchContainer = $(".search-btn-close");
const matchedWords = $(".matched-words");
const lastAddedWords = $(".last-added-words");

const lastSearchedWord = storedWords[storedWords.length - 1];
const lastMatchedWord = storedMatchedWords[storedMatchedWords.length - 1];

searchBtn.on("click", function () {
  searchContainer.addClass("visible");
  backdrop.addClass("show");
});

searchInputtedTextBtn.on("click", function () {
  const existingWords = JSON.parse(localStorage.getItem("words"));
  const searchInputText = $(".search-input").val();
  if (existingWords.find((word) => word.name === searchInputText)) {
    const storedMatchedWords = JSON.parse(localStorage.getItem("matchedWords"));

    storedMatchedWords.push(searchInputText);

    localStorage.setItem("matchedWords", JSON.stringify(storedMatchedWords));
    window.location.href = "/results.html";
  } else {
    window.location.href = "/not-found.html";
  }
});

closeSearchContainer.on("click", function () {
  searchContainer.removeClass("visible");
  backdrop.removeClass("show");
});

backdrop.on("click", function () {
  searchContainer.removeClass("visible");
  backdrop.removeClass("show");
});

matchedWords.text(`Речи које у свом називу садрже ${lastMatchedWord}`);

storedWords.map((word) => {
  lastAddedWords.append(
    `<div class="last-word-item"><img src="./assets/study.jpg"><div><h4>#${word.name}</h4><p>${word.foreign}</p></div></div>`
  );
});
