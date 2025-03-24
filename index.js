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
const main = document.querySelector("main");

const div = document.createElement("div");
div.className = "search-bar-container";
div.setAttribute("data-js", "search-bar-container");

const searchBar1 = document.createElement("form");
searchBar1.className = "search-bar";
searchBar1.setAttribute("data-js", "search-bar");

const input = document.createElement("input");
input.className = "search-bar__input";
input.setAtribute("name", "query");
input.setAtribute("aria-label", "character name");
input.setAtribute("placeholder", "search characters");
input.setAtribute("type", "text");

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
/*
        
      <ul class="card-container" data-js="card-container">
        <li class="card">
          <div class="card__image-container">
            <img
              class="card__image"
              src="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
              alt="Rick Sanchez"
            />
            <div class="card__image-gradient"></div>
          </div>
          <div class="card__content">
            <h2 class="card__title">Rick Sanchez</h2>
            <dl class="card__info">
              <dt class="card__info-title">Status</dt>
              <dd class="card__info-description">Alive</dd>
              <dt class="card__info-title">Type</dt>
              <dd class="card__info-description"></dd>
              <dt class="card__info-title">Occurrences</dt>
              <dd class="card__info-description">51</dd>
            </dl>
          </div>
        </li>
      </ul>
    </main>
    <nav class="navigation" data-js="navigation">
      <button class="button button--prev" data-js="button-prev">
        previous
      </button>
      <span class="navigation__pagination" data-js="pagination">1 / 1</span>
      <button class="button button--next" data-js="button-next">next</button>
    </nav>*/
