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

// FUNCTIONS TO CREATE BUTTONS
const buttonCreator = (text, classOption = "", styleOption = "") =>  {
    const button = document.createElement('button')
    button.id = text
    button.className = classOption
    button.style = styleOption
    button.innerText = text
    return button;
}

// EVENT LISTENERS
const randomRecipeEvent = function(){
    recipeButton().addEventListener('click', (e) => {
        randomRecipe()
    })
}
const saveRecipeEvent = function(){
    saveRecipeButton().addEventListener('click', (e) => {
        saveRecipe()
    })
}

function haveRecipe(){
    if (recipeDisplay().childElementCount > 0){
        if ()
    }
}

document.addEventListener('DOMContentLoaded', function(){
    recipeNav().appendChild(buttonCreator('Random Recipe', '', ''))
    recipeNav().appendChild(buttonCreator('Save Recipe', '', ''))
    randomRecipeEvent()
    saveRecipeEvent()

});

// FUNCTION THAT CREATES RANDOM RECIPE USING FETCH

function randomRecipe(){
    const elements = []
    const title = document.createElement('h1')
    title.id = 'title'
    const summary = document.createElement('p')
    summary.id = 'summary'
    const instructions = document.createElement('div')
    instructions.id = 'instructions'      
    
    elements.push(title, summary, instructions)

    fetch(recipeURL + 'random?number=1&' + apiKey)
        .then(response => response.json())
        .then(data => {
            title.innerHTML = (data.recipes[0].title)
            summary.innerHTML += "<br>" + data.recipes[0].summary
            instructions.innerHTML = "<br>" + data.recipes[0].instructions
        });

    function appendDisplays(arrayOfElements){
        
        let children = Array.prototype.slice.call( recipeDisplay().children )
        if (children.length > 0){
            for (const index in children){
                recipeDisplay().removeChild(children[index])
            }
        }
        arrayOfElements.forEach(el => {
            recipeDisplay().appendChild(el)
        })

    }

    appendDisplays(elements)

    
}

// FUNCTION THAT SAVES RECIPE INTO RAILS BACKEND
function saveRecipe(){
    const strongParams = {
        recipe: {
            title: document.getElementById('title').innerText,
            summary: document.getElementById('summary').innerText,
            instructions: document.getElementById('instructions').innerHTML
        }
    }
    fetch(railsURL + 'recipes', {
        method: 'post',
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(strongParams)
    })
    .then(resp => resp.json())
    .then(recipe => {
        console.log(recipe)
    })

}




