currentyear.innerHTML = new Date().getFullYear();
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector("#menu");
hamButton.addEventListener("click", () => {
    document.querySelector("nav").classList.toggle("open");
    hamButton.classList.toggle("open");
});

const cards = document.querySelector("#cards");
const membersUrl = "https://r-vanlangeveld.github.io/wdd231/chamber/data/members.json";

const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        let companyName = document.createElement("h3");
        let tagLine = document.createElement("p");
        let img = document.createElement("img");
        let div = document.createElement("div");

        companyName.innerHTML = `${member.name}`;
        tagLine.innerHTML = `${member.tagline}`
        div.innerHTML = `<p><b>ADDRESS:</b> ${member.address}</p><p><b>PHONE:</b> ${member.phone}</p><p><a href="${member.siteUrl}">${member.name}</a></p><p>${member.level.split(" ")[1]} Membership</p>`;

        img.setAttribute("src", member.icon);
        img.setAttribute("alt", `${member.name}'s Logo`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "100");
        img.setAttribute("height", "100");

        card.appendChild(companyName);
        card.appendChild(tagLine);
        card.appendChild(img);
        card.appendChild(div);
        cards.appendChild(card);
    });
}

if (document.querySelector("#page").textContent === "Directory") {

    async function getMemberData() {
        const response = await fetch(membersUrl);
        const data = await response.json();
        displayMembers(data.members);
    }

    getMemberData();

    const gridbutton = document.querySelector("#grid");
    const listbutton = document.querySelector("#list");

    gridbutton.addEventListener("click", () => {
        cards.classList.remove("list");
        cards.classList.add("cards");
    });

    listbutton.addEventListener("click", () => {
        cards.classList.add("list");
        cards.classList.remove("cards");
    });
}
else if (document.querySelector("#page").textContent === "Home") {

    hamButton.addEventListener("click", () => {
        document.querySelector(".cta").classList.toggle("open");
    });

    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=40.56&lon=-111.93&units=imperial&appid=351e2c8004bccca4128dc54392d01d9a';
    const weather = document.querySelector('#weather');
    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=40.56&lon=-111.93&units=imperial&appid=351e2c8004bccca4128dc54392d01d9a`;
    const forcast = document.querySelector(`#forcast`);

    async function apiFetch() {
        try {
            const response = await fetch(weatherUrl);
            if (response.ok) {
                const data = await response.json();
                displayResults(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
        try {
            const response = await fetch(forcastUrl);
            if (response.ok) {
                const data = await response.json();
                displayResults2(data);
            } else {
                throw Error(await response.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    apiFetch();

    const displayResults = (info) => {

        const sunTime = (sun) => {
            return new Date(sun * 1000).toLocaleTimeString();
        }

        let words = info.weather[0].description.split(" ");
        let desc = "hi";

        for (let index = 0; index < words.length; index++) {
            let word = words[index];
            desc = desc.concat(" ", word.replace(word.at(0), word.at(0).toUpperCase()));
        }

        weather.innerHTML = `${Math.floor(info.main.temp)}&deg;F<br><br>${desc.replace("hi ", "")}<br><br>High: ${Math.floor(info.main.temp_max)}&deg;F<br><br>Low: ${Math.floor(info.main.temp_min)}&deg;F<br><br>Humidity: ${info.main.humidity}%<br><br>Sunrise: ${sunTime(info.sys.sunrise)}<br><br>Sunset: ${sunTime(info.sys.sunset)}`;
    }

    const displayResults2 = (info) => {

        const dayName = (dayNumber) => {
            const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            return `${weekDay[new Date((info.list[dayNumber].dt) * 1000).getDay()]}:`;
        }

        forcast.innerHTML = `Today: ${Math.floor(info.list[0].main.temp)}&deg;F<br><br>${dayName(8)} ${Math.floor(info.list[8].main.temp)}&deg;F<br><br>${dayName(16)} ${Math.floor(info.list[16].main.temp)}&deg;F<br><br>Updates every 3 hours<br><br>Next update: ${new Date((info.list[0].dt) * 1000).toLocaleTimeString()}`;
    }

    async function getMemberData() {
        const response = await fetch(membersUrl);
        const data = await response.json();
        const filteredMembers = data.members.filter((member) => parseInt(member.level.split(" ")[0]) >= 2);
        const randomMembers = [];
        const usedNumbers = [];

        for (let index = 0; index < 3; index++) {
            currentNumber = Math.floor(Math.random() * filteredMembers.length);
            usedNumbers.push(currentNumber);
            randomMembers.push(filteredMembers[usedNumbers[index]]);

            while (usedNumbers.filter((num) => num === currentNumber).length > 1) {
                usedNumbers.pop(currentNumber);
                randomMembers.pop(filteredMembers[usedNumbers[index - 1]]);
                index -= 1;
            }
        }

        displayMembers(randomMembers);
    }

    getMemberData();
}
else if (document.querySelector("#page").textContent === "Join") {
    
    document.querySelector(".card1").addEventListener("click", () => {
        displayDetails("Non Profit", "Free", "idky", "card1");
    });

    document.querySelector(".card2").addEventListener("click", () => {
        displayDetails("Bronze", "$10", "idky", "card2");
    });

    document.querySelector(".card3").addEventListener("click", () => {
        displayDetails("Silver", "$50", "Can be randomly selected to appear in the Featured Members section. idky", "card3");
    });

    document.querySelector(".card4").addEventListener("click", () => {
        displayDetails("Gold", "$100", "Can be randomly selected to appear in the Featured Members section. idky", "card4");
    });

    function displayDetails(type, price, benifit, card) {
        memberInfo.innerHTML = `<h2>${type}</h2><button id="closeModal">⨉</button><p><strong>Price</strong>: ${price}</p><p><strong>Benifits</strong>: ${benifit}</p>`;
        memberInfo.classList.add(`${card}`);
        memberInfo.showModal();

        closeModal.addEventListener("click", () => {
            memberInfo.classList.remove(`${card}`);
            memberInfo.close();
        });

        window.addEventListener("click", function (event) {
            if (event.target === memberInfo) {
                memberInfo.classList.remove(`${card}`);
                memberInfo.close();
            }
        });
    }
}
else if (document.querySelector("#page").textContent === "Thanks") {

    function show(cup) {
        window.location.href.split("?")[1].split("&").forEach((element) => {
            if (element.startsWith(cup)) {
                result = element.split("=")[1].replace("%40", "@").replaceAll("+", " ");
                if (result === "np") {
                    result = `Non Profit`;
                }
                else if (result === "1") {
                    result = `1 Bronze`;
                }
                else if (result === "2") {
                    result = `2 Silver`;
                }
                else if (result === "3") {
                    result = `3 Gold`;
                }
            }
        });
        return result;
    }

    document.querySelector("#results").innerHTML = `<p>${show("first")} ${show("last")}, a ${show("title")}, is signing up ${show("organization")} for a ${show("level")} Level Membership</p><p></p><p>Your Phone: ${show("phone")}</p><p>Your Email: <a href="${show("email")}">${show("email")}</a></p><p>${show("description")}</p><p>${show("timestamp")}</p>`;
}
