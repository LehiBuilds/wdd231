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
            <h3 class="member-name">${m.name}</h3>
            <p class="member-tagline">${m.tagline}</p>
        </div>
        <div class="member-body">
            <img class="member-img" src="./images/${m.image}" alt="${m.name}"
                width="72" height="72" loading="lazy">
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

if (display) {
    loadMembers();
}

/* ---------- Form  ---------- */
const timestamp = document.querySelector("#timestamp");
if (timestamp) {
    timestamp.value = new Date().toISOString();
}

const membershipLevels = [
    {
        id: "np",
        name: "NP Membership",
        price: "No fee",
        summary: "For nonprofit organizations.",
        benefits: [
            "Directory listing for the organization",
            "Access to chamber news and announcements",
            "Invitations to member networking events"
        ]
    },
    {
        id: "bronze",
        name: "Bronze Membership",
        price: "₱1,500 annually",
        summary: "A strong foundation for businesses beginning chamber participation.",
        benefits: [
            "Member event access",
            "Training opportunities",
            "Business directory listing",
            "Chamber newsletter subscription"
        ]
    },
    {
        id: "silver",
        name: "Silver Membership",
        price: "₱3,000 annually",
        summary: "Expanded promotion and savings for growing member businesses.",
        benefits: [
            "All Bronze membership benefits",
            "Discounted member event registration",
            "Featured business directory placement",
            "Social media and chamber advertising",
            "Priority access to selected workshops"
        ]
    },
    {
        id: "gold",
        name: "Gold Membership",
        price: "₱5,000 annually",
        summary: "Maximum visibility and priority support for established leaders.",
        benefits: [
            "All Silver membership benefits",
            "Homepage business spotlight",
            "Priority event promotion",
            "Recognition at chamber programs",
            "Priority sponsorship opportunities",
            "Direct business referral support"
        ]
    }
];

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
}[character]));

function renderMembershipLevels() {
    const options = document.querySelector("#membership-options");
    const cards = document.querySelector("#membership-cards");

    if (options) {
        options.innerHTML = membershipLevels.map((membership, index) => `
            <label>
                <input type="radio" name="membershipLevel" value="${escapeHtml(membership.id)}" ${index === 0 ? "required" : ""}>
                ${escapeHtml(membership.name)} — ${escapeHtml(membership.price)}
            </label>
        `).join("");
    }

    if (cards) {
        cards.innerHTML = membershipLevels.map((membership) => `
            <article class="membership-card">
                <h3>${escapeHtml(membership.name)}</h3>
                <p>${escapeHtml(membership.price)}</p>
                <a href="#membership-dialog" data-dialog-open="${membership.id}" aria-haspopup="dialog" aria-controls="membership-dialog">View benefits</a>
            </article>
        `).join("");
    }
}

renderMembershipLevels();

/* Add common form parameter aliases without changing the visible field names. */
const joinForm = document.querySelector(".join-form");
if (joinForm) {
    joinForm.addEventListener("submit", () => {
        const aliases = {
            phone: "mobile",
            organization: "businessName",
            organizationName: "businessName"
        };

        Object.entries(aliases).forEach(([aliasName, sourceName]) => {
            const source = joinForm.elements[sourceName];
            if (!source) return;

            const alias = document.createElement("input");
            alias.type = "hidden";
            alias.name = aliasName;
            alias.value = source.value;
            joinForm.appendChild(alias);
        });
    });
}

/* ---------- Thank-you page ---------- */
const thankyouDetails = document.querySelector("#submission-details");
if (thankyouDetails) {
    const params = new URLSearchParams(window.location.search);
    const fieldLabels = [
        ["firstName", "First name"],
        ["lastName", "Last name"],
        ["email", "Email address"],
        ["mobile", "Mobile number"],
        ["businessName", "Business or organization name"],
        ["membershipLevel", "Membership level"],
        ["timestamp", "Application timestamp"]
    ];

    thankyouDetails.innerHTML = fieldLabels.map(([name, label]) => {
        let value = params.get(name);

        if (!value && name === "firstName") value = params.get("first");
        if (!value && name === "lastName") value = params.get("last");
        if (!value && name === "mobile") value = params.get("phone");
        if (!value && name === "businessName") {
            value = params.get("organization") || params.get("organizationName");
        }
        value ||= "Not provided";

        if (name === "membershipLevel" && value !== "Not provided") {
            const membership = membershipLevels.find((level) => level.id === value || level.name === value);
            if (membership) value = `${membership.name} — ${membership.price}`;
        }

        if (name === "timestamp" && value !== "Not provided") {
            const date = new Date(value);
            if (!Number.isNaN(date.getTime())) {
                value = date.toLocaleString();
            }
        }

        return `<div><dt>${label}</dt><dd>${value.replace(/[&<>"']/g, (character) => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        }[character]))}</dd></div>`;
    }).join("");
}


/* ---------- Form Dialog ---------- */
document.querySelectorAll("[data-dialog-open]").forEach((link) => {
    link.addEventListener("click", (event) => {
        const dialog = document.getElementById("membership-dialog");
        if (dialog instanceof HTMLDialogElement) {
            const membership = membershipLevels.find((level) => level.id === link.dataset.dialogOpen);
            if (!membership) return;

            dialog.querySelector("#membership-dialog-title").textContent = `${membership.name} Benefits`;
            dialog.querySelector(".dialog-summary").textContent = `${membership.summary} ${membership.price}`;
            dialog.querySelector(".benefit-list").innerHTML = membership.benefits
                .map((benefit) => `<li>${escapeHtml(benefit)}</li>`)
                .join("");
            event.preventDefault();
            dialog.showModal();
        }
    });
});

/* ---------- Footer ---------- */

const year = document.querySelector("#currentYear");
const today = new Date();

year.innerHTML = `${today.getFullYear()}`;

document.getElementById("lastModified").innerHTML = document.lastModified;
