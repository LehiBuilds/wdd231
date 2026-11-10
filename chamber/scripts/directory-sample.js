const membersURL = 'members.json';
const container = document.querySelector('#members');
const toggleButtons = document.querySelectorAll('.view-toggle button');

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
            <img class="member-img" src="images/${m.image}" alt="${m.name}"
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
        container.innerHTML = members.map(memberCard).join('');
    } catch (error) {
        console.error('Could not load members:', error);
        container.innerHTML = '<li>Sorry, the member directory could not be loaded.</li>';
    }
}

function setView(view) {
    container.classList.toggle('is-grid', view === 'grid');
    container.classList.toggle('is-list', view === 'list');
    toggleButtons.forEach(btn =>
        btn.setAttribute('aria-pressed', btn.dataset.view === view));
}

toggleButtons.forEach(btn =>
    btn.addEventListener('click', () => setView(btn.dataset.view)));

setView('grid');
loadMembers();