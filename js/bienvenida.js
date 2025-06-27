const boton = document.querySelector(".container_continue_button");

    boton.addEventListener("click",() => {
        const nombre = document.getElementById("name").value.trim();

        if (nombre !== "") {
            window.location.href = "../html/main.html";
        } else{
            alert("Por favor, ingrese su nombre.");
        }
});