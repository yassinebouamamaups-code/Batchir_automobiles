document.addEventListener("DOMContentLoaded", () => {

/* =========================
MENU
========================= */

const menuButton = document.getElementById("menuButton");
const menuPanel = document.getElementById("menuPanel");

if(menuButton && menuPanel){

menuButton.addEventListener("click", () => {

menuButton.classList.toggle("active");
menuPanel.classList.toggle("open");

});

}


/* =========================
FILTRES CATALOGUE
========================= */

const brandFilter = document.getElementById("brandFilter");
const priceFilter = document.getElementById("priceFilter");
const kmFilter = document.getElementById("kmFilter");

const cars = document.querySelectorAll(".car");

if(brandFilter && priceFilter && kmFilter && cars.length){

function filterCars(){

cars.forEach(car => {

const brand = car.dataset.brand;
const price = parseInt(car.dataset.price);
const km = parseInt(car.dataset.km);

let show = true;

/* filtre marque */

if(brandFilter.value && brand !== brandFilter.value){
show = false;
}

/* filtre prix */

if(priceFilter.value && price > parseInt(priceFilter.value)){
show = false;
}

/* filtre km */

if(kmFilter.value && km > parseInt(kmFilter.value)){
show = false;
}

car.style.display = show ? "block" : "none";

});

}

brandFilter.addEventListener("change", filterCars);
priceFilter.addEventListener("change", filterCars);
kmFilter.addEventListener("change", filterCars);

}

});

function changePhoto(element){

document.getElementById("mainPhoto").src = element.src;

}