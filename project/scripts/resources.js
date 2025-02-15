import toggleLight from "./base.mjs";
import formClassToggle from "./forms.mjs";

const resources = "https://r-vanlangeveld.github.io/wdd231/project/data/resources.json";
const resource = document.querySelector("#resource");
const cards = document.querySelector("#cards");

light.addEventListener("click", () => {
    formClassToggle();
    toggleLight();
    resource.classList.toggle("lightMode");
});

async function getResourceData() {
    try {
        const response = await fetch(resources);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const data = await response.json();
        displayResources(data.resources);
    } catch (error) {
        console.error(error.message);
    }
}

function displayResources(resources) {
    cards.innerHTML = "";
    resources.forEach((resource) => {
        let card = document.createElement("section");
        let siteName = document.createElement("h3");
        let moreInfo = document.createElement("p");

        siteName.innerHTML = `${resource.name}`;
        if (resource.name === "988 Lifeline") {
            moreInfo.innerHTML = `This is not the same Lifeline that is mentioned in the "Doing These Will Not Help Teens" section on our homepage<br>Click for more information`;
        } else {
            moreInfo.innerHTML = `Click for more information`;
        }

        card.appendChild(siteName);
        card.appendChild(moreInfo);
        card.addEventListener("click", () => {
            displayDetails(resource.name, resource.title, resource.description, resource.logo, resource.link, resource.width, resource.height);
        });
        cards.appendChild(card);
    });
};

function displayDetails(name, title, description, logo, link, width, height) {
    resource.innerHTML = `<h2>${name}</h2><button id="closeModal">⨉</button><p><a href="${link}">${title}</a></p><p>${description}</p><figure><img src="${logo}" alt="${name}'s Logo" width="${width}" height="${height}" loading="lazy"></img><figcaption>${name}'s Logo</figcaption></figure>`;

    if (resource.classList.contains("lightMode") === true) {
        resource.querySelector("figure").classList.add("lightMode");
        resource.querySelector("a").classList.add("lightMode");
    }

    if (name === "Utah Food Bank" || name === "National Institute of Mental Health") {
        resource.querySelector("img").classList.add("lightMode");
    }
    resource.showModal();

    closeModal.addEventListener("click", () => {
        resource.innerHTML = "";
        resource.close();
    });

    window.addEventListener("click", function (event) {
        if (event.target === resource) {
            resource.innerHTML = "";
            resource.close();
        }
    });
}

getResourceData();