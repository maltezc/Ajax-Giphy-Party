"use strict";

const API_KEY = "lGo6p34fA1pIoHA0bYZtTQW5a82QyR3Z"; // // todo: extract as global
const HOST_NAME = "http://api.giphy.com/v1/gifs/search";

async function getGifAndAppend(evt) {
  evt.preventDefault();

  const response = await getResponse();
  const url = getUrl(response);
  appendGif(url);
}

/** function to grab gif url from api and pass
 * to appendGif function*/
async function getResponse() {
  const $searchTerm = $("#search-term").val();

  const response = await axios.get(HOST_NAME, {
    params: { q: $searchTerm, api_key: API_KEY, limit: "1" },
  });

  return response;
}

function getUrl(response) {
  let url = response.data.data[0].images.original.webp;
  return url;
}

/** append retrieved gif to gif gallery */
function appendGif(url) {
  $("#gif-gallery").append(`<img src=${url}></img>`);
}

/** removes images from gif gallery*/
function removeImages(evt) {
  evt.preventDefault(); // ? <=== can this be jquery? okay to be vJS
  $("#gif-gallery").empty();
}

// add event listeners to buttons
$(".submit-btn").on("click", getGifAndAppend);
$(".remove-images-btn").on("click", removeImages);
