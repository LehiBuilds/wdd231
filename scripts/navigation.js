const navbutton = document.querySelector("#ham-btn");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navigation.classList.toggle("show");
});

const navigation = document.querySelector("#nav-bar");

