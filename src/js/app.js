import isUrl from "is-url";
import { createCard, createJsonResult } from "./scrapeResult";

if (module.hot) {
  module.hot.accept();
}

// element selectors
let scraperElement = document.getElementById("scraper");
let errorMsgElement = document.getElementById("error-message");
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

function fetchScrape(url) {
  return fetch("https://api.scrape.link/scrape", {
    method: "POST",
    body: JSON.stringify({ url })
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(res);
    }
  });
}

function onSubmitUrl(urlForm) {
  urlForm.addEventListener("submit", e => {
    e.preventDefault();
    const urlInput = document.querySelector("#urlInput");
    if (!urlInput.value || !isUrl(urlInput.value)) {
      errorMsgElement.innerHTML = "<p>Enter valid URL (incl http/s)!</p>";
      errorMsgElement.classList.remove("hidden");
      return;
    }

    // add loading classes
    errorMsgElement.classList.add("hidden");
    scraperElement.classList.remove("no-scrape");
    scrapeButtonElement.classList.add("hidden");
    scrapeResultElement.classList.remove("hidden");
    loaderElement.classList.remove("hidden");
    scrapeResultCardElement.innerHTML = "";
    scrapeResultJsonElement.innerHTML = "";

    fetchScrape(urlInput.value)
      .then(link => {
        // return elements
        scrapeButtonElement.classList.remove("hidden");
        loaderElement.classList.add("hidden");

        // and generate the results
        scrapeResultCardElement.appendChild(createCard(link));
        scrapeResultJsonElement.appendChild(createJsonResult(link));
      })
      .catch(error => {
        errorMsgElement.innerHTML =
          "<p>Too many scrapes in this session. Try reloading the browser.</p>";
        errorMsgElement.classList.remove("hidden");
        scrapeButtonElement.classList.remove("hidden");
        scraperElement.classList.add("no-scrape");
        scrapeResultElement.classList.add("hidden");
      });
  });
}
