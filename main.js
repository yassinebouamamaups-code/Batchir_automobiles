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
loadGoogleRating();

});


/* =========================
RECUPERER VOITURES
========================= */

// async function getCars(){

// const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS02WcggUWPMCNCPQM27bzqxD4YrKD4GYB_tmmVPMSk66jdp_PI5313ZR0Vb1bq-JjHw3G5-eEmxrvI/pub?gid=0&single=true&output=csv";

// const response = await fetch(url);
// const data = await response.text();

// const rows = data.split("\n").slice(1);

// return rows.map(row => {

// const cols = row.split(",");

// return {

// id: cols[0],
// brand: cols[1],
// model: cols[2],
// year: cols[3],
// km: cols[4],
// price: cols[5],
// fuel: cols[6],
// gearbox: cols[7],
// // images: cols[8] ? cols[8].split("|") : []
// images: cols[8] ? cols[8].split("|") : [],
// caracteristiques: cols[9] || ""
// };

// });

// }
async function getCars(){

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

const cachedData = localStorage.getItem("carsData");
const cachedTime = localStorage.getItem("carsTime");

if(cachedData && cachedTime && Date.now() - cachedTime < CACHE_TIME){
return JSON.parse(cachedData);
}

const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS02WcggUWPMCNCPQM27bzqxD4YrKD4GYB_tmmVPMSk66jdp_PI5313ZR0Vb1bq-JjHw3G5-eEmxrvI/pub?gid=0&single=true&output=csv";

const response = await fetch(url);
const data = await response.text();

const rows = data.split("\n").slice(1);

const cars = rows.map(row => {

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
images: cols[8] ? cols[8].split("|") : [],
caracteristiques: cols[9] || ""

};

});

localStorage.setItem("carsData", JSON.stringify(cars));
localStorage.setItem("carsTime", Date.now());

return cars;

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

// TEST Ajout
/* =========================
CARACTERISTIQUES
========================= */

const featuresButton = document.getElementById("toggleFeatures");
const featuresContainer = document.getElementById("featuresContainer");
const featuresList = document.getElementById("featuresList");

if(car.caracteristiques){

const features = car.caracteristiques.split("|");

features.forEach(feature => {

const li = document.createElement("li");
li.textContent = feature.trim();

featuresList.appendChild(li);

});

}

if(featuresButton){

featuresButton.addEventListener("click", () => {

if(featuresContainer.style.display === "block"){

featuresContainer.style.display = "none";

}else{

featuresContainer.style.display = "block";

}

});

}
/* infos */

const title = document.getElementById("carTitle");
const price = document.getElementById("carPrice");
const year = document.getElementById("carYear");
const km = document.getElementById("carKm");
const gearbox = document.getElementById("carGearbox");
const fuel = document.getElementById("carFuel");

if(title) title.textContent = car.brand + " " + car.model;
if(price) price.textContent = car.price + " €";
if(year) year.textContent = car.year;
if(km) km.textContent = car.km + " km";
if(gearbox) gearbox.textContent = car.gearbox;
if(fuel) fuel.textContent = car.fuel;


/* photo principale */

const mainPhoto = document.getElementById("mainPhoto");

if(mainPhoto && car.images.length){
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


/* =========================
AFFICHER NOTE GOOGLE
========================= */

function loadGoogleRating(){

const placeId = "ChIJExYYN463rhIRv3B50QlPefw";

const service = new google.maps.places.PlacesService(document.createElement('div'));

service.getDetails({

placeId: placeId,
fields: ["rating","user_ratings_total"]

}, (place, status) => {

if(status !== google.maps.places.PlacesServiceStatus.OK) return;

const rating = place.rating;
const total = place.user_ratings_total;

const fullStars = Math.floor(rating);
const emptyStars = 5 - fullStars;

const stars = "★".repeat(fullStars) + "☆".repeat(emptyStars);

document.getElementById("googleStars").innerHTML =
`<div class="google-stars">${stars}</div>`;

document.getElementById("googleScore").innerHTML =
`${rating} / 5 sur Google (${total} avis)`;

});

}

lucide.createIcons();