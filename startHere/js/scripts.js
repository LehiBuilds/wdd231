const appointmentDetails = document.querySelector('#results');

const params = new URLSearchParams(window.location.search);
const firstName = params.get("first");
const lastName = params.get("last");
const phone = params.get("phone");
const email = params.get("email");

const ordinance = params.get("ordinance");

const date = params.get("date");

const templeLocation = params.get("location");

const details = [
  ["Name", `${firstName ?? ""} ${lastName ?? ""}`.trim()],
  ["Phone", phone],
  ["Email", email],
  ["Ordinance", ordinance],
  ["Date", date],
  ["Temple", templeLocation],
];

appointmentDetails.replaceChildren(
  ...details.map(([label, value]) => {
    const row = document.createElement("p");
    const heading = document.createElement("strong");

    heading.textContent = `${label}: `;
    row.append(heading, document.createTextNode(value || "Not provided"));

    return row;
  })
);