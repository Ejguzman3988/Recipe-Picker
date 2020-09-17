const recipeDisplay = () => document.querySelector("#recipe-display");
const recipeURL = "https://api.spoonacular.com/recipes/"
const apiKey = 'apiKey=9e71a494718f43cf801f2261d416465e'

document.addEventListener('DOMContentLoaded', function(){
    randomRecipe()
});

function randomRecipe(){
    const elements = []
    const title = document.createElement('h1')
    const summary = document.createElement('p')
    
    elements.push(title, summary)

    fetch(recipeURL + 'random?number=1&' + apiKey)
        .then(response => response.json())
        .then(data => {
            title.innerHTML = (data.recipes[0].title)
            summary.innerHTML += "<br>" + data.recipes[0].summary
        });

    function appendDisplays(arrayOfElements){
        arrayOfElements.forEach(el => {
            recipeDisplay().appendChild(el)
        })

    }

    appendDisplays(elements)

    
}