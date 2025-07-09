const adminButton = document.querySelector(".container_admin_button");
const continueButton = document.querySelector(".container_continue_button");
const shortcutButton = document.querySelector(".container_shortcut_button");

function accesoRapido() {
    shortcutButton.addEventListener("click", () => {
        document.getElementById("name").value = "root";
    });
}

function registrarUsuario() {
    continueButton.addEventListener("click", () => {
        const userCliente = document.querySelector(".user_cliente").value;

        if ( (userCliente !== "") && (userCliente.length > 3) ) {
            localStorage.setItem("userCliente", userCliente);
            window.location.href = "/catalogo";
        } else {
            alert("Por favor, ingrese su nombre.");
        }
    });
}

function cambiarPanel() {
    adminButton.addEventListener("click", () => {
        window.location.href = "/login";
    });
}

function init() {
    accesoRapido();
    registrarUsuario();
    cambiarPanel();
}

document.addEventListener("DOMContentLoaded", init);



