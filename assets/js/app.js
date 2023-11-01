var films = [
    {
        title: "Deadpool",
        years: 2016,
        authors: "Tim Miller"
    },
    {
        title: "Spiderman",
        years: 2002,
        authors: "Sam Raimi"
    },
    {
        title: "Scream",
        years: 1996,
        authors: "Wes Craven"
    },
    {
        title: "It: chapter 1",
        years: 2019,
        authors: "Andy Muschietti"
    }
];

// Displaying the differents movies into a table 

let tableBody = document.querySelector("tbody");

function displayMovieTable() {
    tableBody.innerHTML = "";
    for (const info of films) {

        let newTr = document.createElement("tr");
        tableBody.appendChild(newTr);

        let newTdTitle = document.createElement("td");
        newTr.appendChild(newTdTitle);
        newTdTitle.innerText = info.title;

        let newTdYears = document.createElement("td");
        newTr.appendChild(newTdYears);
        newTdYears.innerText = info.years;

        let newTdAuthors = document.createElement("td");
        newTr.appendChild(newTdAuthors);
        newTdAuthors.innerText = info.authors;

        let newDel = document.createElement("td");
        newTr.appendChild(newDel);
        let delBtn = document.createElement("button");
        newDel.appendChild(delBtn);
        delBtn.innerText = "Supprimer";
    }


}

displayMovieTable();

let notif = document.querySelector(".displayResult");
notif.style.display = "none";

document.querySelector("#sortBtn").addEventListener("change", (event) => {
    if(event.target.value === "year"){
        films.sort(compareYear)
    } else films.sort(compareTitle);

    displayMovieTable();
} )

// Buttons that displays the form to add a new movie

let hiddenToVisible = document.getElementById("btnAdd");
hiddenToVisible.addEventListener("click", displayNewFilm);

function displayNewFilm(event) {

    event.preventDefault();
    document.querySelector("#formAdd").style.visibility = "visible";
    notif.style.display = "none";

}

// Saving the movie + displays validation div 

let saveNewFilm = document.getElementById("save");

saveNewFilm.addEventListener("click", saveNew);


function saveNew(event) {
    event.preventDefault();

    let valid = 0;
    let isTitleValid = true;
    let isYearValid = true;
    let isAuthorValid = true;

    if (titleAdd.value.length < 2) {
        isTitleValid = false;
    }
    if (yearAdd.value < 1900 || yearAdd.value > new Date().getFullYear()) {
        isYearValid = false;
    }
    if (realisatorAdd.value.length < 5) {
        isAuthorValid = false;
    }

    if (isTitleValid && isYearValid && isAuthorValid) {
        notif.innerHTML = `Le film a été sauvergardé avec succès.`
        document.querySelector("#formAdd").style.visibility = "hidden";
        notif.style.display = "block";

        function masquernotification() {
            notif.style.display = "none";
        }
        window.setTimeout(masquernotification, 3000);

        let film = {
            title: titleAdd.value.charAt(0).toUpperCase() + titleAdd.value.slice(1),
            years: yearAdd.value,
            authors: realisatorAdd.value.charAt(0).toUpperCase() + realisatorAdd.value.slice(1),
        };
        films.push(film);

        displayMovieTable();

    } else {
        notif.innerHTML = `${isTitleValid ? "" : "<p>Le titre est incorrect</p>"} 
        ${isYearValid ? "" : "<p>L'année est incorrecte</p>"}
        ${isAuthorValid ? "" : "<p>L'auteur est incorrect</p>"}`;

        document.querySelector("#formAdd").style.visibility = "hidden";
        notif.style.display = "block";

        function masquernotification() {
            notif.style.display = "none";
        }
        window.setTimeout(masquernotification, 5000);
    }

}




// filters

function compareTitle(movieA, movieB){
    return movieA.title.localeCompare(movieB.title);
}

function compareYear(movieA, movieB){
    return movieB.years - movieA.years;
}