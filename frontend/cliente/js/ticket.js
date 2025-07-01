<<<<<<<< HEAD:js/ticket.js
function renderizarTicket(){
    const items = document.querySelector(".items_ticket");
    const precioFinal = document.querySelector(".total_ticket");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let total = 0;

    items.innerHTML = "";

    carrito.forEach(item => {
        const nombre = item.producto.nombre;
        const precio = item.producto.precio;
        const cantidad = item.cantidad;

        const totalProducto = precio * cantidad;
        total += totalProducto;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>$${precio.toFixed(2)}</td>
            <td>$${totalProducto.toFixed(2)}</td>
        `;

        items.appendChild(fila);
    });

    precioFinal.innerHTML = `El total de tu compra fue de: $ ${total.toFixed(2)}`;
}

function mostrarFecha() {
    const fechaElemento = document.querySelector(".date_ticket");
    const fecha = new Date();
    // Formateo simple: día/mes/año
    const fechaFormateada = fecha.toLocaleDateString('es-ES');
    fechaElemento.textContent = fechaFormateada;
}


function salir(){
    const boton = document.querySelector(".container_exit_icon");
    
        boton.addEventListener("click",() => {
            localStorage.removeItem("carrito");
            window.location.href = "../html/bienvenida.html";
    });
}

function init() {
    renderizarTicket();
    mostrarFecha();
    salir();
}

init();

========
function renderizarTicket(){
    const items = document.querySelector(".items_ticket");
    const precioFinal = document.querySelector(".total_ticket");

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let total = 0;

    items.innerHTML = "";

    carrito.forEach(item => {
        const nombre = item.producto.nombre;
        const precio = item.producto.precio;
        const cantidad = item.cantidad;

        const totalProducto = precio * cantidad;
        total += totalProducto;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>$${precio.toFixed(2)}</td>
            <td>$${totalProducto.toFixed(2)}</td>
        `;

        items.appendChild(fila);
    });

    precioFinal.innerHTML = `El total de tu compra fue de: $ ${total.toFixed(2)}`;
}

function mostrarFecha() {
    const fechaElemento = document.querySelector(".date_ticket");
    const fecha = new Date();
    // Formateo simple: día/mes/año
    const fechaFormateada = fecha.toLocaleDateString('es-ES');
    fechaElemento.textContent = fechaFormateada;
}


function salir(){
    const boton = document.querySelector(".container_exit_icon");
    
        boton.addEventListener("click",() => {
            localStorage.removeItem("carrito");
            window.location.href = "/";
    });
}

function init() {
    renderizarTicket();
    mostrarFecha();
    salir();
}

init();

>>>>>>>> origin/Trkmic:frontend/cliente/js/ticket.js
