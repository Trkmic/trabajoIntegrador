let productos = [];

const titulosCategoria = {
    todas: "CATÁLOGO DE PRODUCTOS",
    accesorio: "TODOS LOS ACCESORIOS DISPONIBLES",
    televisor: "TODOS LOS TELEVISORES DISPONIBLES",
    componente: "TODOS LOS COMPONENTES DISPONIBLES",
    celular: "TODOS LOS CELULARES DISPONIBLES"
};


function cargarDatos(){
    fetch("../dataBase/db.json")
    .then(response => response.json())
    .then(data =>{
        productos = data;
        renderizarProductos(productos);
    })
    .catch(() =>{
        console.error("Hubo un error al cargar los datos!");
    })
}

function renderizarProductos(lista){
    const contenedor = document.querySelector(".products");
    contenedor.textContent = "";
    
    lista.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("product_card");

        div.innerHTML =      
        `
        <div class="container_img_card"><img src="${producto.img}" alt="${producto.nombre}"></div>
        <h2>${producto.nombre}</h2>
        <span>$${producto.precio.toFixed(2)}</span>
        <div class="add_to_cart container_add_to_cart_icon">
        <button>Agregar al carrito</button>
        <i class="fa-solid fa-cart-shopping fa-sm cart_icon"></i>
        </div>
        `;
        div.querySelector(".add_to_cart").addEventListener("click", () => agregarAlCarrito(producto));
        contenedor.appendChild(div);
    });
}

function filtro(){
    const searchBar = aplicarFiltro();
    searchBar.addEventListener("keyup", aplicarFiltro);
    searchBar.addEventListener("keydown", aplicarFiltro);
}

function aplicarFiltro() {
    const searchBar = document.querySelector(".search_bar");
    const texto = searchBar.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));

    if (filtrados.length === 0) {

        const contenedor = document.querySelector(".products");
        contenedor.textContent = "";
        const p = document.createElement("p");
        p.classList.add("catalogo_vacio");
        p.innerHTML = `No se encontraron productos relacionados a tu búsqueda <i class="fa-regular fa-face-frown fa-xl"></i>`;
        contenedor.appendChild(p);
    } else {
        renderizarProductos(filtrados);
    }

    return searchBar;
}

function filtroCategoria(){
    const desplegable = document.querySelector(".container_select_icon");
    const lista = document.querySelector(".select_items");
    const opciones = document.querySelectorAll(".select_items li");

    opciones.forEach(opcion => {
        opcion.addEventListener("click", () => {
            const categoria = opcion.dataset.value;

            desplegable.textContent = opcion.textContent;
            desplegable.dataset.value = categoria;

            lista.classList.add("hidden");

            if (categoria === "todas") {
                renderizarProductos(productos);
            } else {
                const productosFiltrados = productos.filter(p => p.categoria === categoria);
                renderizarProductos(productosFiltrados);
            }

            const titulo = titulosCategoria[categoria] || "TODOS LOS PRODUCTOS DISPONIBLES";
            document.querySelector(".title_category").textContent = titulo;
        });
    });

        desplegable.addEventListener("click", () => {
            lista.classList.toggle("hidden");
        });

        document.addEventListener("click", (e) => {
            const clickInside = desplegable.contains(e.target) || lista.contains(e.target);
            if (!clickInside) {
                lista.classList.add("hidden");
            }
        });
}

function focusSearchInput(){
    const input = document.getElementById("search_input");
    if(input) {
        input.focus();
    } else{
        alert("error");
    }
}

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

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function recuperarCarrito(){
    const data = localStorage.getItem("carrito");
    if(data){
        carrito = JSON.parse(data);
        contadorCarrito();
        renderizarCarrito();
    }
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


function init() {
    cargarDatos();
    filtro();
    aplicarFiltro();
    filtroCategoria();
    recuperarCarrito();
    focusSearchInput();
    contadorCarrito();

    const icon = document.querySelector(".container_search_icon");
    if(icon) {
        icon.addEventListener("click", focusSearchInput);
        icon.addEventListener("click", aplicarFiltro);
    } else{
        alert("error");
    }
    

    const botonVaciar = document.getElementById("clear_button");
    if (botonVaciar) {
        botonVaciar.addEventListener("click", vaciarCarrito);
    }

    const botonFinalizar = document.querySelector(".end_button");
    if (botonFinalizar) {
        botonFinalizar.addEventListener("click", () =>{
            if (carrito.length > 0) {
            window.location.href = "../html/ticket.html";
            }else{
                alert("El carrito está vacío.");
            }
        });
    }


    const toggleCartButton = document.getElementById("toggle_cart");
    const cartSection = document.querySelector(".cart_section");

    if (toggleCartButton && cartSection) {
        toggleCartButton.addEventListener("click", () => {
            cartSection.classList.toggle("visible");
        });
    }

    const cerrarCarrito = document.getElementById("close_cart");

    if (cerrarCarrito) {
        cerrarCarrito.addEventListener("click", () => {
            cartSection.classList.remove("visible");
        });
    }
}

document.addEventListener("DOMContentLoaded", init);
