class User{
    constructor(id, username){
        this.id = id
        this.username = username
    }

    static sessionLog(){
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
            
            this.checkUser(user.id, user.username, user.password)
            return true
        })
        return false
    }
    
    static checkUser(id, username, password){
        if(errors().children){
            Array.prototype.slice.call(errors().children).forEach(child => {
                child.remove()
            })
        }
        if(username === undefined && password === undefined){
            let li = document.createElement('li')
            li.innerHTML = "Password is incorrect"
            errors().append(li)
            return false
        }else if (!(Array.isArray(username) || Array.isArray(password))){
            sessionForm().style.display = "none"
            signInId = id
            User.backendUserRecipes()
            return true
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
            return false
        }
    }

    static backendUserRecipes(){
    
        let ul = document.createElement('ul')
        recipeDisplay().append(ul)
        fetch(railsURL + 'users/' + signInId + '/recipes')
            .then(resp => resp.json())
            .then((recipes) => {
                console.log(recipes)
                Recipe.createRecipes(recipes)
        })
    }
}