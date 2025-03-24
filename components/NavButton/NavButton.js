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
    console.log("hi");
    if (page < maxPage) {
      page++;
      fetchCharacters(
        cardContainer,
        createCharacterCard,
        paginationElement,
        page
      );
    }
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
