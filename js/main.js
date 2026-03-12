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

/* charger pages */

loadCars();
loadVehicle();

});


/* =========================
RECUPERER VOITURES
========================= */

async function getCars(){

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS02WcggUWPMCNCPQM27bzqxD4YrKD4GYB_tmmVPMSk66jdp_PI5313ZR0Vb1bq-JjHw3G5-eEmxrvI/pub?gid=0&single=true&output=csv";

const response = await fetch(url);
const data = await response.text();

const rows = data.split("\n").slice(1);

return rows.map(row => {

const cols = row.split(",");

return {

id: cols[0],
brand: cols[1],
model: cols[2],
year: cols[3],
km: cols[4],
price: cols[5],
fuel: cols[6],
gearbox: cols[7],
images: cols[8] ? cols[8].split("|") : []

};

});

}


/* =========================
CHARGER CATALOGUE
========================= */

async function loadCars(){

const container = document.getElementById("carsContainer");

if(!container) return;

const cars = await getCars();

container.innerHTML = "";

cars.forEach(car => {

container.innerHTML += `

<div class="car">

<img src="${car.images[0] || ''}" alt="${car.brand} ${car.model}">

<h3>${car.brand} ${car.model}</h3>

<p>${car.year} • ${car.km} km</p>

<span class="price">${car.price} €</span>

<a href="vehicle.html?id=${car.id}" class="btn">Voir le véhicule</a>

</div>

`;

});

}


/* =========================
CHARGER PAGE VEHICULE
========================= */

async function loadVehicle(){

const params = new URLSearchParams(window.location.search);
const carId = params.get("id");

if(!carId) return;

const cars = await getCars();

const car = cars.find(c => c.id === carId);

if(!car) return;


/* infos */

document.getElementById("carTitle").textContent =
car.brand + " " + car.model;

document.getElementById("carPrice").textContent =
car.price + " €";

document.getElementById("carYear").textContent =
car.year;

document.getElementById("carKm").textContent =
car.km + " km";

document.getElementById("carGearbox").textContent =
car.gearbox;

document.getElementById("carFuel").textContent =
car.fuel;


/* photo principale */

const mainPhoto = document.getElementById("mainPhoto");

if(car.images.length){
mainPhoto.src = car.images[0];
}


/* miniatures */

const thumbnails = document.getElementById("thumbnails");

if(!thumbnails) return;

thumbnails.innerHTML = "";

car.images.forEach(img => {

const thumb = document.createElement("img");

thumb.src = img;
thumb.alt = "photo véhicule";

thumb.addEventListener("click", () => {

mainPhoto.src = img;

});

thumbnails.appendChild(thumb);

});

}