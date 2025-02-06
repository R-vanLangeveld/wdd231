currentyear.innerHTML = new Date().getFullYear();
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

menu.addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("open");
    menu.classList.toggle("open");
});

const main = document.querySelector("main");
light.addEventListener("click", () => {
    main.classList.toggle("lightMode");
    main.querySelectorAll("a").forEach((anchor) => {
        anchor.classList.toggle("lightMode");
    });
    main.querySelectorAll("div").forEach((div) => {
        div.classList.toggle("lightMode");
    });
    main.querySelectorAll("section").forEach((sect) => {
        sect.classList.toggle("lightMode");
    });
    light.classList.toggle("lightMode");
    // siteplan only, remove for project.js
    main.querySelectorAll(".wireframe").forEach((sect) => {
        sect.classList.toggle("lightMode");
    });
});