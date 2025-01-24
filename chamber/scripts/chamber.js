currentyear.innerHTML = new Date().getFullYear();
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('nav');
hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});

const cards = document.querySelector("#cards");
const membersUrl = "https://r-vanlangeveld.github.io/wdd231/chamber/data/members.json";

const displayMembers = (members) => {
    cards.innerHTML = "";
    members.forEach((member) => {
        let card = document.createElement("section");
        let companyName = document.createElement("h3");
        let tagLine = document.createElement("p");
        let companyAddress = document.createElement("p");
        let companyPhone = document.createElement("p");
        let website = document.createElement("a");
        let img = document.createElement("img");
        let membership = document.createElement("p");
        let div = document.createElement("div");
        let siteP = document.createElement("p");

        companyName.textContent = `${member.name}`;
        companyAddress.innerHTML = `<b>ADDRESS:</b> ${member.address}`;
        companyPhone.innerHTML = `<b>PHONE:</b> ${member.phone}`;
        membership.textContent = `Membership level ${member.level}`;
        website.textContent = member.name;
        website.setAttribute("href", member.siteUrl);
        tagLine.textContent = `${member.tagline}`

        img.setAttribute("src", member.icon);
        img.setAttribute("alt", `${member.name}'s Logo`);
        img.setAttribute("loading", "lazy");
        img.setAttribute("width", "100");
        img.setAttribute("height", "100");

        siteP.appendChild(website);
        card.appendChild(companyName);
        card.appendChild(tagLine);
        card.appendChild(img);
        div.appendChild(companyAddress);
        div.appendChild(companyPhone);
        div.appendChild(siteP);
        div.appendChild(membership);
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

    const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=40.56&lon=-111.93&units=imperial&appid=351e2c8004bccca4128dc54392d01d9a';
    const currentTemp = document.querySelector('#current-temp');
    const weatherDesc = document.querySelector('#weDesc');
    const high = document.querySelector('#high');
    const low = document.querySelector('#low');
    const humidity = document.querySelector('#humidity');
    const sunrise = document.querySelector('#sunrise');
    const sunset = document.querySelector('#sunset');

    const forcastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=40.56&lon=-111.93&units=imperial&appid=351e2c8004bccca4128dc54392d01d9a`;
    const thisHigh = document.querySelector(`#thisHigh`);
    const nextHigh = document.querySelector(`#nextHigh`);
    const twoDayHigh = document.querySelector(`#twoDayHigh`)

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
            const convert = new Date(sun * 1000).toLocaleTimeString();

            return convert;
        }
        currentTemp.innerHTML = `${Math.floor(info.main.temp)}&deg;F`;
        high.innerHTML = `High: ${Math.floor(info.main.temp_max)}&deg;F`;
        low.innerHTML = `Low: ${Math.floor(info.main.temp_min)}&deg;F`;
        humidity.innerHTML = `Humidity: ${info.main.humidity}%`;
        sunrise.innerHTML = `Sunrise: ${sunTime(info.sys.sunrise)}`;
        sunset.innerHTML = `Sunset: ${sunTime(info.sys.sunset)}`;
        weatherDesc.innerHTML = `${info.weather[0].description}`;
    }

    const displayResults2 = (info) => {

        const dayName = (dayNumber) => {
            const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
            const test2 = new Date((info.list[dayNumber].dt) * 1000).getDay();
            day = weekDay[test2] + `:`;
            return day;
        }
        thisHigh.innerHTML = `Today: ${Math.floor(info.list[0].main.temp)}&deg;F`;
        nextHigh.innerHTML = `${dayName(8)} ${Math.floor(info.list[8].main.temp)}&deg;F`;
        twoDayHigh.innerHTML = `${dayName(16)} ${Math.floor(info.list[16].main.temp)}&deg;F`;
    }

    async function getMemberData() {
        const response = await fetch(membersUrl);
        const data = await response.json();
        const filteredMembers = data.members.filter((member) => parseInt(member.level) >= 2);

        const randomMembers = [];
        const usedNumbers = [];
       
        for (let index = 0; index < 3; index++) {
            currentNumber = Math.floor(Math.random() * filteredMembers.length);
            usedNumbers.push(currentNumber); 
            randomMembers.push(filteredMembers[usedNumbers[index]]);
                        
            while (usedNumbers.filter((num) => num === currentNumber).length > 1) {
                usedNumbers.pop(currentNumber);
                randomMembers.pop(filteredMembers[usedNumbers[index-1]]);
                index -= 1;
            }
        }
        
        displayMembers(randomMembers);
    }

    getMemberData();
}
