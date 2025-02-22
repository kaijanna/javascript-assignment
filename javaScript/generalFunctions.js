 function updateCartCountTotal(counter){
  const cartCount = document.getElementById('cartCount')
  console.log(counter)
  cartCount.textContent = counter;
}

export function initialCartLoade(){
  const cart = JSON.parse(localStorage.getItem('cart'))
  updateCartCountTotal(cart?.length || 0 );
}
initialCartLoade()