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

        const estado = producto.activo ? "Activo" : "Inactivo";
        const botonAccion = producto.activo
            ? `<button class="btn-desactivar"> Desactivar </button>`
            : `<button class="btn-activar"> Activar </button>`;
        
        div.innerHTML = `
            <div class="container_img_card">
                <img src="${producto.img}" alt="${producto.nombre}">
            </div>

            <h2>${producto.nombre}</h2>
            <span>$${producto.precio.toFixed(2)}</span>
        
            <p class="estado_producto ${producto.activo ? 'activo' : 'inactivo'}">Estado: ${estado}</p>
        
            <div class="acciones_admin">
                <button onclick="editarProducto('${producto.id}')">Editar</button>
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

function estadoProducto(){

}

function init() {
    cargarDatos();
    filtro();
    aplicarFiltro();
    filtroCategoria();
    focusSearchInput();
    agregarProducto();
    estadoProducto()
}

document.addEventListener("DOMContentLoaded", init);