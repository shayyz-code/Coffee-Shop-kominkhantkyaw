const nav = document.getElementById('nav');
const openBtn = document.getElementById('open-btn');

openBtn.addEventListener('click', () => {
    render(searchInp, shoppingCart);
    nav.classList.toggle('open-menu');
    // searchInp.classList.remove('open-search_inp');
});

// ===========SEARCH_BAR & SHOPPING-CART===========

const searchBtn = document.getElementById('search-btn');
const searchInp = document.querySelector('.search_inp');
const shoppingCart = document.querySelector('.shopping-cart');
const cartBtn = document.getElementById('cart-shopping');

searchBtn.addEventListener('click', () => {
    render(nav, shoppingCart);
    searchInp.classList.toggle('open-search_inp');
    // nav.classList.remove('open-menu');
});

cartBtn.addEventListener('click', () => {
    render(searchInp, nav);
    shoppingCart.classList.toggle('card-active');
})

function render(a, b) {
    a.classList.remove('open-menu');
    b.classList.remove('open-menu');
    a.classList.remove('open-search_inp');
    b.classList.remove('card-active');
}


// ==============ONSCROLL================
window.onscroll = () => {
    searchInp.classList.remove('open-search_inp');
    shoppingCart.classList.remove('card-active');
    nav.classList.remove('open-menu');
}


// ==============SHOPPING-CART==============

let shop = document.getElementById('product-cards');

let product_items = [{
    id: 1,
    img: 'images/product-1.png',
    name: 'Nicaragua - Fresh Coffee',
    price: 15.99,
    sale: 20.99
},
{
    id: 2,
    img: 'images/product-2.png',
    name: 'Columbia - Strong Coffee',
    price: 20.99,
    sale: 25.99
},
{
    id: 3,
    img: 'images/product-3.png',
    name: 'Peru - Normal Coffee',
    price: 18.99,
    sale: 23.99
}];


let generateShop = () => {
    shop.innerHTML = product_items.map((item) => {
       let {id,img,name,price, sale} = item;
        return `
                    <div class="card text-center" id='product-item-${id}'>
                        <div id=${id} class="product-btns">
                            <button onclick="sendCard(${id})" class="sebet"><i class="fa-solid fa-cart-shopping"></i></button>
                            <button class="heart"><i class="fa-solid fa-heart"></i></button>
                            <button class="eye"><i class="fa-solid fa-eye"></i></button>
                        </div>
                        <img src=${img} 
                        alt='product- ${id}' class="card-img" id='img-${id}'>
                        <h4>${name}</h4>
                        <div class="stars">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div>
                        <p>$${price} <del>$${sale}</del></p>
                    </div>
        `
    }).join('');
};
generateShop();




//===================== CART==================
let myShopArr = [];
let shopCart = document.querySelector('.shopping-cart');

let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myShopArr'));
// localStorage.clear()   LOCALSTORAGE-I TEMIZLEMEK UCUN
if(leadsFromLocalStorage){
    myShopArr = leadsFromLocalStorage;
    createList(myShopArr);
}

function createList(myShopArr) {
    let listItems = '';
    myShopArr.map(item=>{
        let { id, img, name, price} = item; 
        listItems += `
                     <div id='${id}' class="shop-card">
                         <div class="prod-item">
                                 <img src=${img} alt="cart-1">
                                 <div class="item-desc">
                                     <h3>${name}</h3>
                                     <p>$${price}</p>
                                 </div>
                         </div>
                         <div onclick="deleteItem(${id})" class="close-btn">
                                 <i class="fa-solid fa-xmark"></i>
                         </div>
                     </div>
    
            `
    }).join('');
    shopCart.innerHTML = listItems;
}



// Add to LocalStorage Onclick button
function sendCard(id) {
    let selected = product_items[id - 1];
        myShopArr.push(selected);
    let send = JSON.stringify(myShopArr);
    localStorage.setItem('myShopArr',send);
    createList(myShopArr);
}


//  Delete From Localstorage Onclick button
function deleteItem(id) {
    let selectedItem = document.getElementById(id);
    myShopArr = myShopArr.filter((x)=>x.id!=selectedItem.id);
    localStorage.setItem('myShopArr', JSON.stringify(myShopArr));
    createList(myShopArr);
}



// sendCard();