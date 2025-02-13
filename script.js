const container = document.querySelector("#movieDetails")


async function fetchAndCreateProductsById() {
    try{
        const response = await fetch ("https://v2.api.noroff.dev/square-eyes/<id>") // og her forstår jeg ikke hvordan man skal hente produkter med id, får bare feil når jeg setter den inn her
        const data = await response.json()
        const products = data.data // skal det være id typ her, isteden for data? 
        console.log(data)
        
    } catch (err) {
        console.error('Error fetching products:',err)
    }
    
}
fetchAndCreateProductsById()
