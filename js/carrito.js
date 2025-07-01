let carrito = [];

function agregarAlCarrito(producto){
    const indice = carrito.findIndex(item => item.producto.id === producto.id);
    if(indice !== -1){
        carrito[indice].cantidad++;
    }else{
        carrito.push({producto, cantidad: 1});
        contadorCarrito();
    }
    guardarCarrito();
    renderizarCarrito();
}

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function vaciarCarrito(){
    carrito = [];
    localStorage.removeItem("carrito");
    contadorCarrito();
    renderizarCarrito();
}

function contadorCarrito(){
    const contador = document.querySelector(".contador_cart");
    contador.textContent = carrito.length;
}

function eliminarDelCarrito(indice){
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
        contadorCarrito();
    }
    guardarCarrito();
    renderizarCarrito();
}

function renderizarCarrito(){
    const contenedor = document.querySelector(".items_cart");
    const precioTotal = document.querySelector(".cart_total");
    const buttonsCart = document.querySelector(".buttons_cart");
    const clearButtonCart = document.querySelector(".container_clear_button");

    contenedor.textContent = "";

    if(carrito.length === 0){
        contenedor.innerHTML = `<span class="empty_cart_text">No hay elementos agregados en el carrito.</span>`;
        precioTotal.textContent = "$0.00";

        buttonsCart.classList.add("hidden");
        clearButtonCart.classList.add("hidden");
        return;
    } else {
        buttonsCart.classList.remove("hidden");
        clearButtonCart.classList.remove("hidden");
    }

    carrito.forEach((item,indice) =>{
        const li = document.createElement("li");
        li.classList.add("item_block");

        const totalProducto = item.producto.precio * item.cantidad;

        li.innerHTML = 
        `
        <div class="card_product_cart">
            <img src="${item.producto.img}" alt="${item.producto.nombre}">
            <h3>${item.producto.nombre}</h3>
            <span class="cant">Cant: ${item.cantidad}</span>
            <span class="subtotal">Subtotal: $${totalProducto}</span>   
            <button class="delete_button">Eliminar<i class="fa-solid fa-trash fa-sm"></i></button>
        </div>
        `;

        li.querySelector(".delete_button").addEventListener("click", () => eliminarDelCarrito(indice));
        contenedor.appendChild(li);
    });

    const total = carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    precioTotal.textContent = `Total: $${total.toFixed(2)}`;
}

function recuperarCarrito(){
    const data = localStorage.getItem("carrito");
    if(data){
        carrito = JSON.parse(data);
        contadorCarrito();
        renderizarCarrito();
    }
}

function init() {
    recuperarCarrito();
}

init();


