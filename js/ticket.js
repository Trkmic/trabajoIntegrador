function renderizarTicket(){
    const items = document.getElementById("ticket-items");
    const precioFinal = document.querySelector(".ticket-total");

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
            <td>${precio}</td>
            <td>${totalProducto}</td>
        `;

        items.appendChild(fila);
    });

    precioFinal.innerHTML = `<strong>Total:</strong> ${total}`;
}

function mostrarFecha() {
    const fechaElemento = document.getElementById("ticket-fecha");
    const fecha = new Date();
    // Formateo simple: día/mes/año
    const fechaFormateada = fecha.toLocaleDateString('es-ES');
    fechaElemento.textContent = fechaFormateada;
}


function salir(){
    const boton = document.querySelector("#btn-salir");
    
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

