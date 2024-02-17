const cartBtn = document.querySelector('[data-cart-button]');
const cart = document.querySelector('[data-cart]');
const emptyCart = document.querySelector('[data-empty-cart]');
const totalContainer = document.querySelector('[data-total-container]');

document.addEventListener('click', (e) => {
    console.log(e.target)
    let parent = findParent(e.target);
    console.log(parent === cartBtn)
    console.log(cart.contains(e.target))
    if(parent !== cartBtn) { 
        if(!cart.contains(e.target)) {
            cart.classList.remove('cartToggle')
        }
    }

})

function findParent(element) {
    while (element && element !== document.body) {
      if (element.tagName === 'BUTTON') {
        return element;
      }
      element = element.parentNode;
    }
    return null;
  }


cartBtn.addEventListener('click', () => {
    cart.classList.toggle('cartToggle');
    if(cart.querySelector('.cart__order')) {
        emptyCart.style.display = 'none';
        totalContainer.style.display = 'flex';
    } else {
        emptyCart.style.display = 'flex';
    }
})

const goToMenuBtn = document.querySelector('[data-goToMenu]');
goToMenuBtn.addEventListener('click', () => {
    cart.classList.toggle('cartToggle');
})
