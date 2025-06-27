let productos = [];

const titulosCategoria = {
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
    const contenedor = document.querySelector(".productos");
    contenedor.textContent = "";
    
    lista.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("product-card");

        div.innerHTML =      `
        <img src="${producto.img}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>$${producto.precio.toFixed(2)}</p>
        <button class="add-to-cart"> Agregar a carrito </button>
        `   
        div.querySelector(".add-to-cart").addEventListener("click", () => agregarAlCarrito(producto));
        contenedor.appendChild(div);
    });
}

function filtro(){
    
    document.querySelector(".search-bar").addEventListener("keyup", () => {
        const texto = document.querySelector(".search-bar").value.toLowerCase();
        const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
        renderizarProductos(filtrados);
    });
}

function filtroCategoria(){
    document.getElementById("categoriaSeleccionada").addEventListener("change", (e) => {
        const categoria = e.target.value;
    
        const productosFiltrados = productos.filter(p => p.categoria === categoria);
    
        renderizarProductos(productosFiltrados);
    
        const titulo = titulosCategoria[categoria] || "TODOS LOS PRODUCTOS DISPONIBLES";
        document.getElementById("tituloCategoria").textContent = titulo;
    });

}

let carrito = [];

function agregarAlCarrito(producto){
    const indice = carrito.findIndex(item => item.producto.id === producto.id);
    if(indice !== -1){
        carrito[indice].cantidad++;
    }else{
        carrito.push({producto, cantidad: 1});
    }
    guardarCarrito();
    renderizarCarrito();
}

function eliminarDelCarrito(indice){
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
    }
    guardarCarrito();
    renderizarCarrito();
}

function renderizarCarrito(){
    const contenedor = document.getElementById("cart-items");
    const precioTotal = document.querySelector(".cart-total");

    contenedor.textContent = "";

    if(carrito.length === 0){
        contenedor.innerHTML = "<p> No hay Elementos en el carrito. </p>"
        precioTotal.textContent = "$0.00";
        return;
    }

    carrito.forEach((item,indice) =>{
        const li = document.createElement("li");
        li.classList.add("item-block");

        const totalProducto = item.producto.precio * item.cantidad;

        li.innerHTML = `
            <p class="item-name">${item.producto.nombre}: ${item.cantidad} - $${totalProducto}</p>
            <button class="delete-button">Eliminar</button>
        `;

        li.querySelector(".delete-button").addEventListener("click", () => eliminarDelCarrito(indice));
        contenedor.appendChild(li);
    });

    const total = carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad,0);
    precioTotal.textContent = `$${total.toFixed(2)}`;
}

function guardarCarrito(){
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function recuperarCarrito(){
    const data = localStorage.getItem("carrito");
    if(data){
        carrito = JSON.parse(data);
        renderizarCarrito();
    }
}

function vaciarCarrito(){
    carrito = [];
    localStorage.removeItem("carrito");
    renderizarCarrito();
}


function init() {
    cargarDatos();
    filtro();
    filtroCategoria();
    recuperarCarrito();

    const botonVaciar = document.getElementById("delete-button");
    if (botonVaciar) {
        botonVaciar.addEventListener("click", vaciarCarrito);
    }

    const botonFinalizar = document.querySelector(".end-button");
    if (botonFinalizar) {
        botonFinalizar.addEventListener("click", () =>{
            if (carrito.length > 0) {
            window.location.href = "../html/ticket.html";
            }else{
                alert("El carrito está vacío.");
            }
        });
    }


    const toggleCartButton = document.getElementById("toggle-cart");
    const cartSection = document.getElementById("carrito-detalle");

    if (toggleCartButton && cartSection) {
        toggleCartButton.addEventListener("click", () => {
            cartSection.classList.toggle("visible");
        });
    }

    const cerrarCarrito = document.getElementById("cerrar-carrito");

    if (cerrarCarrito) {
        cerrarCarrito.addEventListener("click", () => {
            cartSection.classList.remove("visible");
        });
    }
}

init();