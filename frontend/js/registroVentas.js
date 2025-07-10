function cargarVentas() {
    fetch("http://localhost:5000/ventas")
        .then(response => response.json())
        .then(data => {
            renderizarVentas(data);
        })
        .catch(() => {
            console.error("Hubo un error al cargar los ventas!");
        });
}

function renderizarVentas(ventas) {
    const contenedor = document.querySelector(".ventas_section");
    contenedor.textContent = "";

    ventas.forEach(venta => {
        const div = document.createElement("div");
        div.classList.add("venta_card");

        const fecha = new Date(venta.fecha).toLocaleDateString('es-AR');

        let html = 
        `
        <h2>¡Registro de venta exitoso!</h2>
        <div class="container_data_venta">
            <p><strong>Usuario:</strong> ${venta.user}</p>
            <p><strong>Fecha:</strong> ${fecha}</p>
            <p><strong>Total:</strong> $${venta.total.toLocaleString("es-AR")}</p>
            <div class="detalle_items">
                <h3>Productos vendidos:</h3>
        `;

        venta.items.forEach(item => {
            const subtotal = item.precio_unitario * item.cantidad;
            html += 
            `
            <div class="item_card">
                <p>${item.cantidad} x ${item.producto_nombre}     <i class="fa-solid fa-arrow-right"></i>      Precio unitario: $${item.precio_unitario.toLocaleString("es-AR")}</p>
                <p class="subtotal">Subtotal: $${subtotal}</p>
            </div>
            `;
        });

        html += `</div> </div>`;
        div.innerHTML = html;
        contenedor.appendChild(div);
    });
}

function init() {
    cargarVentas();
}

document.addEventListener("DOMContentLoaded", init);