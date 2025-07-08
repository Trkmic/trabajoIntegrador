const admin_button = document.querySelector(".container_admin_button");
const continue_button = document.querySelector(".container_continue_button");
const shortcut_button = document.querySelector(".container_shortcut_button");

function accesoRapido() {
    shortcut_button.addEventListener("click", () => {
        document.getElementById("name").value = "root";
    });
}

function registrarUsuario() {
    continue_button.addEventListener("click",() => {
        const nombre = document.getElementById("name").value.trim();

        if (nombre !== "") {
            window.location.href = "/catalogo";
        } else {
            alert("Por favor, ingrese su nombre.");
        }
    });
}

function cambiarPanel() {
    admin_button.addEventListener("click", () => {
        window.location.href = "/login";
    });
}

function init() {
    accesoRapido();
    registrarUsuario();
    cambiarPanel();
}

document.addEventListener("DOMContentLoaded", init);



