const apiKey = "240c2182"; 

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsContainer = document.getElementById("searchResults");


searchBtn.addEventListener("click", searchMovies);
searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") searchMovies();
});

async function searchMovies() {
    const query = searchInput.value.trim();
    if (query === "") return;

   
    const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&type=movie&apikey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    resultsContainer.innerHTML = "";

    if (data.Response === "True" && data.Search.length > 0) {
        data.Search.forEach(movie => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'no-image.jpg'}" alt="${movie.Title}">
                <h3>${movie.Title}</h3>
                <p>${movie.Year}</p>
            `;
            resultsContainer.appendChild(movieCard);
        });
    } else {
        resultsContainer.innerHTML = `<p>No movies found for "${query}". Try another title.</p>`;
    }
}
