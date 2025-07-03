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

function init() {
    navBar();
}

init();