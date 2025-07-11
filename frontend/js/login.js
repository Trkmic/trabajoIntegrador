const password = "root";
const nombre = "root";

const continue_button = document.querySelector(".container_continue_button");
const client_button = document.querySelector(".container_client_button");
const shortcut_button = document.querySelector(".container_shortcut_button");


function cambiarPanel() {
    client_button.addEventListener("click", () => {
        window.location.href = "/";
    });
} 

function accesoRapido() {
    shortcut_button.addEventListener("click", () => {
        document.getElementById("name").value = nombre;
        document.getElementById("password").value = password;
    });
}

function ingresarAdmin() {
    continue_button.addEventListener("click", () => {
        const nombreIngresado = document.getElementById("name").value.trim();
        const passwordIngresada = document.getElementById("password").value.trim();
        
        if (nombreIngresado === nombre && passwordIngresada === password) {
            window.location.href = "/dashboard";
        } else {
            alert("Usuario y/o clave incorrectas");
            console.log(nombreIngresado, passwordIngresada);
        }
    });
}

function init() {
    accesoRapido();
    cambiarPanel();
    ingresarAdmin();
}

document.addEventListener("DOMContentLoaded", init);
