const movieContainer = document.querySelector("#movieDetails")

const movieId = new URLSearchParams(window.location.search)

const id = movieId.get(`id`)



async function getMovieByIdAndCreate() {
// start loader
    try {
        const response = await fetch (`https://v2.api.noroff.dev/square-eyes/${id}`)
        const data = await response.json()
        const product = data.data
        console.log(product)

       displayMovie(product)


        

    }catch (err) {
        // fjern loader og erstatte med feilmelding til sluttbruker
        movieContainer.innerHTML = "Åneiiii noe gikk feil esj"
        console.error('Error fetching products:',err)
    }
    
}


function displayMovie(product){

   // stop loader
    movieContainer.innerHTML=`
    
     <div class="singel-movie-info">
             <img src="${product.image.url}" class="movie-singel-img" alt="${product.image.alt} ">
             <h1 class="movieTitel">${product.title}</h1>
            <p class="movieP">${product.description}</p>
             <h3 class="moviePrice">$${product.price}</h3>
             <div class="button-container">
                
                 <button class="go-back"><a href="index.html">back to movies</a></button>
              </div>      
         </div>
     `
}

getMovieByIdAndCreate()

//<button class="add-to-cart-btn" > Add to cart</button>