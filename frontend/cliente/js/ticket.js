function downloadPDF() {

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const download_button = document.querySelector(".download_pdf");

    download_button.addEventListener("click", () => {
        const tabla = document.querySelector(".table_ticket");
        if (!tabla) return;

        doc.text("Ticket de compra", 14, 15); // Título; Posición horizontal y vertical en el PDF (unidades en mm)

        doc.autoTable({
        html: tabla,
        startY: 20, // En que posición vetical empieza la tabla (unidades en mm)
        headStyles: { fillColor: [2, 225, 151] }, // Color del encabezado
        styles: { fontSize: 12 } // Tamaño de la fuente de las celdas
        });

        doc.save("ticket.pdf");
    });

}

function renderizarTicket() {
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
            <td class="hidden_mobile">$${precio.toLocaleString("es-AR")}</td>
            <td>$${totalProducto.toLocaleString("es-AR")}</td>
        `;

        items.appendChild(fila);
    });

    precioFinal.innerHTML = `El total de tu compra fue de: $ ${total.toLocaleString("es-AR")}`;
}

function mostrarFecha() {
    const fechaElemento = document.querySelector(".date_ticket");
    const fecha = new Date();
    // Formateo simple: día/mes/año
    const fechaFormateada = fecha.toLocaleDateString('es-ES');
    fechaElemento.textContent = fechaFormateada;
}


function salir() {
    const boton = document.querySelector(".container_exit_icon");
    boton.addEventListener("click", () => {
        localStorage.removeItem("carrito"); //¿El carrito se borra una vez finalizada la compra o cuando el usuario sale de la pestaña del ticket?
        window.location.href = "/";
    });
}

function init() {
    renderizarTicket();
    mostrarFecha();
    salir();
    downloadPDF();
}

init();
