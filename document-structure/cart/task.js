const cartList = document.querySelector('.cart__products');

// Изменение количества
const controls = document.querySelectorAll('.product__quantity-control');
[...controls].forEach((control) => {
    control.addEventListener('click', () => {
        let quantity = control.closest('.product__quantity-controls').querySelector('.product__quantity-value');
        if (control.classList.contains('product__quantity-control_dec') && quantity.innerText > 1) {
            quantity.innerText--;
        } else if (control.classList.contains('product__quantity-control_inc')) {
            quantity.innerText++;
        }
    });
});

// Добавление нового товара
const addBtns = document.querySelectorAll('.product__add');
[...addBtns].forEach((add) => {
    add.addEventListener('click', () => {
        addCart(add);
    });
});

function addCart(element, quantity) {
    const prodId = element.closest('.product').dataset.id,
        prodImage = element.closest('.product').querySelector('.product__image'),
        cartProdQnt = cartList.querySelector(`.cart__product[data-id="${prodId}"] .cart__product-count`);

    // если передано количество товара (для localStorage)
    const prodQnt = quantity ? quantity : element.closest('.product').querySelector('.product__quantity-value').innerText;

    // если корзина пустая
    if (!cartList.hasChildNodes()) {
        cartList.closest('.cart').style.display = 'block';
    }

    // если добавляемый товар уже есть
    if (cartProdQnt) {
        cartProdQnt.innerText = Number(cartProdQnt.innerText) + Number(prodQnt);

        // увеличиваем количество в localStorage
        localStorage.setItem(prodId, Number(localStorage.getItem(prodId)) + Number(prodQnt));

        // анимация
        transAnimate(prodImage, cartProdQnt.closest('.cart__product').querySelector('.cart__product-image'));

    } else {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart__product';
        cartItem.dataset.id = prodId;

        cartItem.innerHTML = `<img class="cart__product-image" src="${prodImage.src}">
                            <div class="cart__product-count">${prodQnt}</div>`;

        cartList.appendChild(cartItem);

        // заносим в localStorage
        localStorage.setItem(prodId, prodQnt);
    }
}

// Анимация перемещения изображения
function transAnimate(imgStart, imgEnd) {
    const step = 20,
        moveX = (imgEnd.getBoundingClientRect().x - imgStart.getBoundingClientRect().x) / step,
        moveY = (imgEnd.getBoundingClientRect().y - imgStart.getBoundingClientRect().y) / step,
        imgMove = imgStart.cloneNode(true);

    imgStart.after(imgMove);
    imgMove.style.position = 'fixed';
    imgMove.style.left = imgStart.getBoundingClientRect().x + 'px';
    imgMove.style.top = imgStart.getBoundingClientRect().y + 'px';

    let count = 0;
    const transInterval = setInterval(() => {
        if (count < step) {
            imgMove.style.left = imgMove.getBoundingClientRect().x + moveX + 'px';
            imgMove.style.top = imgMove.getBoundingClientRect().y + moveY + 'px';
            count++;
        } else {
            clearInterval(transInterval);
            imgMove.remove();
        }
    }, 10);
}

// Очистка корзины
const cartClear = document.getElementById('cart__clear');
cartClear.addEventListener('click', () => {
    cartList.innerHTML = '';
    cartList.closest('.cart').style.display = 'none';

    // очищаем localStorage
    localStorage.clear();
});

// Вывод товаров из localStorage
let products = Object.keys(localStorage);
for (let product of products) {
    addCart(document.querySelector(`.product[data-id="${product}"]`), localStorage.getItem(product));
}