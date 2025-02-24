document.addEventListener("DOMContentLoaded", () => {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img class="modal-thumbnail" src="" alt="Pizza Image">
            <h2 class="modal-title"></h2>
            <p class="modal-price"></p>
            <div class="quantity-selector">
                <button class="quantity-decrease">-</button>
                <span class="quantity">1</span>
                <button class="quantity-increase">+</button>
            </div>
            <button class="btn add-to-cart">Ajouter au panier</button>
        </div>
    `;
    
    const modalThumbnail = modal.querySelector('.modal-thumbnail');
    const modalTitle = modal.querySelector('.modal-title');
    const modalPrice = modal.querySelector('.modal-price');
    const closeButton = modal.querySelector('.close');
    const quantitySpan = modal.querySelector('.quantity');
    let quantity = 1;

    const cartItemsContainer = document.querySelector('.cart-items');
    const cartTotalElement = document.querySelector('.cart-total');
    let cart = [];

    const updateCart = () => {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span class="cart-item-title">${item.title} x ${item.quantity}</span>
                <span>${(item.quantity * item.price).toFixed(2)} €</span>
                <button class="btn remove-item" data-index=${index}>x</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.quantity * item.price;
        });

        cartTotalElement.textContent = `Total : ${total.toFixed(2)} €`;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.dataset.index;
                cart.splice(index, 1);
                updateCart();
            });
        });
    };

    const showModal = (pizzaCard) => {
        const imgSrc = pizzaCard.querySelector('img').src;
        const title = pizzaCard.querySelector('h2').textContent;
        const price = parseFloat(pizzaCard.querySelector('.price').textContent.replace('€', '').trim());

        modalThumbnail.src = imgSrc;
        modalTitle.textContent = title;
        modalPrice.textContent = `${price.toFixed(2)} €`;
        quantity = 1;
        quantitySpan.textContent = quantity;

        modal.style.display = 'block';

        document.body.appendChild(modal);
    };

    const orderButtons = document.querySelectorAll('.btn.order');
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pizzaCard = button.closest('.pizza-card');
            showModal(pizzaCard);
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    modal.querySelector('.quantity-decrease').addEventListener('click', () => {
        if (quantity > 1) {
            quantity--;
            quantitySpan.textContent = quantity;
        }
    });

    modal.querySelector('.quantity-increase').addEventListener('click', () => {
        quantity++;
        quantitySpan.textContent = quantity;
    });

    modal.querySelector('.add-to-cart').addEventListener('click', () => {
        const title = modalTitle.textContent;
        const price = parseFloat(modalPrice.textContent.replace('€', '').trim());

        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ title, price, quantity });
        }

        updateCart();
        modal.style.display = 'none';
    });
});
