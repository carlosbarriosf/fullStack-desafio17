import menu from '../menu.json' assert { type: 'json' };



const menuItems = Array.from(document.querySelectorAll('[data-menu-item]'));

let activeItem = null;

//Initializing the cart
const cart = [];

//variable that holds the number of the same dish
let counter = 0;


document.addEventListener('click', (e) => {
    menuItems.forEach(item => {
        if(!item.contains(e.target)) {
            const controls = item.querySelector('[data-controls]');
            const quantity = item.querySelector('[data-item-quantity]');
            controls.style = 'pointer-events: none; opacity: 0;';
            quantity.innerText = "";
            counter = 0;

        }
    })
})


let totalPriceSum = 0;


menuItems.forEach(item => {
    
    const controls = item.querySelector('[data-controls]');
    const quantity = item.querySelector('[data-item-quantity]');
    item.addEventListener('click', (e) => {

        const cart = document.querySelector('[data-cart]');
        cart.classList.remove('cartToggle')

        if (activeItem && activeItem !== item) {
            const prevControls = activeItem.querySelector('[data-controls]');
            const prevQuantity = activeItem.querySelector('[data-item-quantity]');
            prevControls.style = 'pointer-events: none; opacity: 0;';
            counter = 0;
            prevQuantity.innerText = "";
        }

        controls.style = 'pointer-events: all; opacity: 1;';
        activeItem = item;


        const target = e.target;

        if(target.hasAttribute('data-plus')) {
            if(counter < 20) {
                counter++
                quantity.innerText = counter;
            }
        }

        if(target.hasAttribute('data-minus')) {
            if(counter > 1) {
                counter--
                quantity.innerText = counter;
            }
        }
        e.stopPropagation();
    })

    const addOrder = item.querySelector('[data-addToCart]');
    addOrder.addEventListener('click', () => {
        // console.log(item)
        const dish = item.querySelector('[data-dish]').innerText;
        const itemIndexInMenu = menu.findIndex(element => element.name === dish);
        // console.log(itemIndexInMenu)
        const order = {};
        if(counter > 0) {

            order.dish = menu[itemIndexInMenu].name;
            order.quantity = counter;
            order.individualPrice = menu[itemIndexInMenu].price;
            order.subtotal = counter * menu[itemIndexInMenu].price;

            cart.push(order);
            console.log(cart);
        }
        console.log(order)

        //code to fill the cart aside element
        
        function isEmptyObject(obj) {
            return Object.keys(obj).length === 0;
        }
        
        if(!isEmptyObject(order)) {
            const orderTemplate = document.querySelector('[data-order-template]');
            const orderElement = orderTemplate.content.cloneNode(true).children[0];
            // console.log(orderElement)
            const orderDish = orderElement.querySelector('[data-order-dish]');
            orderDish.innerText = order.dish;
            const orderQuantity = orderElement.querySelector('[data-order-quantity]');
            orderQuantity.innerText = `Cantidad ${order.quantity}`;
            const orderPrice = orderElement.querySelector('[data-order-price]');
            orderPrice.innerText = `$${order.individualPrice}`;
            const orderSubtotal = orderElement.querySelector('[data-order-subtotal]');
            orderSubtotal.innerText = `Subtotal: $${order.subtotal}`;

            const cartSummaryElement = document.querySelector('[data-summary]');
            cartSummaryElement.appendChild(orderElement);

            const subtotalArray = cart.map( order => order.subtotal)
            // console.log(subtotalArray)
            const initialValue = 0;
            totalPriceSum = subtotalArray.reduce((acummulator, currentvalue) => acummulator + currentvalue, initialValue,)
            // console.log(totalPriceSum)

            const totalPriceElement = document.querySelector('[data-total-price]');
            totalPriceElement.innerText = `$ ${totalPriceSum}`;

            const cartCount = document.querySelector('[data-cart-count]');
            cartCount.innerText = cart.length;
            cartCount.style.opacity = '1';


        }
        counter = 0;
        quantity.innerText = "";
    })
})

const sendOrderBtn = document.querySelector('[data-send-order]');
const formModal = document.querySelector('[data-form-modal]')
const closeModalBtn = document.querySelector('[data-close-modal]');
const successModal = document.querySelector('[data-success-modal]');



closeModalBtn.addEventListener('click', () => {
    formModal.close();
})

sendOrderBtn.addEventListener('click', () => {
    formModal.showModal();
})

const sendOrderForm = document.querySelector('[data-send-form]');

sendOrderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('first')
    
    const finalOrderTemplate = document.querySelector('[data-success-modal-template]');
    // console.log(finalOrderTemplate)
    const finalOrderContainer = finalOrderTemplate.content.cloneNode(true).children[0];
    // console.log(finalOrderContainer)

    cart.forEach(order => {
        console.log(order)
        const p = document.createElement('p');
        p.innerText = `${order.quantity} ${order.dish}`;
        finalOrderContainer.appendChild(p);
    })

    const finalPrice = document.createElement('p');
    finalPrice.classList.add('finalPrice')
    finalPrice.innerText = `Total:  $${totalPriceSum}`;

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.classList.add('submit-btn');
    closeBtn.innerText = 'Cerrar';
    closeBtn.addEventListener('click', () => {
        successModal.close();
        location.reload()
    })

    const btnContainer = document.createElement('div');
    btnContainer.style = 'display: flex; width: 100%; justify-content: center; margin-top: 0.5rem';
    btnContainer.appendChild(closeBtn)


    successModal.appendChild(finalOrderContainer);
    successModal.appendChild(finalPrice);
    successModal.appendChild(btnContainer);

    formModal.close();
    successModal.showModal();
})









