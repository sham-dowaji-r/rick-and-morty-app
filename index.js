import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
// import { fetchCharacters } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const paginationElement = document.querySelector('[data-js="pagination"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

let maxPage = 1;
let page = 1;
let searchQuery = "";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const main = document.querySelector("main");
  body.append(main);

  const div = document.createElement("div");
  div.className = "search-bar-container";
  div.setAttribute("data-js", "search-bar-container");

  const searchBar1 = document.createElement("form");
  searchBar1.className = "search-bar";
  searchBar1.setAttribute("data-js", "search-bar");

  const input = document.createElement("input");
  input.className = "search-bar__input";
  input.setAttribute("name", "query");
  input.setAttribute("aria-label", "character name");
  input.setAttribute("placeholder", "search characters");
  input.setAttribute("type", "text");

  const button = document.createElement("button");
  button.className = "search-bar__button";
  button.setAttribute("aria-label", "search for character");

  const img = document.createElement("img");
  button.className = "search-bar__icon";
  img.setAttribute("src", "assets/magnifying-glass.png");
  img.setAttribute("alt", "");

  button.append(img);
  searchBar1.append(input);
  searchBar1.append(button);
  div.append(searchBar1);
  main.append(div);

  const nav = document.createElement("nav");
  nav.className = "navigation";
  nav.setAttribute("data-js", "navigation");

  const button1 = document.createElement("button");
  button1.className = "button button--prev";
  button1.setAttribute("data-js", "button-prev");
  button1.textContent = "previous";

  const span = document.createElement("span");
  span.className = "navigation__pagination";
  span.setAttribute("data-js", "pagination");
  span.textContent = "1 / 1";

  const button2 = document.createElement("button");
  button2.className = "button button--next";
  button2.setAttribute("data-js", "button-next");
  button2.textContent = "next";

  nav.append(button2);
  nav.append(span);
  nav.append(button1);
  body.append(nav);
});

const searchForm = document.querySelector(".search-bar"); // تحديد شريط البحث
const searchInput = searchForm.querySelector(".search-bar__input");

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
    if (page < maxPage) {
      page++;
      fetchCharacters();
    }
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
  searchQuery = searchInput.value;
  page = 1;

  fetchCharacters();
});

setupButtonListeners(
  prevButton,
  nextButton
  //cardContainer,
  //createCharacterCard,
  //paginationElement
  // fetchCharacters
);
