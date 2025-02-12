console.log("sjekke at den er linket til siden")

const container = document.querySelector("#movie")

async function getMovies() {
    try{
        const response = await fetch ("https://v2.api.noroff.dev/square-eyes")
        const data = await response.json()
        const products = data.data
        console.log(data)

        products.forEach(product => {
            const card = document.createElement("div")
            const image = document.createElement("img")
            const content = document.createElement("div")
            const title = document.createElement("h2")
            const price = document.createElement("p")
           // const button = document.createElement("a")

            card.className = 'card'
            image.className = 'card-image'
            content.className = 'card-contet'
            title.className = 'card-title'
            price.className = 'card-price'
           // button.className = 'card-button'

            image.src = product.image.url
            image.alt = product.image.alt
            title.textContent = product.title
            price.textContent = product.price
           // a.textContent = "cart.html"

            content.appendChild(title)
            content.appendChild(price)
           // content.appendChild(button)
            card.appendChild(image)
            card.appendChild(content)

            container.appendChild(card)

            
        });

    }catch (err) {
        console.error('Error fetching products:',err)
    }
    
}
getMovies()


