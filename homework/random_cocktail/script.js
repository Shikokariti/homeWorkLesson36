let cocktail;
let cocktailAPI;
let cocktailName;
let cocktailInstructions;
let ingredientString;
let cocktailInfo = [];
let ingredientList = document.getElementById('ingredients');

getCocktail();
async function getCocktail() {
    cocktailAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php').then((response)=>response.json());
    cocktail = cocktailAPI.drinks[0];
    cocktailName = cocktailAPI.drinks[0].strDrink;
    cocktailInstructions = cocktailAPI.drinks[0].strInstructions;
    createCocktailObject(cocktail);
}
function createCocktailObject(cocktail) {
    cocktailInfo.push({
        name: cocktailName,
        instructions: cocktailInstructions,
        ingredients: []
    });
    let i = 1;
    let ingredientString;
    while (i <= 15) {
        ingredientString = "strIngredient" + i;
        if (cocktail[ingredientString] != null) {
            cocktailInfo[0].ingredients.push({
                name: cocktail[ingredientString],
                strDescription: '',
                strType: ''
            });
        }
        i++;
    }
    cocktailInfo[0].ingredients.forEach((ingredient)=>{
        createIngredient(ingredient);
    });
    renderHTML();
}
async function createIngredient(ingredient) {
    let details = await getIngredientDetails(ingredient.name);
    ingredient.strType = details.strType;
    ingredient.strDescription = details.strDescription;
}
async function getIngredientDetails(ingredient) {
    let ingredientsAPI = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?i=' + ingredient).then((response)=>response.json());
    return {strDescription: ingredientsAPI.ingredients[0].strDescription, strType:ingredientsAPI.ingredients[0].strType};
}
function renderHTML() {
    document.getElementById('cocktailName').innerText = cocktailName;
    document.getElementById('cocktailInstructions').innerText = cocktailInstructions;
    cocktailInfo[0].ingredients.forEach((ingredient)=>{
        console.log(cocktailInfo[0]);
        console.log(ingredient);
        let liIngredient = document.createElement('li');
        let strDescription = document.createElement('ul');
        let strType = document.createElement('ul');
        console.log(ingredient.strDescription);
        strDescription.innerText = ingredient.strDescription;
        strType.innerText = ingredient.strType;
        liIngredient.appendChild(strDescription);
        liIngredient.appendChild(strType);
        liIngredient.innerText = ingredient.name;
        ingredientList.appendChild(liIngredient);
    });
}


