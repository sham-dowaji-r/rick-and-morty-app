import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

async function fetchCharacters() {
  const characters = await fetch(
    "https://rickandmortyapi.com/api/character?page=<pageIndex>"
  );
  if (!characters.ok) {
    console.log("error");
  }

  const data = await characters.json();
  console.log(data);
  cardContainer.innerHTML = "";
  data.results.forEach((character) => {
    const characterCard = createCharacterCard(character);
    cardContainer.append(characterCard);
  });
}
fetchCharacters();
