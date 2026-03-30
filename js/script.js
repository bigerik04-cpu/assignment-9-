const apiKey = "OuI6EVq29U2IiEzPFVNaTwSy1nBmMixs";

const gifContainer = document.querySelector("#gif-container");
const fetchGifBtn = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

async function fetchGifs() {
  let searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    searchTerm = "cats";
  }

  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchTerm}&limit=8&rating=g`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    console.log(data);

    const images = data.data.map((gif) => gif.images.original.url);

    gifContainer.innerHTML = "";

    for (let i = 0; i < images.length; i++) {
      gifContainer.innerHTML += `
        <div class="col-3 gif-card">
          <img src="${images[i]}" alt="gif result">
        </div>
      `;
    }
  } catch (error) {
    console.log("Error fetching gifs:", error);
    gifContainer.innerHTML = "<p>Something went wrong while fetching gifs.</p>";
  }
}

fetchGifBtn.addEventListener("click", fetchGifs);
