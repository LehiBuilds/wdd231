const root = document.documentElement;
root.classList.add("js");


/* ---------- Mobile menu ---------- */

const menuButton = document.querySelector("#menu-toggle");
const nav = document.querySelector("#primary-nav");

function setMenu(open) {
    nav.classList.toggle("is-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
}

menuButton.addEventListener("click", () => {
    setMenu(!nav.classList.contains("is-open"));
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
        setMenu(false);
        menuButton.focus();
    }
});

/* ---------- Light / dark toggle ---------- */

const themeButton = document.querySelector("#theme-toggle");

function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeButton.setAttribute("aria-pressed", String(theme === "dark"));
}
let savedTheme = null;

try {
    savedTheme = localStorage.getItem("theme");

} catch (error) {

}

const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
setTheme(savedTheme || (systemPrefersDark ? "dark" : "light"));

themeButton.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    try {
        localStorage.setItem("theme", next);
    } catch (error) {
    }
});

/* ---------- Grid/List ---------- */

const display = document.querySelector('#members');
const buttons = document.querySelectorAll('.view-btn')

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const viewType = e.currentTarget.dataset.view;

        display.classList.remove('grid', 'list');
        display.classList.add(viewType);

        buttons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});

/* ---------- Directory Fetch ---------- */
const membersURL = './data/members.json';
const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };

function memberCard(m) {
    const host = new URL(m.website).hostname.replace('www.', '');

    return `
    <li class="member-card">
        <div class="member-head">
            <h3 class="member-name>${m.name}</h3>
            <p class="member-tagline">${m.tagline}</p>
        </div>
        <div class="member-body>
            <img class="member-img" src="./images/${m.image}" alt="${m.name}"
                width="72" height="72" loading="lazy"
            <div class="member-info">
                <p>
                    <span class="badge list-only">${m.category}</span>
                    <span class="badge badge-level-${m.membershipLevel}">${levels[m.membershipLevel]}</span>
                </p>
                <p class="member-desc list-only">${m.description}</p>
                <div class="member-details">
                    <p><strong>Email:</strong> <a href="mailto:${m.email}">${m.email}</a></p>
                    <p><strong>Phone:</strong> ${m.phone}</p>
                    <p><strong>URL:</strong> <a href="${m.website}">${host}</a></p>
                    <p class="list-only"><strong>Address:</strong> ${m.address}</p>
                    <p class="list-only"><strong>Hours:</strong> ${m.hours}</p>
                    <p class="list-only"><strong>Established:</strong> ${m.established}</p>
                </div>
            </div>
        </div>
    </li>`;
}

async function loadMembers() {
    try {
        const response = await fetch(membersURL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const members = await response.json();

        display.innerHTML = members.map(memberCard).join('');
    } catch (error) {
        console.error('Could not load members:', error);
        display.innerHTML = `<li>Sorry, the member directory could not be loaded.</li>`;
    }
}

loadMembers();

/* ---------- Footer ---------- */

const year = document.querySelector("#currentYear");
const today = new Date();

year.innerHTML = `${today.getFullYear()}`;

document.getElementById("lastModified").innerHTML = document.lastModified;
