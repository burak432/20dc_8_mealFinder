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
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        resultsHeading.innerHTML = `<h4>Search results for : ${term}</h4>`;

        if (data.meals === null) {
          resultsHeading.innerHTML = `<h4>Sorry. No results for : ${term}</h4>`;
        } else {
          mealsEl.innerHTML = data.meals
            .map(
              (item) => `
          <div class="meal">
          <img src="${item.strMealThumb}" alt="${item.strMeal}" />
          <div class="meal-info" data-mealID="${item.idMeal}">
            <h3>${item.strMeal}</h3>
          </div>
        </div>`
            )
            .join("");
        }
      });

    //clear searchbar
    search.value = "";
  } else {
    alert("Please enter a valid search");
  }
}

//function for fetch meal by id num
function getMealByID(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then((res) => res.json())
    .then((data) => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

function addMealToDOM(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  singleMeal.innerHTML = `
    <div class="single-meal">
      <h1>${meal.strMeal}</h1>
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
      <div class="single-meal-info">
        ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ''}
        ${meal.strArea ? `<p>${meal.strArea}</p>` : ''}
      </div>
      <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
}


//event listeners
submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", (e) => {
  const mealInfo = e.path.find((item) => {
    if (item.classList) {
      //event clicks returns whatever has the classname of "meal-info"
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });
  if (mealInfo) {
    const mealID = mealInfo.getAttribute("data-mealID");
    getMealByID(mealID);
  }
});
