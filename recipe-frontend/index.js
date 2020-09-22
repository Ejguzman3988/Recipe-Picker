// FETCH REQUEST TO SPOONACULAR
const recipeURL = "https://api.spoonacular.com/recipes/"
const apiKey = 'apiKey=9e71a494718f43cf801f2261d416465e'

// FETCH REQUEST TO RAILS BACKEND
const railsURL = "http://localhost:3000/"

// ELEMENT GRABBERS
const recipeDisplay = () => document.querySelector("#recipe-display");
const recipeNav = () => document.querySelector("#recipe-nav")
const recipeButton = () => document.getElementById('Random Recipe')
const saveRecipeButton = () => document.getElementById('Save Recipe')
const clearRecipeButton = () => document.getElementById('Clear Recipe')
const userRecipes = () => document.getElementById('My Recipes')
const sessionForm = () => document.querySelector('form')
const errors = () => document.getElementById('errors')
var signInId

 



// Function to check if there is a recipe displayed
function haveRecipe(){
    if (document.getElementById('summary')){
        return true
    }
    else{
        return false
    }
}

// FUNCTIONS TO CREATE BUTTONS
const buttonCreator = (text, classOption = "", styleOption = "") =>  {
    const button = document.createElement('button')
    button.id = text
    button.className = classOption
    button.style = styleOption
    button.innerText = text
    return button;
}

// FUNCTION THAT CREATES RANDOM RECIPE USING FETCH


function randomRecipe(){
    
    // [title, summary, instructions] = createElements()

    fetch(recipeURL + 'random?number=1&' + apiKey)
    .then(response => response.json())
    .then(recipesArray => {
        // title.innerHTML = (data.recipes[0].title)
        // summary.innerHTML += "<br>" + data.recipes[0].summary
        // instructions.innerHTML = "<br>" + data.recipes[0].instructions
        let randomRecipe = recipesArray.recipes[0]
        const newRecipe = new Recipe(randomRecipe.id, randomRecipe.title, randomRecipe.summary, randomRecipe.instructions)
        newRecipe.display()
    });
    
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

// FUNCTION THAT SAVES RECIPE INTO RAILS BACKEND
// function saveRecipe(){
//     const strongParams = {
//         recipe: {
//             title: document.getElementById('title').innerText,
//             summary: document.getElementById('summary').innerText,
//             instructions: document.getElementById('instructions').innerHTML
//         },
//         user_id: signInId
//     }
//     fetch(railsURL + 'users/' + signInId + '/recipes', {
//         method: 'POST',
//         headers: {
//             "accept": "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(strongParams)
//     })
//     .then(resp => resp.json())
//     .then((recipe) => {
//         Recipe.create(recipe.id, recipe.title, recipe.summary, recipe.instructions)
//     })
    
// }


// EVENT LISTENERS


const randomRecipeEvent = function(){
    recipeButton().addEventListener('click', (e) => {
        randomRecipe()
    })
}
const saveRecipeEvent = function(){
    saveRecipeButton().addEventListener('click', (e) => {
        if(signInId === undefined){
            alert('Sign in to save the recipe')
        }else if (haveRecipe()){
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
        sessionLog()
    })
}

const userRecipesEvent = function(){
    userRecipes().addEventListener('click', function(e){
        if (signInId === undefined){
            alert('Please Sign in to view your recipes')
        }else{
            Recipe.displayRecipes()
        }
    })
}

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

function sessionLog(){
    const strongParams = {
        user: {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
        }
    }
    fetch(railsURL + 'users', {
        method: 'post',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then((user) => {
        
        checkUser(user.username, user.password, user.id)
        return true
    })
    return false
    // sessionForm().remove()
}

function checkUser(username, password, id){
    if(errors().children){
        Array.prototype.slice.call(errors().children).forEach(child => {
            child.remove()
        })
    }
    if(username === undefined && password === undefined){
        let li = document.createElement('li')
        li.innerHTML = "Password is incorrect"
        errors().append(li)
    }else if (!(Array.isArray(username) || Array.isArray(password))){
        sessionForm().style.display = "none"
        signInId = id
        backendUserRecipes()
    }else
    {
        username.forEach(error => {
            let li = document.createElement('li')
            li.innerHTML = 'User Name ' + error
            errors().append(li)
        })
        password.forEach(error => {
            let li = document.createElement('li')
            li.innerHTML = 'Password ' + error
            errors().append(li)
            
        })    
    }
}

document.addEventListener('DOMContentLoaded', function(){
    recipeNav().appendChild(buttonCreator('Random Recipe', '', ''))
    recipeNav().appendChild(buttonCreator('Save Recipe', '', ''))
    recipeNav().appendChild(buttonCreator('Clear Recipe'))
    recipeNav().appendChild(buttonCreator('My Recipes'))
    randomRecipeEvent()
    saveRecipeEvent()
    clearRecipeEvent()
    sessionFormEvent()
    userRecipesEvent()
    
});

// END EVENT LISTENERS
