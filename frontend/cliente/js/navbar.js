function navBar() {
    const links = document.querySelectorAll(".nav_link");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const linkPage = link.getAttribute("href").split("/").pop();
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });
};

function navResponsive() {
    const navbar = document.querySelector(".navbar");
    const openNav = document.querySelector(".open_navbar");
    const closeNav = document.querySelector(".close_navbar");

    if(openNav) {
        openNav.addEventListener("click", () => {
            navbar.classList.add("visible");
            openNav.classList.add("hidden");
        });
    }

    if(closeNav) {
        closeNav.addEventListener("click", () => {
            navbar.classList.remove("visible");
            openNav.classList.remove("hidden");
        });
    }
}

function init() {
    navBar();
    navResponsive();
}

init();