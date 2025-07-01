function focusSearchInput(){
    const input = document.getElementById("search_input");
    if(input) {
        input.focus();
    } else{
        alert("error");
    }
}


function init() {
    focusSearchInput();

    const icon = document.querySelector(".container_search_icon");
    if(icon) {
        icon.addEventListener("click", focusSearchInput);
        icon.addEventListener("click", aplicarFiltro);
    } else{
        alert("error");
    }
    

    const botonVaciar = document.getElementById("clear_button");
    if (botonVaciar) {
        botonVaciar.addEventListener("click", vaciarCarrito);
    }

    const botonFinalizar = document.querySelector(".end_button");
    if (botonFinalizar) {
        botonFinalizar.addEventListener("click", () =>{
            if (carrito.length > 0) {
            window.location.href = "../html/ticket.html";
            }else{
                alert("El carrito está vacío.");
            }
        });
    }


    const toggleCartButton = document.getElementById("toggle_cart");
    const cartSection = document.querySelector(".cart_section");

    if (toggleCartButton && cartSection) {
        toggleCartButton.addEventListener("click", () => {
            cartSection.classList.toggle("visible");
        });
    }

    const cerrarCarrito = document.getElementById("close_cart");

    if (cerrarCarrito) {
        cerrarCarrito.addEventListener("click", () => {
            cartSection.classList.remove("visible");
        });
    }
}

document.addEventListener("DOMContentLoaded", init);
