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
const url = './data/members.json';

const display = document.querySelector('article');
const buttons = document.querySelectorAll('.view-btn')

buttons.forEach(button => {

    button.addEventListener('click', (e) => {
        e.preventDefault();

        const viewType = e.currentTarget.dataset.view;

        //safe class swapping
        display.classList.remove('grid', 'list');
        display.classList = viewType;

        // Buttons active state management
        buttons.forEach(btn => btn.classList.remove('active'));
        e.currentTarget.classList.add('active');



    });
});

/* ---------- Grid/List ---------- */


/* ---------- Footer ---------- */

const year = document.querySelector("#currentYear");
const today = new Date();

year.innerHTML = `${today.getFullYear()}`;

document.getElementById("lastModified").innerHTML = document.lastModified;
