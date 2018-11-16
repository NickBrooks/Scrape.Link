import isUrl from "is-url";
import { createCard, createJsonResult } from "./scrapeResult";

if (module.hot) {
  module.hot.accept();
}

// element selectors
let scraperElement = document.getElementById("scraper");
let invalidUrlElement = document.getElementById("valid-url");
let scrapeButtonElement = document.getElementById("scrape-button");
let scrapeResultElement = document.getElementById("scrape-result");
let loaderElement = document.getElementById("loader");
let scrapeResultCardElement = document.getElementById("scrape-card");
let scrapeResultJsonElement = document.getElementById("scrape-json");

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
    if (!urlInput.value || !isUrl(urlInput.value)) {
      invalidUrlElement.classList.remove("hidden");
      return;
    }

    // add loading classes
    invalidUrlElement.classList.add("hidden");
    scraperElement.classList.remove("no-scrape");
    scrapeButtonElement.classList.add("hidden");
    scrapeResultElement.classList.remove("hidden");
    loaderElement.classList.remove("hidden");

    fetch("https://api.scrape.link/scrape", {
      method: "POST",
      body: JSON.stringify({ url: urlInput.value })
    })
      .then(res => {
        return res.json();
      })
      .then(link => {
        // return elements
        scrapeButtonElement.classList.remove("hidden");
        loaderElement.classList.add("hidden");

        // and generate the results
        scrapeResultCardElement.innerHTML = "";
        scrapeResultJsonElement.innerHTML = "";
        scrapeResultCardElement.appendChild(createCard(link));
        scrapeResultJsonElement.appendChild(createJsonResult(link));
      });
  });
}
