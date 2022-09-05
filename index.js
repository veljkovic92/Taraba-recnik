const words = [];

const searchBtn = $(".search");
const searchContainer = $(".search-container");
const backdrop = $(".backdrop");
const searchInputtedTextBtn = $(".search-btn-find");
const closeSearchContainer = $(".search-btn-close");



searchBtn.on("click", function () {
  searchContainer.addClass("visible");
  backdrop.addClass("show");
});

searchInputtedTextBtn.on("click", function () {
  const searchInputText = $(".search-input").val();
  if (words.find((word) => word === searchInputText)) {
    window.location.href = "/results.html";
  } else {
    words.push(searchInputText);
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


