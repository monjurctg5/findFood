

let loadData = () => {
    const inputField = document.getElementById('search-field')
    let text = inputField.value;
    inputField.value = ''
    console.log(typeof parseInt(text))
   if(text == ""){
       alert("Please write a food name is search box")
   }
//    else if(typeof par(text)!='string'){
//        alert("food cant not be a number \n please search  by a text")
//    }
   else{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.meals ==null){
                alert(`${text} is  not found`)
            }
            else{getMeal(data.meals)

            }
        })
        // .catch(error=>alert(error))
   }
}
const getMeal = (meals) => {
    console.log(meals)
    const searchMeal = document.getElementById("search")
    searchMeal.innerHTML = ' '
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.className = "col"
            div.innerHTML = `  
            <div class="card" onclick = "loadMealDetails(${meal.idMeal})" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <img  src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                    <h5 class="card-title">'${meal.strMeal}'</h5>
            </div>
          </div>
          `
            searchMeal.appendChild(div)
        })
}

let loadMealDetails = (mealID) => {
    let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMeal(data.meals[0]))
}

const displayMeal = (meal) => {
    const modalHeader = document.getElementById('modlHeader')
    modalHeader.innerHTML = `
    <h5 class="modal-title" id="exampleModalLabel">${meal.strMeal}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    `

    let modalBody = document.getElementById('modalBody')
    modalBody.innerHTML = `
    <div>
    <div class="w-50">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
   </div>
   <div class="card-body h-50">
     <p>${meal.strInstructions.slice(0,200)}</p>
   </div>
 </div>
    `
}