const inputSearchTitle = document.querySelector("#input-search-title")
const selectSearchType = document.querySelector("#select-search-type")
const searchButton = document.querySelector("#btn-movie-search")
const tableSearchResults = document.querySelector("#tableDisp")
const tableBodySearchResults = tableSearchResults.querySelector("tbody")
const pLoading = document.querySelector("#loading")
const inputSearchYear = document.querySelector("#input-search-year")
let nextPageBtn = document.querySelector("#nextPage")
let pagination = document.querySelector("#pagination")
let previousPageBtn = document.querySelector("#previousPage")

let currentPage = 1
let title
let year
let type

pLoading.style.display = "none"

async function fetchMovies(title, type, year, page) {
    let url = `http://www.omdbapi.com/?s=${encodeURI(title)}&apikey=97735482&page=${page}`
    if (type !== "all") {
        url += `&type=${type}`
    }

    if (year !== ""){
        url += `&y=${year}` 
    }

    
    const response = await fetch(url)
    const responseJson = await response.json()


    // DEBUG
    console.log(responseJson.Search)
    console.log(responseJson.totalResults)
    console.log(url)
    return responseJson
}

function displaySearchResult(movies) {
    tableBodySearchResults.innerHTML = ""
    for (const movie of movies) {
        const movieRow = document.createElement("tr")

        const moviePoster = document.createElement("td")
        const posterImg   = document.createElement("img");
        posterImg.src     = movie.Poster
        moviePoster.appendChild(posterImg);
        movieRow.appendChild(moviePoster);
        posterImg.addEventListener("error", () => {
            posterImg.src="../assets/img/noPoster.png"
        })

        const movieTitle = document.createElement("td")
        movieTitle.innerText = movie.Title
        movieRow.appendChild(movieTitle)

        const movieYear = document.createElement("td")
        movieYear.innerText = movie.Year;
        movieRow.appendChild(movieYear)

        tableBodySearchResults.appendChild(movieRow)
    }
}

searchButton.addEventListener("click", () => {

    tableSearchResults.style.display = "none"
    pLoading.style.display = "block"

    currentPage = 1

     title = inputSearchTitle.value
     type  = selectSearchType.value
     year  = inputSearchYear.value

    fetchMovies(title, type, year, 1).then( response => {
        pLoading.style.display = "none"
        tableSearchResults.style.display = "block";
      
         if (response.totalResults <= 10){
                nextPageBtn.style.display = "none"
         }else {
              nextPageBtn.style.display = "inline"
         }
        displaySearchResult(response.Search)
    });
})


nextPageBtn.addEventListener("click", () => {
    currentPage++

    previousPageBtn.style.display = "inline"

    fetchMovies(title, type, year, currentPage).then(response => {
        pLoading.style.display = "none"
        tableSearchResults.style.display = "block";

        displaySearchResult(response.Search)
        window.scrollTo(0, 0)
    });

    
})


previousPageBtn.addEventListener("click", () => {
   
        currentPage--

        if (currentPage == 1){
             previousPageBtn.style.display = "none"
        }

        fetchMovies(title, type, year, currentPage).then(response => {
            pLoading.style.display = "none"
            tableSearchResults.style.display = "block";
            
            displaySearchResult(response.Search)
            window.scrollTo(0, 0)
        });
       
              
})

