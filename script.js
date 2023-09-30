const NasaApiUrl =
  "https://api.nasa.gov/planetary/apod?api_key=gbMl2Wc0DZOvc1hYJ1fdRvTRURPDhVj9fCcU57C0";
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const currentImageContainer = document.querySelector(
  "#current-image-container"
);
const searchHistoryList = document.querySelector("#search-history");

async function getCurrentImageOfTheDay() {
  const currentDate = new Date().toISOString().split("T")[0];
  const response = await fetch(`${NasaApiUrl}&date=${currentDate}`);
  const data = await response.json();

  displayImage(data);
}

async function getImageOfTheDay(date) {
  const response = await fetch(`${NasaApiUrl}&date=${date}`);
  const data = await response.json();

  displayImage(data);

  saveSearch(date);
  addSearchToHistory(date);
}

function displayImage(data) {
  const image = currentImageContainer.querySelector("img");
  const imageDescription =
    currentImageContainer.querySelector("#image-description");

  image.src = data.url;
  imageDescription.textContent = data.explanation;
}

function saveSearch(date) {
  const searches = localStorage.getItem("searches") || [];
  searches.push(date);
  localStorage.setItem("searches", JSON.stringify(searches));
}

function addSearchToHistory(date) {
  const searchHistoryItem = document.createElement("li");
  searchHistoryItem.textContent = date;
  searchHistoryItem.addEventListener("click", () => getImageOfTheDay(date));
  searchHistoryList.appendChild(searchHistoryItem);
}

function displaySearchHistory() {
  const searches = JSON.parse(localStorage.getItem("searches")) || [];

  searchHistoryList.innerHTML = "";

  for (const search of searches) {
    addSearchToHistory(search);
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const date = searchInput.value;
  getImageOfTheDay(date);
});

getCurrentImageOfTheDay();
displaySearchHistory();
