export function createCharacterCard(character) {
  const card = document.createElement("li");
  card.classList.add("card");
  card.innerHTML = `
    <div class="card__container">
      <div class="card__image-container">
        <img
          class="card__image"
          src="${character.image}"
          alt="${character.name}"
        />
      </div>
      <div class="card__image-gradient"></div>

      <div class="card__content">
        <h2 class="card__title">${character.name}</h2>
        <dl class="card__info">
          <dt class="card__info-title">Status</dt>
          <dd class="card__info-description">${character.status}</dd>
          <dt class="card__info-title">Type</dt>
          <dd class="card__info-description">${
            character.type ? character.type : "Unknown"
          }</dd>
          <dt class="card__info-title">Occurrences</dt>
          <dd class="card__info-description">${character.episode.length}</dd>
        </dl>
      </div>
      
    </div>
  `;
  return card;
}
