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

});


/* =========================
GALERIE PHOTO
========================= */

function changePhoto(element){

document.getElementById("mainPhoto").src = element.src;

}


/* =========================
CHARGER CATALOGUE
========================= */

async function loadCars(){

const response = await fetch("data/vehicles.json");
const cars = await response.json();

const container = document.getElementById("carsContainer");

if(!container) return;

container.innerHTML = "";

cars.forEach(car => {

container.innerHTML += `

<div class="car">

<img src="${car.images ? car.images[0] : 'vehicles/default.jpg'}" alt="${car.brand} ${car.model}">

<h3>${car.brand} ${car.model}</h3>

<p>${car.year} • ${car.km} km</p>

<span class="price">${car.price} €</span>

<a href="vehicle.html?id=${car.id}" class="btn">Voir le véhicule</a>

</div>

`;

});

}

loadCars();



/* =========================
CHARGER PAGE VEHICULE
========================= */

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

document.getElementById("mainPhoto").src =
car.images ? car.images[0] : "vehicles/default.jpg";

}

loadVehicle();