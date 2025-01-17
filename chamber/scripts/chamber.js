const today = new Date();
currentyear.innerHTML = today.getFullYear();
document.getElementById("lastModified").innerHTML = `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const url = "https://r-vanlangeveld.github.io/wdd231/chamber/data/members.json";

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

const cards = document.querySelector(".cards");

getMemberData();

const displayMembers = (members) => {
    members.forEach((member) => {
        let card = document.createElement("section");
        let companyName = document.createElement("h2");
        let tagLine = document.createElement("p");
        let companyAddress = document.createElement("p");
        let companyPhone = document.createElement("p");
        let website = document.createElement("p");
        let img = document.createElement("img");
        let membership = document.createElement("p");

        companyName.textContent = `${member.name}`;
        companyAddress.textContent = `ADDRESS: ${member.address}`;
        companyPhone.textContent = `PHONE: ${member.phone}`;
        membership.textContent = `Membership level ${member.level}`;
        website.textContent = `${member.siteUrl}`;
        tagLine.textContent = `${member.tagline}`

        img.setAttribute("src", member.icon);
        img.setAttribute("alt", `${member.name}'s Logo`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "100");
        img.setAttribute("height", "100");

        card.appendChild(companyName);
        card.appendChild(tagLine);
        card.appendChild(img);
        card.appendChild(companyAddress);
        card.appendChild(companyPhone);
        card.appendChild(website);
        card.appendChild(membership);

        cards.appendChild(card);
    });
}