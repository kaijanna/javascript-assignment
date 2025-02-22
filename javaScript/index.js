const API_URL = 'https://v2.api.noroff.dev/square-eyes'
const container = document.querySelector("#movieContainer")
//const movieFilter = document.querySelector("#filter") 
const movieFilter = document.querySelector("#movieByGenre") 


async function doFetch(url) {
    try{
        const response = await fetch (url)
        const data = await response.json()
        return data;
       
    }catch (err) {
        console.error('Error fetching products:',err)
    }  
}
// prøvde noe her ved å ha en option i html, med de verdiene på filmene altså genre , som den kan forandre verdien av når man trykker på den, men 
// nå ble jo alt borte, så har jo tenkt noe feil hehe, men har prøvd noe og ikke slette igjen da, håper tanken var en smule i riktig retning kanskje, sikker ikke helt hehe


async function getMovies() {
    // legge til loading her
     const data = await doFetch (API_URL)
     const products = data.data
       // console.log(data)
       

       
    

    
        createMovieList(products)    
        
}
getMovies()

movieFilter.addEventListener("change", function(){
    const testValgAvGenre = this.value

    fetch(API_URL)
    .then(response => response.json())
    .then(products => {
        if (testValgAvGenre === "all") {
            createMovieList(products)
        } else {
            const movieFilterd = products.filter(product => product.genre === testValgAvGenre)
            createMovieList(movieFilterd)
        }
    })

})



//cart functions    
function addMovieToCart(product){
    const cart = JSON.parse(localStorage.getItem('cart'))
    console.log('add to cart was clicked')
    console.log(cart)
    

    if (cart === null){
        localStorage.setItem('cart', JSON.stringify( [product]))
        updateCartCountTotal(1);
    } else{
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        updateCartCountTotal(cart.length);
    }
}

function updateCartCountTotal(counter){
    const cartCount = document.getElementById('cartCount')
    console.log(counter)
    cartCount.textContent = counter;
}


function createMovieList(products){

    // fjerne loading når du kommer her
    products.forEach(product =>{

        const card = document.createElement("div")
        const image = document.createElement("img")
        const content = document.createElement("div")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const genre = document.createElement("h3")

        card.className = 'card'
        image.className = 'card-image'
        content.className = 'card-content'
        title.className = 'card-title'
        price.className = 'card-price'
        


        //buttons
        const goToLink = document.createElement("a")
        const goToMovie = document.createElement("button")
        const addToCartBtn = document.createElement("button")

        goToMovie.className = 'button'
        addToCartBtn.className = 'button'

        goToLink.href = `movie-info.html?id=${product.id}`
        goToMovie.textContent = "Go to movie"
        addToCartBtn.textContent = "Add to cart"
        //addEventListener to button(add to cart button)
        //notat til meg selv, ()=> addtoblabla() er det samme som function, bare skrevet kortere
        addToCartBtn.addEventListener('click',() => addMovieToCart(product))

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = "$" + product.price
        genre.textContent = product.genre
       
        content.appendChild(title)
        content.appendChild(price)
        card.appendChild(genre)
        card.appendChild(image)
        card.appendChild(content)
        content.appendChild(addToCartBtn)
        content.appendChild(goToLink)
        goToLink.appendChild(goToMovie)
        
        movieContainer.appendChild(card)


    })   
}

