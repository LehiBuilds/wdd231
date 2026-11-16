const eventList = document.querySelector("#event-list");
const businessList = document.querySelector("#featured-businesses");
const weatherIcon = document.querySelector("#weather-icon");
const weatherTemp = document.querySelector("#weather-temp");
const weatherCondition = document.querySelector("#weather-condition");
const weatherDetails = document.querySelector("#weather-details");

const sampleEvents = [
    {
        title: "Business Networking Mixer",
        date: "Friday, 5:00 PM",
        location: "Town Plaza"
    },
    {
        title: "Local Market Day",
        date: "Saturday, 8:00 AM",
        location: "Mangaldan Public Market"
    },
    {
        title: "Small Business Workshop",
        date: "Monday, 9:00 AM",
        location: "Municipal Training Hall"
    },
    {
        title: "Community Clean-Up",
        date: "Wednesday, 7:00 AM",
        location: "Mangaldan Town Plaza"
    },
    {
        title: "Chamber Business Forum",
        date: "Thursday, 3:00 PM",
        location: "Mangaldan Municipal Hall"
    }
];

const apiKey = "03ba9c06c193f747c0cf0feef421eba3";
const latitude = 16.06;
const longitude = 120.40;

function escapeHTML(value) {
    const characters = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(value).replace(/[&<>"']/g, (character) => characters[character]);
}

function displayEvents(events) {
    eventList.innerHTML = events.map((event) => `
        <li class="event-item">
            <h3>${escapeHTML(event.title)}</h3>
            <p class="event-date">${escapeHTML(event.date)}</p>
            <p>${escapeHTML(event.location)}</p>
        </li>
    `).join("");
}

function businessCard(member) {
    const phoneLink = member.phone.replace(/[^\d+]/g, "");

    return `
        <article class="highlight">
            <img src="./images/${encodeURIComponent(member.image)}"
                alt="${escapeHTML(member.name)}" loading="lazy">
            <div class="highlight-content">
                <h3>${escapeHTML(member.name)}</h3>
                <p>${escapeHTML(member.tagline)}</p>
                <p>${escapeHTML(member.description)}</p>
                <p><strong>Address:</strong> ${escapeHTML(member.address)}</p>
                <p><strong>Phone:</strong>
                    <a href="tel:${escapeHTML(phoneLink)}">${escapeHTML(member.phone)}</a>
                </p>
            </div>
        </article>
    `;
}

async function loadBusinesses() {
    try {
        const response = await fetch("./data/members.json");
        if (!response.ok) {
            throw new Error(`Member data request failed: HTTP ${response.status}`);
        }

        const members = await response.json();
        if (!Array.isArray(members)) {
            throw new TypeError("Member data must be an array.");
        }

        businessList.innerHTML = members.slice(0, 3).map(businessCard).join("");
    } catch (error) {
        console.error("Could not load featured businesses:", error);
        businessList.innerHTML = `
            <p class="data-placeholder">Featured businesses could not be loaded.</p>
        `;
    }
}

async function loadWeather() {
    if (!apiKey) {
        weatherCondition.textContent = "Add your OpenWeatherMap API key to home.js.";
        return;
    }

    const url = new URL("https://api.openweathermap.org/data/2.5/weather");
    url.search = new URLSearchParams({
        lat: latitude,
        lon: longitude,
        appid: apiKey,
        units: "metric"
    });

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Weather request failed: HTTP ${response.status}`);
        }

        const data = await response.json();
        const currentWeather = data.weather[0];

        weatherIcon.innerHTML = `
            <img src="https://openweathermap.org/img/wn/${encodeURIComponent(currentWeather.icon)}@2x.png"
                alt="">
        `;
        weatherTemp.textContent = `${Math.round(data.main.temp)}°C`;
        weatherCondition.textContent = currentWeather.description;
        weatherDetails.innerHTML = `
            <li class="weather-detail">
                <span class="weather-detail__label">Humidity</span>
                <strong class="weather-detail__value">${data.main.humidity}%</strong>
            </li>
            <li class="weather-detail">
                <span class="weather-detail__label">Wind</span>
                <strong class="weather-detail__value">${Math.round(data.wind.speed * 3.6)} km/h</strong>
            </li>
        `;
    } catch (error) {
        console.error("Could not load weather:", error);
        weatherCondition.textContent = "Weather data could not be loaded.";
        weatherDetails.innerHTML = `
            <li class="data-placeholder">Weather details are unavailable.</li>
        `;
    }
}

displayEvents(sampleEvents);
loadBusinesses();
loadWeather();
