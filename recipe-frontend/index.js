

// FETCH REQUEST TO SPOONACULAR
const recipeURL = "https://api.spoonacular.com/recipes/"
const apiKey = 'apiKey=9e71a494718f43cf801f2261d416465e'
const apiKey2 = 'apiKey=653b63c28115421887fd3e2f55dc36ce'

// FETCH REQUEST TO RAILS BACKEND
const railsURL = "http://localhost:3000/"

// ELEMENT GRABBERS
const recipeDisplay = () => document.querySelector("#recipe-display");
const recipeNav = () => document.querySelector("#recipe-nav")
const userRecipes = () => document.getElementById('My Recipes')
const errors = () => document.getElementById('errors')
const searchBar = () => document.getElementById('searchBar')

const recipeButton = () => document.getElementById('Random Recipe')
const saveRecipeButton = () => document.getElementById('Save Recipe')
const clearRecipeButton = () => document.getElementById('Clear Recipe')
const searchButton = () => document.getElementById('searchButton')

const sessionForm = () => document.querySelector('form')
const searchForm = () => document.getElementById('search-form')
var signInId



// FUNCTIONS TO CREATE BUTTONS
const buttonCreator = (text, classOption = "", styleOption = "") =>  {
    const button = document.createElement('button')
    button.id = text
    button.className = classOption
    button.style = styleOption
    button.innerText = text
    return button;
}




// FUNCTION THAT CLEARS RECIPE

const clearRecipe = function(){
    let children = Array.prototype.slice.call( recipeDisplay().children)
    if (children.length > 0){
        for (const index in children){
            recipeDisplay().removeChild(children[index])
        }
        return true 
    }
    else{
        return false
    }
}

// Function that fetches the users recipes
function backendUserRecipes(){
    
    let ul = document.createElement('ul')
    recipeDisplay().append(ul)
    fetch(railsURL + 'users/' + signInId + '/recipes')
        .then(resp => resp.json())
        .then((recipes) => {
            console.log(recipes)
            Recipe.createRecipes(recipes)
    })
}


// EVENT LISTENERS
const randomRecipeEvent = function(){
    recipeButton().addEventListener('click', (e) => {
        Recipe.randomRecipe()
    })
}
const saveRecipeEvent = function(){
    saveRecipeButton().addEventListener('click', (e) => {
        if(signInId === undefined){
            alert('Sign in to save the recipe')
        }else if (Recipe.haveRecipe()){
            Recipe.saveRecipe()
        }
        else{
            alert('Pick a recipe to save.')
        }
    })
}

const clearRecipeEvent = function(){
    clearRecipeButton().addEventListener('click', (e) => {
        clearRecipe()
    })
}

const sessionFormEvent = function(){
    sessionForm().addEventListener('submit', function(e){
        e.preventDefault()
        User.sessionLog()
    })
}

const userRecipesEvent = function(){
    userRecipes().addEventListener('click', function(e){
        if (signInId === undefined){
            alert('Please Sign in to view your recipes')
        }else{
            Recipe.backendUserRecipes()
        }
    })
}

const searchEvent = function(){
        searchButton().addEventListener('click', function(e){
        e.preventDefault()
        let search = searchBar().value
        

        console.log('https://api.spoonacular.com/recipes/complexSearch?query=' + encodeURIComponent(search) + '&' + apiKey2)

        fetch('https://api.spoonacular.com/recipes/complexSearch?query=' + encodeURIComponent(search) + '&' + apiKey2)
            .then(resp => resp.json())
            .then((recipes) => {
                const fetched = true
                console.log(recipes.results)
                Recipe.createRecipes(recipes.results)
                Recipe.displayRecipes(fetched)
            })
        
        
        searchBar().value = ""
        
    })
}

document.addEventListener('DOMContentLoaded', function(){
    
    // Creates Navigation buttons
    recipeNav().appendChild(buttonCreator('Random Recipe', 'black waves-effect waves-light btn-flat yellow-text', 'margin:10px'))
    recipeNav().appendChild(buttonCreator('Save Recipe', 'black waves-effect waves-light btn-flat yellow-text', 'margin:10px'))
    recipeNav().appendChild(buttonCreator('Clear Recipe', 'black waves-effect waves-light btn-flat yellow-text', 'margin:10px'))
    recipeNav().appendChild(buttonCreator('My Recipes', 'black waves-effect waves-light btn-flat yellow-text', 'margin:10px'))
    
    // EVENTS
    randomRecipeEvent()
    saveRecipeEvent()
    clearRecipeEvent()
    sessionFormEvent()
    userRecipesEvent()
    searchEvent()
    
});

// END EVENT LISTENERS
