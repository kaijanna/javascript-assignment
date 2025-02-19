console.log("sjekke at den er linket til siden")

const container = document.querySelector("#movie")
const sortContainer = document.querySelector("#sortByGenre")

async function getMovies() {
    try{
        const response = await fetch ("https://v2.api.noroff.dev/square-eyes")
        const data = await response.json()
        const products = data.data
        console.log(data)

        

        createMovieList(products)

        createMovieByGenre(products)
        


    }catch (err) {
        console.error('Error fetching products:',err)
    }
    
}
getMovies()



function createMovieList(products){

    products.forEach(product =>{

        const card = document.createElement("div")
        const image = document.createElement("img")
        const content = document.createElement("div")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const genre = document.createElement("h3")

        //buttons
        const goToLink = document.createElement("a")
        const goToMovie = document.createElement("button")
        const addToCart =  document.createElement("a")
        const addToCartBtn = document.createElement("button")

        card.className = 'card'
        image.className = 'card-image'
        content.className = 'card-contet'
        title.className = 'card-title'
        price.className = 'card-price'


        //buttons
        goToMovie.className = 'button'
        addToCartBtn.className = 'button'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = "$" + product.price
        genre.textContent = product.genre
        //buttons
        goToLink.href = `movie-info.html?id=${product.id}`
        goToMovie.textContent = "Go to movie"
        addToCart.href = `cart.html?id=${product.id}`
        addToCartBtn.textContent = "Add to cart"
        

        content.appendChild(title)
        content.appendChild(price)
        card.appendChild(genre)
        card.appendChild(image)
        card.appendChild(content)
        content.appendChild(addToCart)
        addToCart.appendChild(addToCartBtn)
        content.appendChild(goToLink)
        goToLink.appendChild(goToMovie)
        
        

        movie.appendChild(card)


    })
}


// sort movie my genre 

function createMovieByGenre(products){


   // products.forEach(productGenre =>{

     //   const card = document.createElement("div")
      //  const genre = document.createElement("h2")

       // card.classname = 'sort-card'
       // genre.className = 'sort-name'

       // genre.textContent = productGenre.genre

       // card.appendChild(genre)

       //sortContainer.appendChild(card)

     //if (productGenre.genre == productGenre.genre){
     //   return ;
    // }
        

  //  })
}