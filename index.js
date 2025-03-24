import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
// import { fetchCharacters } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const paginationElement = document.querySelector('[data-js="pagination"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

const searchForm = document.querySelector(".search-bar"); // تحديد شريط البحث
const searchInput = searchForm.querySelector(".search-bar__input");

let maxPage = 1;
let page = 1;
let searchQuery = "";

async function fetchCharacters() {
  try {
    let url = `https://rickandmortyapi.com/api/character?page=${page}`;

    if (searchQuery) {
      url += `&name=${encodeURIComponent(searchQuery)}`;
    }

    const characters = await fetch(url);

    if (!characters.ok) {
      throw new Error("error");
    }

    const data = await characters.json();
    maxPage = data.info.pages;

    cardContainer.innerHTML = "";

    data.results.forEach((character) => {
      const characterCard = createCharacterCard(character);
      cardContainer.append(characterCard);
    });

    updatePagination(paginationElement);
  } catch (error) {
    console.error("", error);
  }
}
function updatePagination(paginationElement) {
  paginationElement.innerText = `${page} / ${maxPage}`;
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  searchQuery = searchInput.value;
  page = 1;

  fetchCharacters();
});

fetchCharacters();
function setupButtonListeners(prevButton, nextButton) {
  nextButton.addEventListener("click", () => {
    // console.log("hi");
    // if (page < maxPage) {
    page++;
    fetchCharacters();
    // }
  });

  prevButton.addEventListener("click", () => {
    if (page > 1) {
      page--;
      fetchCharacters();
    }
  });
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchQuery = searchBar.value;
  page = 1;

  fetchCharacters();
});

setupButtonListeners(
  prevButton,
  nextButton,
  cardContainer,
  createCharacterCard,
  paginationElement
  // fetchCharacters
);
