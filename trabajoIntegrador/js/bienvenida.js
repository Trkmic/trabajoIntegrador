const boton = document.querySelector("button");

    boton.addEventListener("click",() => {
        const nombre = document.getElementById("nombre").value.trim();

        if (nombre !== "") {
            window.location.href = "../html/productos.html";
        } else {
            alert("Por favor, ingrese su nombre.");
        }
    });