import jsonMarkup from "json-markup";

export function createCard(link) {
  // image
  let imageImg = document.createElement("img");
  imageImg.setAttribute("src", link.Image);
  imageImg.setAttribute("alt", link.Title);
  let imageDiv = document.createElement("div");
  imageDiv.className = "image";
  imageDiv.appendChild(imageImg);

  // author
  const publisher = link.Publisher
    ? "<strong>" + link.Publisher + "</strong> "
    : "";
  const authorBreak = link.Publisher && link.Author ? "// " : "";
  let logoImg = document.createElement("img");
  logoImg.setAttribute("src", link.Logo);
  logoImg.setAttribute("alt", link.Publisher);
  let authorSpan = document.createElement("span");
  authorSpan.innerHTML = publisher + authorBreak + link.Author;
  let authorDiv = document.createElement("div");
  authorDiv.className = "author";
  authorDiv.appendChild(logoImg);
  authorDiv.appendChild(authorSpan);

  // title
  let titleH1 = document.createElement("h1");
  titleH1.textContent = link.Title;
  let titleDiv = document.createElement("div");
  titleDiv.className = "title";
  titleDiv.appendChild(titleH1);

  // description
  let descriptionP = document.createElement("p");
  descriptionP.textContent =
    link.Description.length > 160
      ? link.Description.substring(0, 158) + "…"
      : link.Description;
  let descriptionDiv = document.createElement("div");
  descriptionDiv.className = "description";
  descriptionDiv.appendChild(descriptionP);

  // content
  let contentDiv = document.createElement("div");
  contentDiv.className = "content";
  contentDiv.appendChild(authorDiv);
  contentDiv.appendChild(titleDiv);
  contentDiv.appendChild(descriptionDiv);

  // card
  let cardDiv = document.createElement("div");
  cardDiv.className = "card";
  cardDiv.appendChild(imageDiv);
  cardDiv.appendChild(contentDiv);

  return cardDiv;
}

export function createJsonResult(link) {
  let scrapeJsonDiv = document.createElement("div");
  scrapeJsonDiv.className = "scrape-json";
  scrapeJsonDiv.innerHTML = jsonMarkup(link);

  return scrapeJsonDiv;
}
