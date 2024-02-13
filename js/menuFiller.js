const menuItemTemplate = document.querySelector('[data-item-template]');

const menuContainer = document.getElementById('menuContainer');

import menu from '../menu.json' assert { type: 'json' };


menu.forEach(item => {
    const menuItem = menuItemTemplate.content.cloneNode(true).children[0];
    const dish = menuItem.querySelector('[data-dish]');
    dish.innerText = item.name;
    const description = menuItem.querySelector('[data-desc]');
    description.innerText = item.desc;
    const price = menuItem.querySelector('[data-price]');
    price.innerText = `$ ${item.price}`;

    menuContainer.append(menuItem)
})