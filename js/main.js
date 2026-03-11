document.addEventListener("DOMContentLoaded", () => {

const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");

menuButton.addEventListener("click", () => {

menuPanel.classList.toggle("open");
menuButton.classList.toggle("active");

});

});