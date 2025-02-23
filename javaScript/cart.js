import { initialCartLoade } from "./generalFunctions.js";
const totalPriceEl = document.querySelector("#totalPrice")
const itemsInCart = document.querySelector("#itemsInCart")
const checkOutBtnEl = document.querySelector("#checkOutBtn")

checkOutBtn

function populateCart(cart){
  itemsInCart.innerHTML = ""

  const cartWithMultipleItems = []
  let totalPrice = 0;

  
  cart.forEach(item => {
    totalPrice += item.price
    const itemPlacement = cartWithMultipleItems.findIndex((i) => i.id === item.id);

    if (itemPlacement < 0) {
      cartWithMultipleItems.push({...item, amount: 1});
    } else {
      cartWithMultipleItems[itemPlacement].amount += + 1;
    }
  })
  totalPriceEl.innerHTML = "$" + totalPrice 
  

  cartWithMultipleItems.forEach(product => {
        const card = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const amount = document.createElement("p")
        const removeItemBtn = document.createElement("button")

        card.className = 'cart-card'
        image.className = 'cart-img'
        title.className = 'cart-title'
        price.className = 'cart-price'
        removeItemBtn.className = 'button'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title
        price.textContent = "$" + product.price
        amount.textContent = `antall (${product.amount})`
        removeItemBtn.textContent = "remove"
        removeItemBtn.addEventListener('click',() => removeItemFromCart(product.id))

        card.appendChild(image)
        card.appendChild(title)
        card.appendChild(price)
        card.appendChild(amount)
        card.appendChild(removeItemBtn)

        itemsInCart.appendChild(card)
  });

}




function getItemsToCart(){
  const cart = JSON.parse(localStorage.getItem('cart'))
if (!cart) return;
if (!cart?.length) return

populateCart(cart)

}
getItemsToCart()

function removeItemFromCart(productId){
  const cart = JSON.parse(localStorage.getItem('cart'))
  if (!cart) return;
  if (!cart?.length) return

  const newCartArray = cart.filter(product => {
    return product.id !== productId
  })

  localStorage.setItem('cart', JSON.stringify(newCartArray))
  populateCart(newCartArray)
  initialCartLoade()

}

  