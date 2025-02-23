const movieContainer = document.querySelector("#movieDetails")

const movieId = new URLSearchParams(window.location.search)
const loadingIndicator = document.getElementById("loading");

const id = movieId.get(`id`)



async function getMovieByIdAndCreate() {
    loadingIndicator.innerHTML = "<p>Loading movies...</p>";
    try {
        const response = await fetch (`https://v2.api.noroff.dev/square-eyes/${id}`)
        const data = await response.json()
        const product = data.data
        

       displayMovie(product)


        

    }catch (err) {
        loadingIndicator.innerHTML = ""
        movieContainer.innerHTML = "oh no, something went wrong.."
        console.error('Error fetching products:',err)
    }
    
}


function displayMovie(product){

   loadingIndicator.innerHTML = ""
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