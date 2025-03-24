let maxPage = 1;
let page = 1;

async function fetchCharacters(
  cardContainer,
  createCharacterCard,
  paginationElement,
  page
) {
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
export function setupButtonListeners(
  prevButton,
  nextButton,
  cardContainer,
  createCharacterCard,
  paginationElement,
  page,
  maxPage,
  fetchCharacters
) {
  nextButton.addEventListener("click", () => {
    // console.log("hi");
    // if (page < maxPage) {
    page++;
    fetchCharacters(
      cardContainer,
      createCharacterCard,
      paginationElement,
      page
    );
    // }
  });

  prevButton.addEventListener("click", () => {
    if (page > 1) {
      page--;
      fetchCharacters(
        cardContainer,
        createCharacterCard,
        paginationElement,
        page
      );
    }
  });
}
