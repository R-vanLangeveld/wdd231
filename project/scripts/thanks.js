import toggleLight from "./base.mjs";

light.addEventListener("click", () => {
    toggleLight();
});

function show(string) {
    let result;
    window.location.href.split("?")[1].split("&").forEach((element) => {
        if (element.startsWith(string)) {
            result = element.split("=")[1].replace("%40", "@").replaceAll("+", " ").replaceAll("%3A", ":").replaceAll("%2F", "/");
        }
    });
    return result;
}

if (show("from") === "resources") {
    document.querySelector("header").querySelectorAll("a").forEach((anchor) => {
        if (anchor.getAttribute("title") === "Resources") {
            anchor.classList.add("active");
        }
    });
    results.innerHTML = `<p id="visits"></p><p>Name of the requested website: ${show("websiteName")}</p><p>Url of the requested website: ${show("url")}</p><p>Description of the requested website: ${show("description")}</p><p>Request sent on ${Date(show("timestamp"))}</p>`;

    let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;
    numVisits++;
    localStorage.setItem("numVisits-ls", numVisits);
    if (numVisits == 1) {
        visits.innerHTML = `Thank you for submitting your first request!`;
    } else if (numVisits >= 2) {
        visits.innerHTML = `Thank you! You have submitted ${numVisits} requests.`;
    } else {
        results.innerHTML = `<p>How did you get here?</p>`;
    }

} else if (show("from") === "contact") {
    document.querySelector("header").querySelectorAll("a").forEach((anchor) => {
        if (anchor.getAttribute("title") === "Contact Us") {
            anchor.classList.add("active");
        }
    });
    if (show("middle") === null) {
        results.innerHTML = `<p>${show("first")} ${show("last")}</p><p>Your Email: ${show("email")}</p><p>${Date(show("timestamp"))}</p>`;
    } else {
        results.innerHTML = `<p>${show("first")} ${show("middle")} ${show("last")}</p><p>Your Email: ${show("email")}</p><p>Subscribed on ${Date(show("timestamp"))}</p>`;
    }
} else {
    results.innerHTML = `<p>How did you get here?</p>`;
}