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

async function loadCars(){

const response = await fetch("data/vehicles.json");
const cars = await response.json();

const container = document.querySelector(".cars");

if(!container) return;

container.innerHTML = "";

cars.forEach(car => {

container.innerHTML += `
<div class="car">

<img src="${car.image}" alt="${car.brand} ${car.model}">

<h3>${car.brand} ${car.model}</h3>

<p>${car.year} • ${car.km} km</p>

<span class="price">${car.price} €</span>

<a href="vehicle.html?id=${car.id}" class="btn">Voir le véhicule</a>

</div>
`;

});

}

loadCars();

async function loadVehicle(){

const params = new URLSearchParams(window.location.search);
const carId = params.get("id");

if(!carId) return;

const response = await fetch("data/vehicles.json");
const cars = await response.json();

const car = cars.find(c => c.id === carId);

if(!car) return;

document.getElementById("carTitle").textContent = car.brand + " " + car.model;

document.getElementById("carPrice").textContent = car.price + " €";

document.getElementById("carYear").textContent = car.year;

document.getElementById("carKm").textContent = car.km + " km";

document.getElementById("carGearbox").textContent = car.gearbox;

document.getElementById("carFuel").textContent = car.fuel;

document.getElementById("mainPhoto").src = car.image;

}

loadVehicle();