import jsonMarkup from "json-markup";
import createCard from "./createCard";

if (module.hot) {
  module.hot.accept();
}

let scrapeCardElement = document.getElementById("scrape-card");
let scrapeJsonElement = document.getElementById("scrape-json");

document.addEventListener("DOMContentLoaded", function() {
  preventUrlSpaces(document.querySelector("#urlInput"));
  onSubmitUrl(document.querySelector("#urlForm"));
});

function preventUrlSpaces(urlInput) {
  urlInput.addEventListener("input", e => {
    urlInput.value = e.target.value.replace(/\s+/g, "");
  });
}

function onSubmitUrl(urlForm) {
  urlForm.addEventListener("submit", e => {
    e.preventDefault();
    const urlInput = document.querySelector("#urlInput");
    fetch("https://api.scrape.link/scrape", {
      method: "POST",
      body: JSON.stringify({ url: urlInput.value })
    })
      .then(res => {
        return res.json();
      })
      .then(link => {
        scrapeCardElement.appendChild(createCard(link));
        scrapeJsonElement.innerHTML = jsonMarkup(link);
      });
  });
}
