class Recipe{
    static all = []
    
    constructor(id, title, summary, instructions){
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.instructions = instructions;
    }

    display(){
        clearRecipe()
        
        const title = document.createElement('h1')
        const summary = document.createElement('p')
        const instructions = document.createElement('div')
        
        title.id = 'title'
        summary.id = 'summary'
        instructions.id = 'instructions' 
        
        title.innerText = this.title
        summary.innerHTML = this.summary
        instructions.innerHTML = this.instructions 
        
        recipeDisplay().appendChild(title)
        recipeDisplay().appendChild(summary)
        recipeDisplay().appendChild(instructions)

    }

    displayList(){
        
    }

    static createRecipes(recipes){
        recipes.forEach(recipe => Recipe.create(recipe.id, recipe.title, recipe.summary, recipe.instructions))
    }

    static create(id, title, summary, instructions){
        let recipe = new Recipe(id, title, summary, instructions)

        Recipe.all.push(recipe)
        return recipe
    }

    static displayRecipes(){
        clearRecipe()
        let ul = document.createElement('ul')
        recipeDisplay().append(ul)
        Recipe.all.forEach(recipe => {
            let li = document.createElement('li')
            li.innerHTML = recipe.title
            ul.append(li)
            li.addEventListener('click', function(){
                recipe.display()
            })
        })
    }
    static saveRecipe(){
        let recipeTitle = document.getElementById('title').innerText
        if (this.find_by_title(recipeTitle)){
            alert('You have already saved this recipe.')
            return false
        }
        
        const strongParams = {
            recipe: {
                title: document.getElementById('title').innerText,
                summary: document.getElementById('summary').innerText,
                instructions: document.getElementById('instructions').innerHTML
            },
            user_id: signInId
        }
        fetch(railsURL + 'users/' + signInId + '/recipes', {
            method: 'POST',
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(strongParams)
        })
        .then(resp => resp.json())
        .then((recipe) => {
            Recipe.create(recipe.id, recipe.title, recipe.summary, recipe.instructions)
        })
        
    }

    static find_by_title(recipeTitle){
        for(let recipe of Recipe.all){
            if (recipe.title === recipeTitle){
                return recipe
            }
        }
        return false
    }

}