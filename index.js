import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
// import { fetchCharacters } from "./components/NavPagination/NavPagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const paginationElement = document.querySelector('[data-js="pagination"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');

// fetchCharacters(cardContainer, createCharacterCard, paginationElement);

let maxPage = 1;
let page = 1;

async function fetchCharacters() {
  try {
    const characters = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}`
    );

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
  function updatePagination(paginationElement) {
    paginationElement.innerText = `${page} / ${maxPage}`;
  }
}

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
setupButtonListeners(
  prevButton,
  nextButton,
  cardContainer,
  createCharacterCard,
  paginationElement
  // fetchCharacters
);
