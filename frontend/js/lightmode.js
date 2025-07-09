let lightmode = localStorage.getItem("lightmode");
const themeSwitch = document.querySelector(".theme_switch");

function modoPagina() {
    const enableLightMode = () => {
    document.body.classList.add("lightmode");
    localStorage.setItem("lightmode", "active");
    }

    const disableLightMode = () => {
        document.body.classList.remove("lightmode");
        localStorage.setItem("lightmode", null);
    }

    if (lightmode === "active") enableLightMode();

    themeSwitch.addEventListener("click", () => {
        lightmode = localStorage.getItem("lightmode");
        lightmode !== "active" ? enableLightMode() : disableLightMode();
    });
}

function init() {
    modoPagina();
}

document.addEventListener("DOMContentLoaded", init);