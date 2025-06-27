let productos = [];

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
// PUNTO 2

// PUNTO 3
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

function init() {
    cargarDatos();
}

init();