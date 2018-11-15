function createCard(link) {
  // card
  let card = document.createElement("div");

  // title
  let title = document.createElement("h1");
  title.textContent = link.Title;

  card.appendChild(title);

  return card;
}

export default createCard;
