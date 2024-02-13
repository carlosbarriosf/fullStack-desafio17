const cartBtn = document.querySelector('[data-cart-button]');
const cart = document.querySelector('[data-cart]');
const emptyCart = document.querySelector('[data-empty-cart]');
const totalContainer = document.querySelector('[data-total-container]');

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

