const search = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");
const randomBtn = document.querySelector("#randombtn");
const resultsHeading = document.querySelector("#results-heading");
const mealsEl = document.querySelector("#meals");
const singleMeal = document.querySelector("#single-meal");
const submit = document.querySelector("#submit");

//search meal function and api
function searchMeal(e) {
  e.preventDefault();

  //singlemeal clear
  singleMeal.innerHTML = "";

  //search term
  let term = search.value;

  //check empty seach
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        resultsHeading.innerHTML = `<h4>Search results for : ${term}</h4>`;

        if (data.meals === null) {
          resultsHeading.innerHTML = `<h4>Sorry. No results for : ${term}</h4>`;
        } else {
          mealsEl.innerHTML = data.meals.map(item => `
          <div class="meal">
          <img src="${item.strMealThumb}" alt="${item.strMeal}" />
          <div class="meal-info" data-mealID="${item.idMeal}">
            <h3>${item.strMeal}</h3>
          </div>
        </div>`
          ).join("");
        }
      });

    //clear searchbar
    search.value = "";
  } else {
    alert("Please enter a valid search");
  }
}

//event listeners
submit.addEventListener("submit", searchMeal);
