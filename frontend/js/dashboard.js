let productos = [];

const titulosCategoria = {
    todas: "TODOS LOS PRODUCTOS",
    accesorio: "TODOS LOS ACCESORIOS",
    televisor: "TODOS LOS TELEVISORES",
    componente: "TODOS LOS COMPONENTES",
    celular: "TODOS LOS CELULARES"
};


function cargarDatos(){
    fetch("http://localhost:5000/productos")
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
        div.setAttribute("data-id", producto.id);

        const estado = producto.activo ? "Activo" : "Inactivo";
        const botonAccion = producto.activo
            ? `<button class="btn_desactivar"> Desactivar </button>`
            : `<button class="btn_activar"> Activar </button>`;
        
        div.innerHTML = `
            <div class="container_img_card">
                <img src="${producto.img}" alt="${producto.nombre}">
            </div>

            <h2>${producto.nombre}</h2>
            <span>$${producto.precio.toLocaleString("es-AR")}</span>
        
            <p class="estado_producto ${producto.activo ? 'activo' : 'inactivo'}">Estado: ${estado}</p>
        
            <div class="acciones_admin">
                <a href="/editarProducto?id=${producto.id}" class="btn_editar">Editar</a>
                ${botonAccion}
            </div>
        `;

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

function agregarProducto(){
    const new_product = document.getElementById("new_product");

    new_product.addEventListener("click", () => {
        window.location.href = "/altaProducto";
    });

}

function manejarCambioEstado() {
    const contenedor = document.querySelector(".products");

    contenedor.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn_activar") || event.target.classList.contains("btn_desactivar")) {
            const boton = event.target;
            const tarjeta = boton.closest(".product_card");
            const estado = tarjeta.querySelector(".estado_producto");
            const productoId = tarjeta.getAttribute("data-id");
            const nuevoEstado = boton.classList.contains("btn_activar");

            fetch(`http://localhost:5000/productos/estado/${productoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ activo: nuevoEstado })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error al actualizar el estado del producto");
                }
                return response.json();
            })
            .then(() => {
                // Cambiar visualmente el estado solo si el backend respondió correctamente
                estado.textContent = `Estado: ${nuevoEstado ? "Activo" : "Inactivo"}`;
                estado.classList.toggle("activo", nuevoEstado);
                estado.classList.toggle("inactivo", !nuevoEstado);

                boton.textContent = nuevoEstado ? "Desactivar" : "Activar";
                boton.classList.toggle("btn_activar", !nuevoEstado);
                boton.classList.toggle("btn_desactivar", nuevoEstado);

                // Actualizar estado en el array local
                const producto = productos.find(p => p.id === productoId);
                if (producto) producto.activo = nuevoEstado;
            })
            .catch(err => {
                console.error(err);
                alert("Hubo un error al actualizar el estado del producto en la base de datos.");
            });
        }
    });
}

function init() {
    cargarDatos();
    filtro();
    aplicarFiltro();
    filtroCategoria();
    focusSearchInput();
    agregarProducto();
    manejarCambioEstado();

    const icon = document.querySelector(".container_search_icon");
    if(icon) {
        icon.addEventListener("click", focusSearchInput);
        icon.addEventListener("click", aplicarFiltro);
    } else{
        alert("error");
    }
}

document.addEventListener("DOMContentLoaded", init);