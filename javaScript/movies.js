const movieListEl = document.querySelector("#movieList")

async function getMovies() {
    try{
        const response = await fetch ("https://v2.api.noroff.dev/square-eyes")
        const data = await response.json()
        const products = data.data
        console.log(data)

        createMovieList(products)

    }catch (err) {
        console.error('Error getting the movies:',err)  
        }

}


getMovies()

function createMovieList(products){

    products.forEach(product => {
        const card = document.createElement("div")
        const image = document.createElement("img")
        const content = document.createElement("div")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const a = document.createElement("a")
        const button = document.createElement("button")

        card.className = 'card'
        image.className = 'card-image'
        content.className = 'card-contet'
        title.className = 'card-title'
        price.className = 'card-price'
        
        button.className = 'button'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = "$" + product.price
        a.href = `movie-info.html?id=${product.id}`
        button.textContent = "Go to movie"
        

        content.appendChild(title)
        content.appendChild(price)
        card.appendChild(image)
        card.appendChild(content)
        content.appendChild(a)
        a.appendChild(button)
        
        

        movieListEl.appendChild(card)

        
    });

}