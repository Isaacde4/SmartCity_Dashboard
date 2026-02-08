// ---------------------------
// 1️⃣ City Dashboard Data
// ---------------------------
const cityData = {
    accra: { airQuality: 82, greenSpace: 28, populationGrowth: 3.1, trafficLevel: "High" },
    kumasi: { airQuality: 75, greenSpace: 34, populationGrowth: 2.8, trafficLevel: "Medium" },
    tamale: { airQuality: 60, greenSpace: 40, populationGrowth: 3.5, trafficLevel: "Medium" },
    takoradi: { airQuality: 65, greenSpace: 36, populationGrowth: 2.7, trafficLevel: "Medium" },
    "cape-coast": { airQuality: 55, greenSpace: 42, populationGrowth: 2.2, trafficLevel: "Low" },
    ho: { airQuality: 50, greenSpace: 38, populationGrowth: 2.6, trafficLevel: "Low" },
    bolgatanga: { airQuality: 45, greenSpace: 50, populationGrowth: 2.1, trafficLevel: "Low" },
    koforidua: { airQuality: 70, greenSpace: 30, populationGrowth: 2.9, trafficLevel: "Medium" }
};

// ---------------------------
// 2️⃣ City Coordinates (for map)
// ---------------------------
const cityCoordinates = {
    accra: [5.6037, -0.1870],
    kumasi: [6.6885, -1.6244],
    tamale: [9.4008, -0.8393],
    takoradi: [4.8931, -1.7553],
    "cape-coast": [5.1054, -1.2466],
    ho: [6.6000, 0.4700],
    bolgatanga: [10.7901, -0.8514],
    koforidua: [6.0917, -0.2590]
};

// ---------------------------
// 3️⃣ Dashboard Functions
// ---------------------------
function animateValue(element, start, end, unit = "") {
    let current = start;
    const step = (end - start) / 40;

    const interval = setInterval(() => {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
            element.textContent = end + unit;
            clearInterval(interval);
        } else {
            element.textContent = Math.round(current) + unit;
        }
    }, 20);
}

function setStatusColor(element, value, type) {
    element.classList.remove("good", "medium", "bad");

    if (type === "aqi") {
        if (value <= 50) element.classList.add("good");
        else if (value <= 100) element.classList.add("medium");
        else element.classList.add("bad");
    }

    if (type === "green") {
        if (value >= 40) element.classList.add("good");
        else if (value >= 25) element.classList.add("medium");
        else element.classList.add("bad");
    }
}

function updateDashboard(city) {
    const data = cityData[city];

    const aqi = document.getElementById("airQuality");
    const green = document.getElementById("greenSpace");
    const growth = document.getElementById("populationGrowth");
    const traffic = document.getElementById("trafficLevel");

    animateValue(aqi, 0, data.airQuality);
    animateValue(green, 0, data.greenSpace, "%");
    animateValue(growth, 0, data.populationGrowth, "%");

    traffic.textContent = data.trafficLevel;

    setStatusColor(aqi, data.airQuality, "aqi");
    setStatusColor(green, data.greenSpace, "green");
}

// ---------------------------
// 4️⃣ Map Initialization
// ---------------------------
const map = L.map('ghanaMap').setView([7.9465, -1.0232], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let cityMarker = L.marker(cityCoordinates['accra'])
    .addTo(map)
    .bindPopup("Accra")
    .openPopup();

// ---------------------------
// 5️⃣ City Selector Event
// ---------------------------
const citySelect = document.getElementById("citySelect");

citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value;

    updateDashboard(selectedCity);

    const coords = cityCoordinates[selectedCity];
    cityMarker.setLatLng(coords)
        .setPopupContent(capitalizeCityName(selectedCity))
        .openPopup();

    map.setView(coords, 7);
});

// ---------------------------
// 6️⃣ Helper Function
// ---------------------------
function capitalizeCityName(city) {
    return city.split('-')
               .map(word => word.charAt(0).toUpperCase() + word.slice(1))
               .join(' ');
}

// ---------------------------
// 7️⃣ Initial Load
// ---------------------------
window.onload = () => {
    updateDashboard(citySelect.value);
};
