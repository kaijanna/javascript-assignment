 function updateCartCountTotal(counter){
  const cartCount = document.getElementById('cartCount')
  
  cartCount.textContent = counter;
}

export function initialCartLoade(){
  const cart = JSON.parse(localStorage.getItem('cart'))
  updateCartCountTotal(cart?.length || 0 );
}
initialCartLoade()