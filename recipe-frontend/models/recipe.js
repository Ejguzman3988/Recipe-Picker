class Recipe{
    static all = []
    
    constructor(id, title, summary, instructions, saved = false){
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.instructions = instructions;
        this.saved = saved
    }

    display(){
        const thisRecipe = this
        
        clearRecipe()
        
        // Create Elements
        const title = document.createElement('h1')
        const summary = document.createElement('p')
        const instructions = document.createElement('div')
        const editButton = buttonCreator('Edit Recipe', '', '')
        const deleteButton = buttonCreator('Delete Recipe', '', '')


        // Set Ids
        title.id = 'title'
        summary.id = 'summary'
        instructions.id = 'instructions' 
        
        // Set values
        title.innerText = this.title
        summary.innerHTML = this.summary
        instructions.innerHTML = this.instructions 

        // Event Listener for buttons
        editButton.addEventListener('click', editEvent)
        deleteButton.addEventListener('click', deleteEvent)

        function editEvent(e){
                
            let oldForm = document.getElementById('edit form')
            if (oldForm){
                oldForm.remove()
            }
            
            const form = document.createElement('form')
            const titleInput = document.createElement('input')
            const summaryInput = document.createElement('textarea')
            const instructionsInput = document.createElement('textarea')
            const submitFormButton = buttonCreator('Update Recipe')
            
            form.id = "edit form"
            titleInput.type = 'text'
            summaryInput.col = "30"
            summaryInput.row = "20"
            instructionsInput.col = "30"
            instructionsInput.row = "20"
        
            titleInput.value = title.innerHTML
            summaryInput.value = summary.innerHTML
            instructionsInput.value = instructions.innerHTML
        
            submitFormButton.addEventListener('click', function(e){
                e.preventDefault()
                
                const strongParams = {
                    recipe: {
                        title: titleInput.value,
                        summary: summaryInput.value,
                        instructions: instructionsInput.value
                    },
                    user_id: signInId
                }
        
                fetch(railsURL + 'users/' + signInId + "/recipes/" + thisRecipe.id,{
                    method: 'PATCH',
                    headers: {
                        "accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(strongParams)
                })
                .then(resp => resp.json())
                .then((recipe) => {
                    thisRecipe.title = recipe.title
                    thisRecipe.summary = recipe.summary
                    thisRecipe.instructions = recipe.instructions
                    console.log(recipe)
                    thisRecipe.display()
                })   
            })
        
            form.append(titleInput, summaryInput, instructionsInput, submitFormButton)
        
            recipeDisplay().prepend(form)
        
            editButton.remove()
        
        
        }
        
        function deleteEvent(e){
           
            const strongParams = {
                recipe: {
                    title: document.getElementById('title').innerText,
                    summary: document.getElementById('summary').innerText,
                    instructions: document.getElementById('instructions').innerHTML
                },
                user_id: signInId
            }
        
            fetch(railsURL + 'users/' + signInId + "/recipes/" + thisRecipe.id,{
                method: 'DELETE',
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(strongParams)
            })
            .then(resp => resp.json())
            .then((recipe) => {
                console.log(recipe)
                let index = Recipe.all.findIndex(obj => obj.id === recipe.id)
                Recipe.all.splice(index, 1)
                Recipe.displayRecipes()
            })  
        }
    

        // Append to the display
        recipeDisplay().appendChild(title)
        if (Recipe.all.find(recipe => recipe.title === this.title)){
            recipeDisplay().appendChild(editButton)
            recipeDisplay().appendChild(deleteButton)
        }
        recipeDisplay().appendChild(summary)
        recipeDisplay().appendChild(instructions)

    }

    static createRecipes(recipes){
        Recipe.all = []
        recipes.forEach(recipe => Recipe.create(recipe.id, recipe.title, recipe.summary, recipe.instructions))
    }


    static create(id, title, summary, instructions, saved=false){
        let recipe = new Recipe(id, title, summary, instructions, saved)

        Recipe.all.push(recipe)
        return recipe
    }

    static displayRecipes(fetched = false){
        clearRecipe()
        let ul = document.createElement('ul')
        recipeDisplay().append(ul)
        Recipe.all.forEach(recipe => {
            let li = document.createElement('li')
            li.innerHTML = recipe.title
            ul.append(li)
            if (fetched){
                li.addEventListener('click', function(){
                    fetch(`https://api.spoonacular.com/recipes/${recipe.id}/information?` +  apiKey2)
                        .then(resp => resp.json())
                        .then(newRecipe => {
                            console.log(`https://api.spoonacular.com/recipes/${recipe.id}/information` + apiKey2)
                            recipe.summary = newRecipe.summary
                            recipe.instructions = newRecipe.instructions
                            recipe.display()
                        })
                })
            }else{
                li.addEventListener('click', function(){
                    recipe.display()
                })
            }
        })
    }
    static saveRecipe(){
        let recipeTitle = document.getElementById('title').innerText
        let recipe = this.find_by_title(recipeTitle)
        
        if (recipe.saved){
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
            let newRecipe = Recipe.create(recipe.id, recipe.title, recipe.summary, recipe.instructions, true)
            newRecipe.display()
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

    static haveRecipe(){
        if (document.getElementById('summary')){
            return true
        }
        else{
            return false
        }
    }

    // FUNCTION THAT CREATES RANDOM RECIPE USING FETCH

    static randomRecipe(){

        fetch(recipeURL + 'random?number=1&' + apiKey2)
        .then(response => response.json())
        .then(recipesArray => {
            let randomRecipe = recipesArray.recipes[0]
            const newRecipe = new Recipe(randomRecipe.id, randomRecipe.title, randomRecipe.summary, randomRecipe.instructions)
            newRecipe.display()
        });
    
    }

    
    }