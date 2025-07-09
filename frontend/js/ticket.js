function descargarPDF(ticket) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    if (!ticket) return;

    let y = 15; // posición vertical inicial

    // Título principal
    const titulo = ticket.querySelector("h1")?.innerText;
    if (titulo) {
        doc.setFontSize(18);
        doc.text(titulo, 14, y);
        y += 10;
    }

    // Subtítulo con nombre y fecha
    const subtitulo = ticket.querySelector("h2")?.innerText;
    if (subtitulo) {
        doc.setFontSize(12);
        doc.text(subtitulo, 14, y);
        y += 10;
    }

    // Línea separadora
    doc.setDrawColor(0);
    doc.line(14, y, 196, y);
    y += 5;

    // Productos y detalle (cada ul > li dentro de divs)
    const itemsContainer = ticket.querySelector(".items_ticket");
    const productos = itemsContainer.querySelectorAll("div ul");

    doc.setFontSize(11);

    productos.forEach((item) => {
        const texto = item.innerText.trim();
        const lines = doc.splitTextToSize(texto, 180);
        doc.text(lines, 14, y);
        y += lines.length * 6;

        // Salto de página si se pasa del límite
        if (y > 280) {
        doc.addPage();
        y = 15;
        }
    });

    y += 5;

    // Línea separadora
    doc.setDrawColor(0);
    doc.line(14, y, 196, y);
    y += 5;

    // Total final
    const total = ticket.querySelector(".total_ticket")?.innerText;
    if (total) {
        doc.setFontSize(13);
        doc.setTextColor(32, 184, 96); // Color verde hover secundario
        doc.text(total, 14, y);
    }
    doc.save("ticket.pdf");
}

export function recuperarUserCliente() {
    const userData = localStorage.getItem("userCliente");

    if (userData) {
        return userData;
    } else {
        console.log("Error: Usuario desconocido");
    }
}

function renderizarTicket() {
    const ticketSection = document.querySelector(".ticket_section");
    const cliente = recuperarUserCliente();
    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];

    ticketSection.innerHTML = "";

    //Bandera para saber si el usuario tiene tickets
    let tieneTickets = false;

    if (tickets.length === 0) {
        const notTicket = document.createElement("h1");
        notTicket.classList.add("h1_not_ticket");
        notTicket.innerHTML = `${cliente}, Aún no tenes tickets generados`;
        ticketSection.classList.add("not_ticket");
        ticketSection.appendChild(notTicket);
        return;
    } 

    tickets.forEach(ticket => {

        if (cliente == ticket.user) {
            tieneTickets = true;

            //Nueva card
            const ticketCard = document.createElement("div");
            ticketCard.classList.add("ticket_card");

            //Titulo y subtitulo con fecha
            const titleTicket = document.createElement("h1");
            titleTicket.classList.add("title_ticket");
            titleTicket.textContent = "¡Muchas gracias por tu compra!";

            const userDate = document.createElement("h2");
            userDate.classList.add("user_date_ticket");
            userDate.textContent = `${ticket.user} - ${ticket.fecha}`;

            //lista de productos
            const itemsContainer = document.createElement("div");
            itemsContainer.classList.add("items_ticket");

            let total = 0;

            ticket.items.forEach(item => {
                const nombre = item.producto.nombre;
                const precio = item.producto.precio;
                const cantidad = item.cantidad;   
                const totalProducto = precio * cantidad;
                total += totalProducto;

                const detalleProducto = document.createElement("div");
                detalleProducto.innerHTML = 
                `
                    <ul>- ${cantidad} x ${nombre}
                        <li>
                            ${cantidad} x $${precio.toLocaleString("es-AR")} = $${totalProducto.toLocaleString("es-AR")}
                        </li>         
                    </ul>
                `;         
                
                itemsContainer.appendChild(detalleProducto);                            
            });

            //Precio total
            const totalTicket = document.createElement("p");
            totalTicket.classList.add("total_ticket");
            totalTicket.textContent = `Total: $${total.toLocaleString("es-AR")}`;

            //Boton de descarga
            const downloadPDF = document.createElement("div");
            downloadPDF.classList.add("download_pdf");
            downloadPDF.innerHTML = 
            `
                <button>Descargar ticket</button>
                <i class="fa-solid fa-file-pdf"></i>            
            `;

            downloadPDF.addEventListener("click", () => {
                descargarPDF(ticketCard);
            });

            //Armado del ticket card
            ticketCard.appendChild(titleTicket);
            ticketCard.appendChild(userDate);
            ticketCard.appendChild(itemsContainer);
            ticketCard.appendChild(totalTicket);
            ticketCard.appendChild(downloadPDF);

            //Insertar al contenedor (SECTION)
            ticketSection.appendChild(ticketCard);
        }
    });  

    if (!tieneTickets) {
        const notTicket = document.createElement("h1");
        notTicket.classList.add("h1_not_ticket");
        notTicket.innerHTML = `${cliente}, Aún no tenes tickets generados`;
        ticketSection.classList.add("not_ticket");
        ticketSection.appendChild(notTicket);
        return;
    }       
}

function salir() {
    const boton = document.querySelector(".container_exit_icon");
    boton.addEventListener("click", () => {
        localStorage.removeItem("carrito");
        window.location.href = "/";
    });
}

function init() {
    renderizarTicket();    
    salir();
}

document.addEventListener("DOMContentLoaded", init);
