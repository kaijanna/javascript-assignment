const container = document.querySelector("#productContainer")


async function fetchAndCreateProducts() {
    try{
        const response = await fetch ("https://v2.api.noroff.dev/square-eyes")
        const data = await response.json()
        const products = data.data

        products.forEach(product => {
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
            genre.className = 'card-genre'
            
           

            image.src = product.image.url
            image.alt = product.image.alt
            title.textContent = product.title
            price.textContent = product.price
            genre.textContent = product.genre
            
            

            content.appendChild(title)
            content.appendChild(genre)
            content.appendChild(price)
            card.appendChild(genre)
            card.appendChild(image)
            card.appendChild(content)

            container.appendChild(card)


        });
        
    } catch (err) {
        console.error('Error fetching products:',err)
    }
    
}
fetchAndCreateProducts()
