const search= document.getElementById('search');
const submit = document.getElementById('submit');
const random = document.getElementById('random');
const resultHeading = document.getElementById('result-heading');
const mealsEl= document.getElementById('meals');
const single_meal=document.getElementById('single-meal');


let mealsArr=[];

// seaech for meal

function searchMeal(e){
    e.preventDefault();

    //clear Single meal

    single_meal.innerHTML='';

    //Get search item

    const term=search.value;
    console.log(term);

    //check for empty

    if(term.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(res =>res.json())
        .then(data =>{
            
            resultHeading.innerHTML=`<h2>Search results for '${term}'</h2>`;

            if(data.meals === null){
                resultHeading.innerHTML=`<p>There are no search results.Try again!</p>`;
            }else{

               mealsArr=data.meals;
                
                mealsEl.innerHTML=mealsArr.map(meal=>`
                <div class="meal">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
                <div class="meal-info" data-mealID="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
                </div>
                </div>
                ` )
                
                .join('');
                
              
            }

        });
        //clear  search tex

        search.value="";
       


    }else{

        alert("please enter a search term");

    }

}

//fetch meal by id

function getMealById(mealID){
  
   return mealsArr.find((meal=>mealID==meal.idMeal));
}

//fetch random meal from api

function getRandomMeal(){

// clear headings and meal

mealsEl.innerHTML="";
resultHeading.innerHTML="";
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res=>res.json())
    .then(data=>
        {
            const meal= data.meals[0];
            addMealToDOM(meal);
        })
}

//Add meal to DOM

function addMealToDOM(meal){
    const ingredients=[];

    for(let i=1;i<=20;i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(`${meal[`strIngredient${i}`]}-${meal[`strMeasure${i}`]}`);
        } else{
            break;
        }
        }

        single_meal.innerHTML=`
        <div class="single-meal">
        <h1>${meal.strMeal}</h1>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}"/>
        <div class="single-meal-info">
        ${meal.strCategory ?`<p>${meal.strCategory}<p>`:''}
        ${meal.strArea ?`<p>${meal.strArea}<p>`:''}

        </div>
        <div class="main">
        <p>${meal.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
        ${ingredients.map(ing => `<li>${ing}</li>`).join('')}
        </ul>
        </div>
        </div>`

    }


//Event Listener

submit.addEventListener('submit',searchMeal);
random.addEventListener('click',getRandomMeal);

mealsEl.addEventListener('click',e=>{
    const mealInfo=e.path.find(item=>{
        if(item.classList){
            return item.classList.contains('meal-info')
        } else {
            return false;
        }
    });
    if(mealInfo){
        const mealID= mealInfo.getAttribute('data-mealid');
       const meal= getMealById(mealID);
        addMealToDOM(meal);
    }
})