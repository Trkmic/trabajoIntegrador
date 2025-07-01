const continue_button = document.getElementById("continue_button");

continue_button.addEventListener("click", () => {
    const nombre = document.getElementById("name").value.trim();
    const password = document.getElementById("password").value.trim();

    if (nombre === "franco" && password === "12345867867") {
        window.location.href = "/dashboard";
    } else {
        alert("Por favor, ingrese un usuario y contraseña válido");
    }
});

const client_button = document.getElementById("client_button");

client_button.addEventListener("click", () => {
    window.location.href = "/";
});