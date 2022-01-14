const primaryNav = document.querySelector(".primary-nav");
const navToggle = document.querySelector(".mobile-nav-toggle");

if(navToggle){
    navToggle.addEventListener("click", () => {
        const visibility = primaryNav.getAttribute("data-visible");
        if (visibility === "false") {
            primaryNav.setAttribute("data-visible", true);
            navToggle.setAttribute("aria-expanded", true);
        } else if (visibility === "true") {
            primaryNav.setAttribute("data-visible", false);
            navToggle.setAttribute("aria-expanded", false);

        }
    })
}