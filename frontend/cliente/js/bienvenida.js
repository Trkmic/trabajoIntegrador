const continue_button = document.querySelector(".container_continue_button");

    continue_button.addEventListener("click",() => {
        const nombre = document.getElementById("name").value.trim();

        if (nombre !== "") {
            window.location.href = "/catalogo";
        } else{
            alert("Por favor, ingrese su nombre.");
        }
});

const admin_button = document.querySelector(".container_admin_button");
    admin_button.addEventListener("click",() => {
            window.location.href = "/login";
});

