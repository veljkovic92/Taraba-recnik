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
console.log(storedNameContainedWords);

const storedSimilarWords = JSON.parse(localStorage.getItem("similarWords"));
const oftenViewedWords = JSON.parse(localStorage.getItem("oftenViewedWords"));

const searchBtn = $(".search");
const searchContainer = $(".search-container");
const backdrop = $(".backdrop");
const searchInputtedTextBtn = $(".search-btn-find");
const closeSearchContainer = $(".search-btn-close");
const matchedWordsHeader = $(".matched-words-header");
const matchedWords = $(".matched-words");
const similarWords = $(".similar-words");
const lastAddedWords = $(".last-added-words");
const wordItem = $(".last-word-item");
const repeatingWords = $(".repeating-words");
const instagram = $(".instagram");

const lastSearchedWord = storedWords[storedWords.length - 1];
const lastMatchedWord = storedMatchedWords[storedMatchedWords.length - 1];

searchBtn.on("click", function () {
  searchContainer.addClass("visible");
  backdrop.addClass("show");
});

searchInputtedTextBtn.on("click", function () {
  const existingWords = JSON.parse(localStorage.getItem("words"));
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
      if (word.similar === searchInputText) {
        const similarWords = [];
        similarWords.push(word);
        localStorage.setItem("similarWords", JSON.stringify(similarWords));
      }
    });

    window.location.href = "/results.html";
  } else {
    window.location.href = "/not-found.html";
  }
});

function itemClickHandler(event) {
  // window.location.href = `/item-detail${event.path[1].id}.html`;

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

storedWords.map((word) => {
  lastAddedWords.append(
    `<div id=${word.id} onClick=itemClickHandler(event) class="last-word-item"><img src="./assets/study.jpg"><div><h4>#${word.name}</h4><p>${word.foreign}</p></div></div>`
  );
});

storedNameContainedWords.map((word) => {
  matchedWords.append(
    `<div id=${word.id} class="last-word-item"><img src="./assets/study.jpg"><div><h4>#${word.name}</h4><p>${word.foreign}</p></div></div>`
  );
});

storedSimilarWords.map((word) => {
  similarWords.append(
    `<div id=${word.id} class="last-word-item"><img src="./assets/study.jpg"><div><h4>#${word.name}</h4><p>${word.foreign}</p></div></div>`
  );
});

oftenViewedWords.map((word) => {
  repeatingWords.append(
    `<div id=${word.id} class="last-word-item"><img src="./assets/study.jpg"><div><h4>#${word.name}</h4><p>${word.foreign}</p></div></div>`
  );
});


