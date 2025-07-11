let carrito = [];

export function agregarAlCarrito(producto) {
    const indice = carrito.findIndex(item => item.producto.id === producto.id);
    if (indice !== -1) {
        carrito[indice].cantidad++;
    } else {
        carrito.push({producto, cantidad: 1});
        contadorCarrito();
    }
    guardarCarrito();
    contadorCarrito();
}

function eliminarDelCarrito(indice) {
    if (carrito[indice].cantidad > 1) {
        carrito[indice].cantidad--;
    } else {
        carrito.splice(indice, 1);
        contadorCarrito();
    }
    guardarCarrito();
    contadorCarrito();
    renderizarCarrito();
}

function renderizarCarrito() {
    const contenedor = document.querySelector(".items_cart");
    const precioTotal = document.querySelector(".cart_total");
    const buttonsCart = document.querySelector(".buttons_cart");

    if (!contenedor || !precioTotal) return;

    contenedor.textContent = "";

    if(carrito.length === 0) {
        contenedor.innerHTML = `<span class="empty_cart_text">No hay elementos agregados en el carrito. <i class="fa-regular fa-face-frown fa-xl"></i></span>`;
        precioTotal.textContent = "$0.00";
        if (buttonsCart) buttonsCart.classList.add("hidden");
        return;
    }

    if (buttonsCart) buttonsCart.classList.remove("hidden");

    carrito.forEach((item, indice) => {
        const li = document.createElement("li");
        li.classList.add("item_block");

        const totalProducto = item.producto.precio * item.cantidad;

        li.innerHTML = 
        `
        <div class="card_product_cart">
            <img src="${item.producto.img}" alt="${item.producto.nombre}">
            <h3>${item.producto.nombre}</h3>
            <span class="cant"><i class="fa-solid fa-minus fa-lg minus"></i> Cant: ${item.cantidad} <i class="fa-solid fa-plus fa-lg plus"></i></span>
            <span class="subtotal">Subtotal: $${totalProducto.toLocaleString("es-AR")}</span>   
            <button class="delete_button">Eliminar<i class="fa-solid fa-trash fa-sm"></i></button>
        </div>
        `;

        const deleteButton = li.querySelector(".delete_button");
        const minusButton = li.querySelector(".minus");
        const plusButton = li.querySelector(".plus");

        deleteButton.addEventListener("click", () => eliminarDelCarrito(indice));

        minusButton.addEventListener("click", () => {
            if (carrito[indice].cantidad > 1) {
                carrito[indice].cantidad--;
            } 
            guardarCarrito();
            contadorCarrito();
            renderizarCarrito();
        });

        plusButton.addEventListener("click", () => {
            carrito[indice].cantidad++;
            guardarCarrito();
            contadorCarrito();
            renderizarCarrito();
        });

        if (carrito[indice].cantidad === 1) {
            minusButton.classList.add("disabled");
        } else {
            minusButton.classList.remove("disabled");
        }

        contenedor.appendChild(li);
    });

    const total = carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);
    precioTotal.textContent = `Total: $${total.toLocaleString("es-AR")}`;
}

function recuperarCarrito() {
    const data = localStorage.getItem("carrito");
    
    if (data) {
        carrito = JSON.parse(data);
        contadorCarrito();
        renderizarCarrito();
    }
}

function vaciarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    contadorCarrito();
    renderizarCarrito();
}

function contadorCarrito() {
    const contador = document.querySelector(".contador_cart");
    if (contador) {
        contador.textContent = carrito.length;
    }
}

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function guardarTicket() {
    const fecha = new Date();
    const fechaFormateada = fecha.toLocaleDateString("es-AR");
    const cliente = localStorage.getItem("userCliente");

    const ticket = {
        fecha: fechaFormateada,
        user: cliente,
        items: structuredClone(carrito),
        total: carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0)
    };

    const tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    tickets.push(ticket);  
    
    localStorage.setItem("tickets", JSON.stringify(tickets));

    enviarTicketAlServidor(ticket);
}

function enviarTicketAlServidor(ticket) {
    fetch("/ventas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(ticket)
    })
    .then(res => res.json())
    .then(data => {
        console.log("Venta guardada", data);
    })
    .catch(err => {
        console.log("Error al guardar la venta: ", err);
    });
}


function buttonsCart() {
    const botonVaciar = document.querySelector(".clear_button");
    const botonFinalizar = document.querySelector(".end_button");
    const botonSalir = document.querySelector(".close_button");

    const modal = document.querySelector(".modal");
    const closeModal = document.querySelector(".close_modal");
    const confirmModal = document.querySelector(".confirm_modal");

    if (botonVaciar) {
        botonVaciar.addEventListener("click", vaciarCarrito);
    }

    if (botonFinalizar) {
        botonFinalizar.addEventListener("click", (e) => {
            e.preventDefault();

            if (carrito.length > 0) {
                modal.classList.add("active");

                confirmModal.addEventListener("click", () => {
                    guardarTicket();
                    carrito = [];
                    window.location.href = "/ticket";
                })

                closeModal.addEventListener("click", () => {
                    modal.classList.remove("active");
                })

            } else {
                alert("El carrito está vacío.");
            }
        });
    }

    if (botonSalir) {
        botonSalir.addEventListener("click", () => {
            window.location.href = "/catalogo";
        })
    };

}

function init() {
    recuperarCarrito();
    renderizarCarrito();
    contadorCarrito();
    buttonsCart();
}

document.addEventListener("DOMContentLoaded", init);