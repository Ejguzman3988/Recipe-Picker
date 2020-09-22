class Recipe{
    static all = []
    
    constructor(id, title, summary, instructions){
        this.id = id;
        this.title = title;
        this.summary = summary;
        this.instructions = instructions;
    }

    static createRecipes(recipes){
        recipes.forEach(recipe => Recipe.create((recipe.id, recipe.title, recipe.summary, recipe.instructions)))
    }

    static create(id, title, summary, instructions){
        let recipe = new Recipe(id, title, summary, instructions)

        Recipe.all.push(recipe)
    }

}