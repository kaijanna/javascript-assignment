const filterContainer = document.getElementById("filterWrapper");
const sortSelect = document.getElementById("select-sorting");
const movieContainer = document.querySelector("#movieList");



const filterStorage = () => localStorage.getItem("movie-filter");
const sortStorage = () => localStorage.getItem("movie-sort");

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


function createMovieCard(product) {
  const card = document.createElement("li");
  const image = document.createElement("img");
  const content = document.createElement("div");
  const title = document.createElement("h2");
  const price = document.createElement("p");
  const genre = document.createElement("h3");


  //buttons
  const goToLink = document.createElement("a");
  const goToMovie = document.createElement("button");
  const addToCartBtn = document.createElement("button");


  card.className = "card";
  image.className = "card-image";
  content.className = "card-contet";
  title.className = "card-title";
  price.className = "card-price";


  //buttons
  goToMovie.className = "button";
  addToCartBtn.className = "button";


  image.src = product.image.url;
  image.alt = product.image.alt;
  title.textContent = product.title;
  price.textContent = "$" + product.price;
  genre.textContent = product.genre;
  //buttons
  goToLink.href = `movie-info.html?id=${product.id}`;
  goToMovie.textContent = "Go to movie";
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.addEventListener('click',() => addMovieToCart(product))


  content.appendChild(title);
  content.appendChild(price);
  card.appendChild(genre);
  card.appendChild(image);
  card.appendChild(content);
  content.appendChild(addToCartBtn);


  content.appendChild(goToLink);
  goToLink.appendChild(goToMovie);


  movieContainer.appendChild(card);
}



function sortAndFilterMovies(movies, genre, sort) {
  movieContainer.innerHTML = "";


  const filteredMovies =
    genre === "Alle"
      ? movies
      : movies.filter((movie) => {
          return genre ? movie.genre === genre : true;
        });


  const useSort = sort || sortStorage();


  filteredMovies.sort((a, b) => {
    nameA = a[useSort || "title"];
    nameB = b[useSort || "title"];
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });
  filteredMovies.forEach((movie) => {
    createMovieCard(movie);
  });
}



function createGenreSelectElement(selectArray, movies) {
  const selectList = document.createElement("select");
  selectList.onchange = (e) => {
    sortAndFilterMovies(movies, e.target.value);
    localStorage.setItem("movie-filter", e.target.value);
  };
  selectList.id = "filter-genre";


  const selectLabel = document.createElement("label");
  selectLabel.textContent = "Vis sjanger";
  selectLabel.htmlFor = "filter-genre";


  filterContainer.appendChild(selectLabel);
  filterContainer.appendChild(selectList);


  selectArray.forEach((obj) => {
    const option = document.createElement("option");
    option.value = obj;
    option.text = obj;
    selectList.appendChild(option);
  });
  selectList.value = filterStorage();
}



async function getMovies() {
  try {
    const response = await fetch("https://v2.api.noroff.dev/square-eyes");
    const data = await response.json();
    const movies = data.data;


    
    const uniqueGenreArray = [...new Set(movies.map((movie) => movie.genre))];


    createGenreSelectElement(["Alle", ...uniqueGenreArray], movies);


    sortSelect.value = sortStorage() || "title";
    sortAndFilterMovies(movies, filterStorage());


    
    sortSelect.addEventListener("change", (e) => {
      localStorage.setItem("movie-sort", e.target.value);
      sortAndFilterMovies(movies, filterStorage(), e.target.value);
    });
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
}


getMovies();


