
/***************** NAVIGATION ******************/
const navbutton = document.querySelector("#ham-btn");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navigation.classList.toggle("show");
});

const navigation = document.querySelector("#nav-bar");


/***************** FOOTER ******************/
const year = document.querySelector("#currentyear");
const today = new Date();

year.innerHTML = `${today.getFullYear()}`;

document.getElementById("lastModified").innerHTML = document.lastModified;