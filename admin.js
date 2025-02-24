document.addEventListener("DOMContentLoaded", () => {
    let pizzas = [
        { name: "Margherita", description: "Tomate, mozzarella, basilic", price: 12.90, image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format" },
        { name: "Regina", description: "Tomate, mozzarella, jambon, champignons", price: 14.90, image: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?w=500&auto=format" }
    ];

    const pizzaForm = document.getElementById("pizzaForm");
    const pizzaList = document.getElementById("pizzaList");
    const pizzaName = document.getElementById("pizzaName");
    const pizzaDescription = document.getElementById("pizzaDescription");
    const pizzaPrice = document.getElementById("pizzaPrice");
    const pizzaImage = document.getElementById("pizzaImage");
    const pizzaIndex = document.getElementById("pizzaIndex");
    const submitBtn = document.getElementById("submitBtn");

    const updatePizzaList = () => {
        pizzaList.innerHTML = "";
        pizzas.forEach((pizza, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <img src="${pizza.image}" alt="${pizza.name}" class="thumbnail">
                <strong>${pizza.name}</strong> - ${pizza.description} - <span>${pizza.price.toFixed(2)} €</span>
                <button class="edit" data-index="${index}">Modifier</button>
                <button class="delete" data-index="${index}">Supprimer</button>
            `;
            pizzaList.appendChild(li);
        });
    };

    pizzaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const pizzaData = {
            name: pizzaName.value,
            description: pizzaDescription.value,
            price: parseFloat(pizzaPrice.value),
            image: pizzaImage.value
        };

        if (pizzaIndex.value) {
            pizzas[parseInt(pizzaIndex.value)] = pizzaData;
            submitBtn.textContent = "Ajouter Pizza";
            pizzaIndex.value = "";
        } else {
            pizzas.push(pizzaData);
        }

        pizzaForm.reset();
        updatePizzaList();
    });

    pizzaList.addEventListener("click", (e) => {
        if (e.target.classList.contains("edit")) {
            const index = e.target.dataset.index;
            pizzaName.value = pizzas[index].name;
            pizzaDescription.value = pizzas[index].description;
            pizzaPrice.value = pizzas[index].price;
            pizzaImage.value = pizzas[index].image;
            pizzaIndex.value = index;
            submitBtn.textContent = "Modifier Pizza";
        } else if (e.target.classList.contains("delete")) {
            const index = e.target.dataset.index;
            pizzas.splice(index, 1);
            updatePizzaList();
        }
    });

    updatePizzaList();
});
